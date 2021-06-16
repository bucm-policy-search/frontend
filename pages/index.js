import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Button from "@material-ui/core/Button";

import { useRouter } from "next/router";
import Modal from "../components/Modal";
import styles from "./index.module.css";

function Home() {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    // ignore the ts's event deprecated warning, it still works now(2021/05/05)
    // remove "event.preventDefault()" will cause page redirect bug when use form

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

  const handleSearch = () => {
    handleSubmit();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  

  const handleClearContent = () => {
    setInputValue("");
  };

  const home = (
    <div className={styles.home}>
      <div className={styles.home__body}>
        <h1>中医药搜索引擎</h1>
        <form className={styles.home__search} onSubmit={handleSubmit}>
          <div className={styles.home__search__input}>
            <SearchIcon className={styles.home__search__icon} onClick={handleSearch} />
            <input value={inputValue} onChange={handleInputChange} />
            <CloseRoundedIcon className={styles.close__icon} onClick={handleClearContent} />
          </div>
          <div className={styles.home__search__button}>
            <Button variant="outlined" type="submit">搜索</Button>
            <Modal />
          </div>
        </form>
      </div>
    </div>
  );
  return (home);
}

export default Home;
