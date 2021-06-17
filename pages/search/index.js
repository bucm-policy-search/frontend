/* eslint-disable prefer-template */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import Image from 'next/image';
import parse from 'html-react-parser';

import SearchIcon from "@material-ui/icons/Search";

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
            <div className="ml-8 font-bold">{i}</div>
          )
          : (
            <div className="ml-8">
              <a className="underline" href={url}>{i}</a>
            </div>
          );
      }
    }
    return components;
  }

  const Content = (
    <>
      {haveGotResult && data.hits.hits && (
        <div className="mt-8 sm:mx-8 md:ml-16 lg:mx-32 ">
          <div className="mb-12">
            共搜索到 {` ${data.hits.total.value} `} 条结果
          </div>
          {data.hits.hits.map((value) => (
            <div className="mt-8" key={value._source.id}>
              <a className="font-medium underline" href={`/article?q=${String(value._source.title)}`} key={value._source.id + "-0"}>
                {value._source.title}
              </a>
              <div className="font-light line-clamp-3" key={value._source.id + "-1"}>
                {value.highlight && value.highlight.plaintext ?
                  parse(String(value.highlight.plaintext)) : ""}
              </div>
            </div>
          ))}
        </div>
      )
      }
    </>
  );

  const Page = (
    <div style={{ "min-width": 475 }}>
      <form className="flex mt-10 ml-8 md:ml-16 lg:ml-32" onSubmit={handleSearch}>
        <a href="..">
          {/* Next.js pic is strange, just ignore */}
          {/* <Image className={styles.pic} alt="图片加载中..." \
          src='/seach-icon.jpg' width={80} height={60} /> */}
          <h1 className="text-4xl font-medium self-center">搜索引擎</h1>
        </a>

        <div className="flex-auto flex item-center border border-gray-300 h-12 py-2 px-4 rounded-lg w-3/4 md:ml-16 ml-32 max-w-md">
          <SearchIcon className="mr-4 item-center" />
          <input className="flex-1 p-2 text-xl focus:outline-none focus:ring-2
              focus:ring-blue-300 focus:border-transparent" value={inputValue} onChange={handleInputChange} />
        </div>
        <button className="flex-initial h-12 border rounded-md ml-8  w-24" type="submit" variant="outlined">搜索</button>
      </form>
      {haveGotResult ? Content : <div className="text-lg mx-36 mt-2 mb-8">正在搜索结果</div>}
      <div className="flex text-lg mx-16 mb-24 mt-10">
        <strong>当前页数：</strong>
        {PageNum()}
      </div>
    </div >
  );

  return (Page);
}

export default Search;
