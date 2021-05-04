import React, { useState, useEffect, Fragment } from 'react'
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
	const [haveFetchedData, setHaveFetchedData] = useState(false)
	const [haveGotResult, setHaveGotResult] = useState(false)
	const [data, setData] = useState({})

	useEffect(() => {
		console.log('inputValue:' + inputValue)
		if (!haveFetchedData && q) {
			console.log('fetchResult now')
			fetchData()
			setHaveFetchedData(true)
		}
	})

	function highLightKeyword(content, data) {
		let hits = data.hits.hits
		let highted_data = hits.map(hitOne => {
			let initArticle = hitOne._source.article
			let newArticle = initArticle.replace(new RegExp(content, 'g'), `<span class="{styles.keyword-match}">${content}</span>`)
			// change "<" to "&lt;" 
			newArticle = newArticle.replace(new RegExp('<', 'g'), "&lt;")
			newArticle = newArticle.replace(new RegExp('>', 'g'), "&gt;")
			hitOne._source.article = newArticle
			return hitOne
		})
		data.hits.hits = highted_data
		console.log("hightKeyword_data:")
		console.log(data)
		return data
	}

	const fetchData = () => {
		let fetch_url = process.env.NEXT_PUBLIC_PROXY_URL + '?q=' + String(inputValue ? inputValue : q)
		console.log('proxy_url:' + process.env.NEXT_PUBLIC_PROXY_URL + '?q=' + String(inputValue ? inputValue : q))
		fetch(fetch_url)
			.then(res => res.json())
			.then(data => {
				let newData = highLightKeyword(inputValue, data)
				return newData
			})
			.then(data => {
				setData(data)
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
		setHaveFetchedData(false)
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
			{haveGotResult && data.hits.hits &&
				<div className={styles.body}>
					{data.hits.hits.map(value => {
						return (
							<div className={styles.article} key={value._source.title}>
								<a className={styles.article__title} href={value._source.urlsource}>
									{value._source.title}
								</a>
								<div className={styles.article__detail}>
										{value._source.article}
								</div>
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

				Content : <div className={styles.body}> 正在搜索结果</div>}
		</div>
	)

	return (Page)

}

export default Search