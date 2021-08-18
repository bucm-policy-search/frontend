/* eslint-disable no-console */


import React from "react";
import parse, { attributesToProps } from "html-react-parser";

import { useUserAgent } from 'next-useragent';

function Content({ data }) {
  const value = data.hits.hits[0];

  function relativeToAbsolute(base, relative) {
    const stack = base.split("/");
    const parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
    // (omit if "base" is the current folder without trailing slash)
    for (let i = 0; i < parts.length; i += 1) {
      if (parts[i] === "..") {
        stack.pop();
      } else if (parts[i] !== ".") {
        stack.push(parts[i]);
      }
    }
    return stack.join("/");
  };

  // To set img src url from relative to absolute
  // replace element attributes : https://github.com/remarkablemark/html-react-parser#replace-element-attributes
  const options = {
    // eslint-disable-next-line consistent-return
    replace: ({ attribs, name }) => {
      if (attribs && name === "img") {
        const props = attributesToProps(attribs);
        props.src = relativeToAbsolute(
          value._source.urlSource,
          props.src
        );
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img {...props} />;
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mt-8 mx-12 lg:mt-12 lg:mx-24 mb-16 text-lg max-w-screen-lg" key={value._source.title}>
        <h1 className="font-bold text-3xl text-center">{value._source.title}</h1>
        <div className="flex flex-wrap justify-center mt-8 lg:mt-10">
          <div>
            发布时间：{value._source.publishingDate}
          </div>
          <div className="">
            <a className="underline mx-6" href={value._source.urlSource}>
              原文地址
            </a>
          </div>
          <div>
            爬取时间：{value._source.scrapyDate}
          </div>
        </div>

        <div className="mt-12 text-xl">
          {parse(value._source.article, options)}
        </div>
        <div className="mt-8">
          <div>
            {
              value._source.attachment.map((attachment, index) => (
                <div className="mt-4 underline" key={attachment.link}>
                  附件{index + 1}：
                  <a href={attachment.link} key={`${attachment.link}_a`}>{attachment.mark}</a>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;

export async function getServerSideProps({ query, req }) {
  const { q } = query;
  const url = `${process.env.NEXT_PUBLIC_PROXY_URL}/api/article?q=${String(q)}`;
  const uaString = req.headers['user-agent'];
  const ua = uaString ? useUserAgent(uaString) : useUserAgent(window.navigator.userAgent);

  // Fetch data from external API
  const res = await fetch(encodeURI(url));
  const data = await res.json();
  const attachments = await data.hits.hits[0]._source.attachment;
  const urlSource = await data.hits.hits[0]._source.urlSource;

  let appendUrlList = [];

  if (attachments.length && (attachments[0].link.search(/hebei\.gov\.cn/) > 0)) {

    const fetchUrl = attachments[0].link;

    console.log(`attachments.length: ${attachments.length}`);

    console.log(`attachments[0].link.search(/hebei.gov.cn/):${attachments[0].link.search(/hebei\.gov\.cn/)}`);

    console.log(`fetch URL: ${fetchUrl}`);

    const cid = fetchUrl.search(/html/) > 0 ? fetchUrl.match(/(?<=\/)[0-9]*(?=\.)/)[0] : fetchUrl.match(/(?<=cid=)[0-9]*(?=&)/)[0];

    const requestUrl = `http://wsjkw.hebei.gov.cn/attachment_url.jspx?cid=${cid}&n=${attachments.length}`;

    if (appendUrlList.length === 0) {
      // 以下内容是从Chrome复制成cURL bash形式，再用Postman转换成Javascript Fetch形式得到（因为被MDN Header设置吓到了~~）
      const myHeaders = new Headers();
      myHeaders.append("Proxy-Connection", "keep-alive");
      myHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
      myHeaders.append("DNT", "1");
      myHeaders.append("X-Requested-With", "XMLHttpRequest");
      myHeaders.append("Referer", urlSource);
      console.log(ua.source);
      myHeaders.append("User-Agent", ua.source);
      myHeaders.append("Accept-Language", "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch(requestUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
          appendUrlList = result;
          for (let i = 0; i < appendUrlList.length; i += 1) {
            attachments[i].link = `http://wsjkw.hebei.gov.cn/attachment.jspx?&cid=${cid}&i=${i}${appendUrlList[i]}`;
          }

          console.log(`fetch result: ${result}\n`);
        })
        .catch(error => console.log('error', error));

      console.log(`appendList:${appendUrlList}\n`);
    } else {
      for (let i = 0; i < appendUrlList.length; i += 1) {
        attachments[i].link = requestUrl + appendUrlList[i];
      }
    }
  }

  // Pass data to the page via props
  return { props: { data } };
}