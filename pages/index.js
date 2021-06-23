import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import { useRouter } from "next/router";
import Modal from "../components/Modal";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [hitModal, setHitModal] = useState(false);

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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAboutUS = () => {
    if (hitModal === true)
      setHitModal(false);
    else
      setHitModal(true);
  };

  const handleClearContent = () => {
    setInputValue("");
  };

  const home = (

    <div className="min-w-max h-screen flex flex-col text-lg md:text-xl lg:text-2xl font-custom">
      <div className="mt-16 mx-5 md:mx-24 lg:mt-48 xl:mt-64 flex-auto">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-center">中医药政策搜索</h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="flex items-center mt-12 mx-5 lg:mt-16 xl:mt-24 border border-gray-300 rounded-lg h-12 py-2 px-4 2xl:w-1/2 2xl:mx-auto">
            <SearchIcon className="fill-current text-gray-400 hover:text-black" onClick={handleSubmit} />
            <input className="h-8 flex-1 py-2 px-4 text-xl focus:outline-none"
              value={inputValue} onChange={handleInputChange} />
            <CloseRoundedIcon className="ill-current text-gray-400 hover:text-black" onClick={handleClearContent} />
          </div>
          <div className="flex justify-between max-w-xs min-w-max mx-auto mt-16 ">
            <button className="h-12 lg:h-16 px-4 w-32 lg:w-44 rounded-lg  tracking-widest font-bold lg:font-bold xl:font-extrabold border-2 border-gray-600  active:border-0 focus:ring-2 focus:ring-black focus:ring-opacity-50" type="submit">搜索</button>
            <button className="h-12 lg:h-16 px-4 w-32 lg:w-44 ml-6 lg:ml-16 rounded-lg text-gray-50 tracking-widest font-bold lg:font-bold xl:font-extrabold bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50" type="button" onClick={handleAboutUS}>关于我们</button>
            {hitModal ? <Modal className="w-20 ml-36" hitModal={hitModal} setHitModal={setHitModal} /> : null}
          </div>
        </form>
      </div>
    </div>

  );
  return (home);
}

export default Home;
