/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import parse, { attributesToProps } from "html-react-parser";

import styles from "./index.module.css";

function Search() {
  const router = useRouter();
  const { q } = router.query;

  const [haveFetchedData, setHaveFetchedData] = useState(false);
  const [haveGotResult, setHaveGotResult] = useState(false);
  const [data, setData] = useState({});


  useEffect(() => {
    if (!haveFetchedData && q) {
      fetchData("article");
      setHaveFetchedData(true);
    }
  });
  const fetchData = (kind) => {
    const fetchURL = `${process.env.NEXT_PUBLIC_PROXY_URL}/api/${kind}?q=${String(q)}`;
    fetch(fetchURL)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setHaveGotResult(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  function getBody() {
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
      <div className={styles.article} key={value._source.title}>
        <h1 className={styles.title}>{value._source.title}</h1>
        <p className={styles.source}>
          原文地址：
          <a href={value._source.urlSource}>
            {value._source.urlSource}
          </a>
        </p>
        <div className={styles.detail}>
          {parse(value._source.article, options)}
        </div>
        <div className={styles.attachments}>
          {value._source.attachment.map((value, index) => (
            <div className={styles.attachment} key={value.link}>
              附件{index + 1}：<a href={value.link}>{value.mark}</a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Content = (
    <>
      {haveGotResult && data.hits.hits &&
        <div className={styles.body}>
          {getBody()}
        </div>
      }
    </>
  );

  const Page = (
    <div>
      {haveGotResult ?
        Content : <div className={styles.body}>正在获取信息...</div>
      }
    </div>
  );

  return Page;
}

export default Search;
