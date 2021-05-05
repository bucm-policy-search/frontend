import React, { useState, useEffect, Children } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import parse, { attributesToProps, domToReact } from 'html-react-parser'

import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import styles from './index.module.css'

function Search() {
	const router = useRouter()
	const { q } = router.query
	const { page } = router.query

	const [inputValue, setInputValue] = useState(q ? q : '')
	const [haveFetchedData, setHaveFetchedData] = useState(false)
	const [haveGotResult, setHaveGotResult] = useState(false)
	const [data, setData] = useState({})

	useEffect(() => {
		console.log('inputValue:' + inputValue)
		if (!haveFetchedData && q) {
			console.log('fetchResult now')
			fetchData('search')
			setHaveFetchedData(true)
		}
	})


	const fetchData = (kind) => {
		let fetch_url = `${process.env.NEXT_PUBLIC_PROXY_URL}/api/${kind}?q=${String(inputValue ? inputValue : q)}&page=${page}`
		console.log(fetch_url)

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
				q: inputValue,
				page: page
			}
		},
			`/search?q=${inputValue}&page=${page}`,
			{ shallow: true }
		)
	}

	function PageNum() {
		let components = []
		if (data.hits) {
			for (let i = 1; i <= Math.ceil(data.hits.total.value / 10); i++) {
				let url = `http://localhost:3000/search?q=${q}&page=${i}`
				console.log('i==page:' + page)
				components[i] = (i == page) ?
					(
						<div className={styles.page_num}>{i}</div>
					) :
					(
						<div className={styles.page_num}>
							<a href={url}>{i}</a>
						</div>
					)
			}
		}
		return components
	}

	function highlightPhrases(value) {
		console.log("highlightPhrases Value:")
		console.log(value)
		let result = []
		if (value.highlight && value.highlight.article) {
			result = value.highlight.article.map(highlightPhrase => {
				return <span>{parse(highlightPhrase+"...")}</span>
				console.log("highlightPhrases:" + highlightPhrase)
			})
		}
		console.log("highlightResult:")
		console.log(result)
		return result
	}



	const Content = (
		<>
			{haveGotResult && data.hits.hits &&
				<div className={styles.body}>
					<div className={styles.hits_num}>共搜索到 {data.hits.total.value} 条结果</div>
					{data.hits.hits.map(value => {

						const options = {
							replace: (domNode) => {
								if (!domNode)
									return
								// remove img tag and its descendant
								if (domNode.name === 'img')
									return <></>;
								if (domNode.name === 'table')
									return <></>;

								// TODO !
								// TODO: remove all the attributes in web scraping
								// Comment it to speed up
								if (domNode.name === 'span') {
									return (
										<span>
											{domToReact(domNode.children, options)}
										</span>
									)
								}
							}
						}

						return (
							<div className={styles.article} key={value._source.title}>
								<a className={styles.article__title} href={`/article?q=${String(value._source.title)}`}>
									{value._source.title}
								</a>
								<div className={styles.article__detail}>
									{
										highlightPhrases(value)
									}
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
		<div className={styles.page}>
			<form className={styles.header} onSubmit={handleSearch}>
				<a href="..">
					{/* Next.js pic is strange, just ignore */}
					{/* <Image className={styles.pic} alt="图片加载中..." src='/seach-icon.jpg' width={80} height={60} /> */}
					<h1 className={styles.h1}>搜索引擎</h1>
				</a>

				<div className={styles.input}>
					<SearchIcon className={styles.inputIcon} />
					<input value={inputValue} onChange={handleInputChange} />
				</div>
				<Button type="submit" variant="outlined">搜索</Button>
			</form>
			{haveGotResult ?
				Content : <div className={styles.body}>正在搜索结果</div>}
			<div className={styles.page_nums}>
				<strong>当前页数：</strong>{PageNum()}
			</div>
		</div>
	)

	return (Page)

}

export default Search