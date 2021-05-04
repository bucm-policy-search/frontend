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

	console.log('q:' + q)
	const [inputValue, setInputValue] = useState(q ? q : '')
	const [haveFetchData, setHaveFetchData] = useState(false)
	const [haveGotResult, setHaveGotResult] = useState(false)
	const [data, setData] = useState({})

	useEffect(() => {
		console.log('inputValue:' + inputValue)
		if (!haveFetchData && q) {
			console.log('fetchResult now')
			fetchData()
			setHaveFetchData(true)
		}
	})


	const fetchData = () => {
		let fetch_url = process.env.NEXT_PUBLIC_PROXY_URL + '?q=' + String(inputValue ? inputValue : q)
		console.log('proxy_url:' + process.env.NEXT_PUBLIC_PROXY_URL + '?q=' + String(inputValue ? inputValue : q))
		fetch(fetch_url)
			.then(res => res.json())
			.then(data => {
				setData(data)
				console.log(data)
				setHaveGotResult(true)
			})
			.catch(error => {
				console.error('Error:', error);
			})
	}

	const handleInputChange = e => {
		setInputValue(e.target.value)
	}

	const handleSearch = e => {
		setHaveFetchData(false)
		setHaveGotResult(false)
		router.push({
			pathname: '/search',
			query: {
				q: inputValue
			}
		},
			'/search?q=' + inputValue,
			{ shallow: true }
		)
	}

	const Content = (
		<>
			{haveGotResult && data.hits &&
				<div className={styles.body}>
					{data.hits.hits.map(value => {
						return (
							<div className={styles.article} key={value._source.title}>
								<a className={styles.article__title} href={value._source.urlsource}>
									{value._source.title}
								</a>
								<p className={styles.article__detail}>
									{value._source.article}
								</p>
							</div>
						)
					})
					}
				</div>
			}
		</>
	)


	const Page = (
		<div>
			<div className={styles.header}>
				<h1 className={styles.h1}>搜索引擎</h1>
				<div className={styles.input}>
					<SearchIcon className={styles.inputIcon} />
					<input value={inputValue} onChange={handleInputChange} />
				</div>
				<Button onClick={handleSearch} variant="outlined">搜索</Button>
			</div>
			{haveGotResult ?
				
			Content	: <div className={styles.body}> 正在搜索结果</div>}
		</div>
	)

	return (Page)

}

export default Search