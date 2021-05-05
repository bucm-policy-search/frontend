import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';

import Modal from '../components/Modal'
import styles from './index.module.css'
import { useRouter } from 'next/router';

function Home() {
	const [inputValue, setInputValue] = useState('')

	const router = useRouter()

	const handleSearch = e => {
		console.log('Search hit')
		handleSubmit()
	}

	const handleInputChange = e => {
		setInputValue(e.target.value)
		console.log('inputValue:' + inputValue)
	}

	const handleSubmit = () => {
		// ignore the ts's event deprecated warning, it still works now(2021/05/05)
		// remove "event.preventDefault()" will cause page redirect bug when use form 
		event.preventDefault() 
		router.push({
			pathname: '/search',
			query: {
				q: inputValue
			}
		},
			`/search?q=${inputValue}&page=1`,
			// {
			// 	shallow: true
			// }
		)
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
						<Button variant="outlined" type="submit" >搜索</Button>
						<Modal />
					</div>
				</form>
			</div>
		</div>
	)
	return (home)
}

export default Home