

import React from "react";
import parse, { attributesToProps } from "html-react-parser";

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
        <h1 className="font-bold text-3xl">{value._source.title}</h1>
        <p className="text-lg mt-10">
          原文地址：
          <a className="underline" href={value._source.urlSource}>
            {value._source.urlSource}
          </a>
        </p>
        <div className="mt-12 text-xl">
          {parse(value._source.article, options)}
        </div>
        <div className="mt-8">
          {value._source.attachment.map((attachment, index) => (
            <div className="mt-4 underline" key={attachment.link}>
              附件{index + 1}：<a href={attachment.link}>{attachment.mark}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;

export async function getServerSideProps({ query }) {
  const { q } = query;

  const url = `${process.env.NEXT_PUBLIC_PROXY_URL}/api/article?q=${String(q)}`;

  // Fetch data from external API
  const res = await fetch(encodeURI(url));
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
