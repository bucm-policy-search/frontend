import React, { useState } from "react";

import { useRouter } from "next/router";
import Modal from "../components/Modal";

import styles from "./index.module.css";

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

  const setModalClose = () => {
    setHitModal(false);
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

    <div className={styles.main}>
      <div>
        <a href="./advanced_search" className={styles.advancedSearch}>高级搜索</a>
        <a href="./tutorial" className={styles.tutorial}>使用教程</a>
      </div>
      <div className={styles.body}>
        <h1 className={styles.title}>中医药政策搜索</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icons} viewBox="0 0 20 20" fill="currentColor" onClick={handleSubmit}>
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>

            <input className={styles.input}
              value={inputValue} onChange={handleInputChange} />

            {/* Close Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icons} viewBox="0 0 20 20" fill="currentColor" onClick={handleClearContent}>
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          <div className={styles.buttonsDiv}>
            <button className={styles.searchButton} type="submit">
              搜索
            </button>
            <button className={styles.aboutUsButton} type="button" onClick={handleAboutUS}>
              关于我们
            </button>
            {hitModal ? <Modal setModalClose={setModalClose} /> : null}
          </div>
        </form>
      </div>
    </div>

  );
  return (home);
}

export default Home;
