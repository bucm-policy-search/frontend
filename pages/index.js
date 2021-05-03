import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';
import redirect from 'nextjs-redirect'

import Modal from '../components/Modal'
import styles from './index.module.css'

function Home() {
	const [shouldRedirect, setShouldRedirect] = useState(false)
	const [inputValue, setInputValue] = useState('')


	const handleSearch = e => {
		console.log('Search hit')
		handleSubmit()
	}

	const handleInputChange = e => {
		setInputValue(e.target.value)
		console.log('inputValue:' + inputValue)
	}

	const handleSubmit = e => {
		setShouldRedirect(true)
		console.log("this state:" + e)
	}

	const handleClearContent = () => {
		setInputValue('')
	}

	let home = (
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
						<Button variant="outlined" type="submit" onClick={handleSearch} >搜索</Button>
						<Modal />
					</div>
				</form>
			</div>
		</div>
	)

	const Redirect = redirect('/search/' + inputValue)

	return (
		shouldRedirect === true ? Redirect : home
	)
}

export default Home