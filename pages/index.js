import React, { useState } from "react";

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
      });
    }
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
      <div ><a href="./advanced_search" className="float-right mr-12 mt-8 text-lg">高级搜索</a></div>
      <div className="mt-16 mx-5 md:mx-24 lg:mt-36 flex-auto">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-center">中医药政策搜索</h1>
        <form className="md:w-3/4 xl:max-w-screen-md mx-auto" onSubmit={handleSubmit}>
          <div className="flex items-center mt-12 mx-5 lg:mt-16 xl:mt-24 border border-gray-300 rounded-lg h-12 px-4">
            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-gray-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor" onClick={handleSubmit}>
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>

            <input className="h-8 flex-1 px-4 text-xl focus:outline-none"
              value={inputValue} onChange={handleInputChange} />

            {/* Close Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-gray-400 hover:text-black" viewBox="0 0 20 20" fill="currentColor" onClick={handleClearContent}>
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          <div className="flex justify-between max-w-xs min-w-max mx-auto mt-16 ">
            <button className="h-12 lg:h-14 px-4 w-32 lg:w-40 rounded-lg  tracking-widest font-bold lg:font-bold xl:font-extrabold border-2 border-gray-600  active:border-0 focus:ring-2 focus:ring-black focus:ring-opacity-50" type="submit">搜索</button>
            <button className="h-12 lg:h-14 px-4 w-32 lg:w-40 ml-6 lg:ml-16 rounded-lg text-gray-50 tracking-widest font-bold lg:font-bold xl:font-extrabold bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50" type="button" onClick={handleAboutUS}>关于我们</button>
            {hitModal ? <Modal className="w-20 ml-36" hitModal={hitModal} setHitModal={setHitModal} /> : null}
          </div>
        </form>
      </div>
    </div>

  );
  return (home);
}

export default Home;
