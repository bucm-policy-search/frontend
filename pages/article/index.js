import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import parse, { attributesToProps } from 'html-react-parser'

import styles from './index.module.css'

function Search() {
	const router = useRouter()
	const { q } = router.query

	console.log('q:' + q)
	const [haveFetchedData, setHaveFetchedData] = useState(false)
	const [haveGotResult, setHaveGotResult] = useState(false)
	const [data, setData] = useState({})

	useEffect(() => {
		if (!haveFetchedData && q) {
			console.log('fetchResult now')
			fetchData('article')
			setHaveFetchedData(true)
		}
	})


	const fetchData = (kind) => {
		let fetch_url = `${process.env.NEXT_PUBLIC_PROXY_URL}/api/${kind}?q=${String(q)}`
		console.log(`${process.env.NEXT_PUBLIC_PROXY_URL}/api/${kind}?q=${String(q)}`)
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

	const Content = (
		<>
			{haveGotResult && data.hits.hits &&
				<div className={styles.body}>

					{/* only have one element, but to simplify the development, just C-V from 'search.js' */}
					{data.hits.hits.map(value => {

						// To set img src url from relative to absolute
						// replace element attributes : https://github.com/remarkablemark/html-react-parser#replace-element-attributes
						function relative_To_Absolute(base, relative) {
							let stack = base.split("/")
							let parts = relative.split("/")
							stack.pop(); // remove current file name (or empty string)
							// (omit if "base" is the current folder without trailing slash)
							for (let i = 0; i < parts.length; i++) {
								if (parts[i] == ".")
									continue
								if (parts[i] == "..")
									stack.pop()
								else
									stack.push(parts[i])
							}
							return stack.join("/")
						}

						const options = {
							replace: domNode => {
								if (domNode.attribs && domNode.name === 'img') {
									const props = attributesToProps(domNode.attribs)
									console.log("options_url:")
									console.log(props.src)
									props.src = relative_To_Absolute(value._source.urlsource, props.src)
									return <img {...props} />
								}
							}
						}

						return (
							<div className={styles.article} key={value._source.title}>
								<h1 className={styles.title}>
									{value._source.title}
								</h1>
								<p className={styles.source}>
									原文地址：<a href={value._source.urlsource}>{value._source.urlsource}</a>
								</p>
								<div className={styles.detail}>
									{
										parse(value._source.article, options)
									}
								</div>
								<div className={styles.attachments}>
									{
										value._source.attachment.map((value, index) => {
											return (
												<div className={styles.attachment} key={value.link}>
													附件{index + 1}：<a href={value.link}>{value.mark}</a>
												</div>
											)
										})
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
		<div>
			{haveGotResult ?
				Content :
				<div className={styles.body}>正在获取信息...</div>}
		</div>
	)

	return (Page)

}

export default Search