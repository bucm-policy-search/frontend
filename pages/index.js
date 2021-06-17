import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Button from "@material-ui/core/Button";

import { useRouter } from "next/router";
import Modal from "../components/Modal";

function Home() {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    // ignore the ts's event deprecated warning, it still works now(2021/05/05)
    // remove "event.preventDefault()" will cause page redirect bug when use form

    if (inputValue !== "") {
      // eslint-disable-next-line no-restricted-globals
      event.preventDefault();
      router.push({
        pathname: "/search",
        query: {
          q: inputValue,
          page: 1,
        },
      },
        `/search?q=${inputValue}&page=1`);
    };
  };

  const handleSearch = () => {
    if (inputValue !== "")
      handleSubmit();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };



  const handleClearContent = () => {
    setInputValue("");
  };

  const home = (
    <div className="min-w-max h-screen flex flex-col">
      <div className="mt-56 flex-auto">
        <h1 className="text-5xl text-center">中医药搜索引擎</h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="flex items-center mt-28 border border-gray-300 rounded-lg h-12 py-4 px-4 mt-15 mx-auto w-3/4 max-w-xl">
            <SearchIcon className="fill-current text-gray-400 hover:text-black" onClick={handleSearch} />
            <input className="h-8 flex-1 py-2 px-4 text-xl focus:outline-none"
              value={inputValue} onChange={handleInputChange} />
            <CloseRoundedIcon className="ill-current text-gray-400 hover:text-black" onClick={handleClearContent} />
          </div>
          <div className="flex justify-between max-w-xs min-w-max mx-auto mt-16 ">
            <Button className="w-20" variant="outlined" type="submit">搜索</Button>
            <Modal className="w-20 ml-36" />
          </div>
        </form>
      </div>
    </div>
  );
  return (home);
}

export default Home;
