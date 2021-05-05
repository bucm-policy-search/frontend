import React, { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import Parser from 'html-react-parser'

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
		event.preventDefault() // ignore the ts's deprecated warning, it still works now
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
								<a className={styles.article__title} href={`/article?q=${value._source.title}`}>
									{value._source.title}
								</a>
								<div className={styles.article__detail}>
										{Parser(value._source.article)}
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
			{haveGotResult ?
				Content : <div className={styles.body}> 正在搜索结果</div>}
		</div>
	)

	return (Page)

}

export default Search