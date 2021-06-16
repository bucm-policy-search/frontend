/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import Image from 'next/image';
import parse from 'html-react-parser';

import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import styles from "./index.module.css";

function Search() {
  const router = useRouter();
  const { q } = router.query;
  const { page } = router.query;

  const [inputValue, setInputValue] = useState(q || "");
  const [haveFetchedData, setHaveFetchedData] = useState(false);
  const [haveGotResult, setHaveGotResult] = useState(false);
  const [data, setData] = useState({});

  const fetchData = (kind) => {
    const fetchURL = `${process.env.NEXT_PUBLIC_PROXY_URL}/api/${kind}?q=${String(inputValue || q)}&page=${page}`;

    fetch(fetchURL)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setHaveGotResult(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (!haveFetchedData && q) {
      fetchData("search");
      setHaveFetchedData(true);
    }
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    event.preventDefault(); // ignore the ts's deprecated warning, it still works now
    setHaveFetchedData(false);
    setHaveGotResult(false);
    router.push({
      pathname: "/search",
      query: {
        q: inputValue,
        page,
      },
    },
      `/search?q=${inputValue}&page=${page}`,
      { shallow: true });
  };

  function PageNum() {
    const components = [];
    if (data.hits) {
      for (let i = 1; i <= Math.ceil(data.hits.total.value / 10); i += 1) {
        const url = `http://localhost:3000/search?q=${q}&page=${i}`;
        components[i] = (i === page)
          ? (
            <div className={styles.page_num}>{i}</div>
          )
          : (
            <div className={styles.page_num}>
              <a href={url}>{i}</a>
            </div>
          );
      }
    }
    return components;
  }

  const Content = (
    <>
      {haveGotResult && data.hits.hits && (
        <div className={styles.body}>
          <div className={styles.hits_num}>
            共搜索到 {` ${data.hits.total.value} `} 条结果
          </div>
          {data.hits.hits.map((value) => (
            <div className={styles.article} key={value._source.title}>
              <a className={styles.article__title} href={`/article?q=${String(value._source.title)}`}>
                {value._source.title}
              </a>
              <div className={styles.article__detail}>
                {value.highlight && value.highlight.plaintext ?
                  parse(String(value.highlight.plaintext)) : ""}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  const Page = (
    <div className={styles.page}>
      <form className={styles.header} onSubmit={handleSearch}>
        <a href="..">
          {/* Next.js pic is strange, just ignore */}
          {/* <Image className={styles.pic} alt="图片加载中..." \
          src='/seach-icon.jpg' width={80} height={60} /> */}
          <h1 className={styles.h1}>搜索引擎</h1>
        </a>

        <div className={styles.input}>
          <SearchIcon className={styles.inputIcon} />
          <input value={inputValue} onChange={handleInputChange} />
        </div>
        <Button type="submit" variant="outlined">搜索</Button>
      </form>
      {haveGotResult ? Content : <div className={styles.body}>正在搜索结果</div>}
      <div className={styles.page_nums}>
        <strong>当前页数：</strong>
        {PageNum()}
      </div>
    </div>
  );

  return (Page);
}

export default Search;
