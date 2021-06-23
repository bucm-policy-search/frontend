/* eslint-disable prefer-template */
/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useRouter } from "next/router";
// import Image from 'next/image';
import parse from 'html-react-parser';

import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function Search(props) {
  const router = useRouter();
  const { q } = router.query;
  const page = parseInt(router.query.page, 10);

  const [inputValue, setInputValue] = useState(q || "");
  const { data } = props;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    event.preventDefault(); // ignore ts's deprecated warning, it still works now
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

  // 页面 - 页数栏内容
  const PageNum = () => {
    const components = [];
    if (data.hits) {
      const pageMax = Math.ceil(data.hits.total.value / 10);

      if (page <= 4) {
        for (let i = 1; i <= pageMax && (i <= page + 6 || i <= 10); i += 1) {
          const url = `http://localhost:3000/search?q=${q}&page=${i}`;

          components[i] = (i === page)
            ? (
              <div className="ml-8 font-bold">{i}</div>
            )
            : (
              <div className="ml-8">
                <a className="underline text-blue-600" href={url}>{i}</a>
              </div>
            );
        }
      } else {
        for (let i = page - 4; i <= pageMax && (i - page < 6); i += 1) {
          const url = `http://localhost:3000/search?q=${q}&page=${i}`;

          components[i] = (i === page)
            ? (
              <div className="ml-8 font-bold">{i}</div>
            )
            : (
              <div className="ml-8">
                <a className="underline text-blue-600" href={url}>{i}</a>
              </div>
            );
        }

      }
    }
    const prevUrl = `http://localhost:3000/search?q=${q}&page=${parseInt(page, 10) - 1}`;
    const nextUrl = `http://localhost:3000/search?q=${q}&page=${parseInt(page, 10) + 1}`;
    return (
      <div className="flex text-lg mb-14 lg:mb-24 mt-10 text-center justify-items-center">
        <div className="flex lg:hidden w-full justify-around">
          <a href={prevUrl} className={page !== String(1) ? "visible lg:invisible" : "invisible"}> <ArrowBackIosIcon /> </a>
          <strong >第{page}页</strong>
          <a href={nextUrl} className={page !== String(Math.ceil(data.hits.total.value / 10)) ? "visible lg:invisible" : "invisible"}> <ArrowForwardIosIcon /> </a>
        </div>
        <div className="hidden lg:flex md:ml-32 md:mt-8 text-xl xl:text-2xl">
          <div>当前页数：</div>
          <div className="flex">{components}</div>
        </div>
      </div >
    );
  };

  // 共搜索到xx条结果 及 搜索内容标题和缩略内容
  const Content = (
    <>
      <div className="mt-4 lg:mt-8 sm:mx-8 md:ml-16 lg:mx-32 ">
        <div className="mb-4 lg:mb-8">
          共搜索到 {` ${data.hits.total.value} `} 条结果
        </div>
        {data.hits.hits.map((value) => (
          <div className="mt-6 lg:mt-8" key={value._source.id}>
            <a className="font-medium underline text-blue-600 text-lg md:text-xl" href={`/article?q=${String(value._source.title)}`} key={value._source.id + "-0"}>
              {value._source.title}
            </a>
            <div className="font-light line-clamp-3" key={value._source.id + "-1"}>
              {value.highlight && value.highlight.plaintext ?
                parse((value.highlight.plaintext).join(' ')) : ""}
            </div>
          </div>
        ))}
      </div>

    </>
  );

  // Page总内容，引入 Content 和 PageNum 两部分内容
  const Page = (
    <div>
      <div className="mx-4 font-custom md:text-lg">
        {/* iPad Pro or narrower screen */}
        <div className="xl:hidden">
          <a href="..">
            <h1 className="text-center mt-10 sm:mt-14 lg:mt-16 text-3xl font-bold md:text-5xl lg:text-6xl lg:font-medium sm:font-extrabold self-center ">搜索引擎</h1>
          </a>
          <form className="flex mt-4 md:mt-8 lg:mt-12 sm:mx-8 md:ml-16 lg:mx-32" onSubmit={handleSearch}>
            <div className="flex-auto flex item-center border border-gray-300 h-10 lg:h-12 py-2 px-2 rounded-lg md:w-3/4 lg:w-5/6 xl:max-w-2xl">
              <SearchIcon className="item-center" />
              <input className="flex-1 p-2 ml-2 lg:text-xl sm:text-lg focus:outline-none focus:ring-2
              focus:ring-blue-300 focus:border-transparent" value={inputValue} onChange={handleInputChange} />
            </div>
            <button className="flex-initial h-10 lg:h-12 border rounded-md  ml-4 lg:ml-8 w-24" type="submit" variant="outlined">搜索</button>
          </form>
        </div>

        {/* desktop or wider screen */}
        <div className="hidden xl:flex mx-32">
          <a href="..">
            {/* Next.js pic is strange, just ignore */}
            {/* <Image className={styles.pic} alt="图片加载中..." \
          src='/seach-icon.jpg' width={80} height={60} /> */}
            <h1 className="text-center mt-12 text-5xl font-extrabold sm:font-extrabold self-center">搜索引擎</h1>
          </a>
          <form className="flex mt-4 md:mt-8 lg:mt-12 ml-12 w-3/4 max-w-screen-sm" onSubmit={handleSearch}>
            <div className="flex-auto flex border border-gray-300 h-12 py-2 px-2 rounded-lg ">
              <SearchIcon className="self-center" />
              <input className="flex-1 p-2 ml-2 lg:text-xl sm:text-lg focus:outline-none focus:ring-2
              focus:ring-blue-300 focus:border-transparent w-64" value={inputValue} onChange={handleInputChange} />
            </div>
            <button className="flex-initial h-10 lg:h-12 border rounded-md  ml-4 lg:ml-8 w-24" type="submit" variant="outlined">搜索</button>
          </form>
        </div>

        {Content}

        {PageNum()}

      </div>
    </div >
  );

  return (Page);
}

export async function getServerSideProps(context) {
  const { q } = context.query;
  const { page } = context.query;

  

  const url = `${process.env.NEXT_PUBLIC_PROXY_URL}/api/search?q=${q}&page=${page}`;
  // Fetch data from external API
  const res = await fetch(encodeURI(url));
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Search;
