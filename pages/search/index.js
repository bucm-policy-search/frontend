import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import redirect from 'nextjs-redirect'
import qs from 'qs'
import useSWR from 'swr'

import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import styles from './index.module.css'


function Search(props) {
	const router = useRouter()
	const { q } = router.query

	const [inputValue, setInputValue] = useState(q || '')
	const [shouldGoArticlePage, setShouldGoArticlePage] = useState(false)
	const [haveGetResult, setHaveGetResult] = useState(false)
	const [data, setData] = useState(props.data)

	useEffect(() => {
		fetchData()
	})

	const fetchData = () => {
		let searchContent = inputValue
		if (searchContent) {
			let fetch_url = process.env.REACT_APP_PROXY_URL + '?q=' + searchContent

			fetch(fetch_url)
				.then(res => res.json(res))
				.then(data => {
					setData({ data })
					setHaveGetResult(true)
					console.log('successfully get data!')
					return data
				})
				.catch(error => {
					console.error('Error:', error);
				})
		}
	}

	const handleInputChange = e => {
		setInputValue(e.target.value)
	}

	const handleSearch = e => {
		window.location.reload();
		fetchData()
	}

	const Content = (
		<div>
			{haveGetResult && data.data.hits.hits.map((value) => {
				<div className={styles.article}>
					<a className={styles.article__title} key={value._source.title}>
						{value._source.title}
					</a>
					<p className={styles.article__detail} key={value._source.urlsource}>
						{value._source.urlsource}
					</p>
				</div>
			})}
		</div>

	)
	const Page = (
		<div>
			<div className={styles.header}>
				<div className={styles.input}>
					<SearchIcon className={styles.inputIcon} />
					<input value={inputValue} onChange={handleInputChange} />
				</div>
				<Button onClick={handleSearch} variant="outlined">搜索</Button>
			</div>
			{haveGetResult ? Content : <div> 正在搜索结果</div>}
		</div>

	)

	return (Page)

}

export default Search