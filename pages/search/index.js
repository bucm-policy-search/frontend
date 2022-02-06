/* eslint-disable prefer-template */
/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useRouter } from "next/router";
// import Image from 'next/image';
import parse from 'html-react-parser';

import styles from "./index.module.css";

// 页面 - 页数栏内容
function PageNumRow({ data }) {
  const components = [];
  const router = useRouter();
  const { q, page, include, exclude, publishingDate1, publishingDate2, scrapyDate1, scrapyDate2, infoSource, containAttachment, isAdvancedSearch } = router.query;
  const url = isAdvancedSearch ?
    `${process.env.NEXT_PUBLIC_BASE_URL}/search?q=${q}&include=${include}&exclude=${exclude}&publishingDate1=${publishingDate1}&publishingDate2=${publishingDate2}&scrapyDate1=${scrapyDate1}&scrapyDate2=${scrapyDate2}&infoSource=${infoSource}&containAttachment=${containAttachment}&isAdvancedSearch=true`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/search?q=${q}`;

  if (data.hits) {
    const pageMax = Math.ceil(data.hits.total.value / 10);

    if (page <= 4) {
      for (let i = 1; i <= pageMax && i <= 10 && i <= page + 6; i += 1) {
        components[i] = (i === parseInt(page, 10))
          ? (
            <div className={styles.thisPage}>{i}</div>
          )
          : (
            <div className={styles.notThisPage}>
              <a href={`${url}&page=${i}`}>{i}</a>
            </div>
          );
      }
    } else {
      for (let i = page - 4; i <= pageMax && (i - page < 6); i += 1) {
        components[i] = (i === parseInt(page, 10))
          ? (
            <div className={styles.thisPage}>{i}</div>
          )
          : (
            <div className={styles.notThisPage}>
              <a href={`${url}&page=${i}`}>{i}</a>
            </div>
          );
      }
    }
  }
  const prevUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/search?q=${q}&page=${parseInt(page, 10) - 1}`;
  const nextUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/search?q=${q}&page=${parseInt(page, 10) + 1}`;
  return (
    <div className={styles.pageNumRowBody}>
      {/* 响应式设计：lg:1024px，xl:1280px  lg为ipad pro竖屏时的长度 */}

      {/* width < lg */}
      <div className={styles.smallScreen}>
        <a href={prevUrl} className={parseInt(page, 10) !== 1 ? styles.smallScreenVisible : styles.smallScreenInvisible}>
          <div className={styles.iconDiv}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.svgSize} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </a>

        <strong>第{page}页</strong>

        <a href={nextUrl} className={parseInt(page, 10) !== Math.ceil(data.hits.total.value / 10) ? styles.smallScreenVisible : styles.smallScreenInvisible}>
          <div className={styles.iconDiv}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.svgSize} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </a>
      </div>

      {/* width >= lg */}
      <div className={styles.bigScreen}>


        <div className={parseInt(page, 10) !== 1 ? styles.hyperLinkDisplayed : styles.hyperLinkHidden}>
          <a href={prevUrl} >上一页</a>
        </div>
        {components}
        <div className={parseInt(page, 10) !== Math.ceil(data.hits.total.value / 10) ? styles.hyperLinkDisplayed : styles.hyperLinkHidden}>
          <a href={nextUrl}>下一页</a>
        </div>

      </div>
    </div >
  );
};

// 共搜索到xx条结果 及 搜索内容标题和缩略内容
function Content({ data }) {
  const num = data.hits.total.value;

  // eslint-disable-next-line react/destructuring-assignment
  const contents = data.hits.hits.map((value) => (
    <div className={styles.content} key={value._source.id}>
      <a className={styles.link} href={`/article?q=${String(value._source.title)}`} key={value._source.id}>
        {value._source.title}
      </a>
      <div className={styles.detail} key={value._source.id + "_1"}>
        {value.highlight && value.highlight.plaintext ?
          parse((value.highlight.plaintext).join(' ')) : ""}
      </div>
    </div>
  ));
  return (
    <div className={styles.contentBody}>
      <div>
        <div className={styles.detailLine}>
          <div>
            {`共搜索到 ${num} 条结果`}
          </div>

          <div className={styles.advancedSearchLink}>
            <a href="./advanced_search" >高级搜索</a>
          </div>
        </div>

        {contents}
      </div>
    </div>
  );
}

function Search({ data }) {
  const router = useRouter();
  const { q } = router.query;
  const page = parseInt(router.query.page, 10);

  const [inputValue, setInputValue] = useState(q || "");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearContent = () => {
    setInputValue("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (inputValue) {
      if (router.query.q !== inputValue) {
        router.push({
          pathname: "/search",
          query: {
            q: inputValue,
            page: 1,
          },
        });
      } else {
        router.push({
          pathname: "/search",
          query: {
            q: inputValue,
            page,
          },
        });
      }
    }
  };

  return (

    <div className={styles.body}>
      <div className={styles.searchBox}>
        <div className="flex-none">
          <h1 className={styles.title}>
            <a href="..">搜索引擎</a>
          </h1>
        </div>

        <form className={styles.formBody} onSubmit={handleSearch}>
          <div className={styles.formDiv}>
            {/* Search Icon */}
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg} viewBox="0 0 20 20" fill="currentColor" onClick={handleSearch}>
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>

            <input className={styles.inputBox} value={inputValue} onChange={handleInputChange} />

            {/* Close Icon */}
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg} viewBox="0 0 20 20" fill="currentColor" onClick={handleClearContent}>
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

          </div>
          <button className={styles.searchButton} type="submit" variant="outlined">搜索</button>
        </form>
      </div>

      <Content data={data} />
      <PageNumRow q={q} data={data} page={page} />

    </div>
  );
}

export async function getServerSideProps({ query }) {

  const { q, page, include, exclude, publishingDate1, publishingDate2, scrapyDate1, scrapyDate2, infoSource, containAttachment, isAdvancedSearch } = query;

  const url = isAdvancedSearch ?
    `${process.env.NEXT_PUBLIC_PROXY_URL}/api/advanced_search?q=${q}&page=${page}&include=${include}&exclude=${exclude}&publishingDate1=${publishingDate1}&publishingDate2=${publishingDate2}&scrapyDate1=${scrapyDate1}&scrapyDate2=${scrapyDate2}&infoSource=${infoSource}&containAttachment=${containAttachment}`
    : `${process.env.NEXT_PUBLIC_PROXY_URL}/api/search?q=${q}&page=${page}`;
  // Fetch data from external API
  const res = await fetch(encodeURI(url));
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Search;
