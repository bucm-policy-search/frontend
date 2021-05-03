import React from 'react'
import qs from 'qs'


import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import './index.css'


class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inputValue: this.props.location.state ?
				this.props.location.state.searchContent :
				this.props.location.search ?
					qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).q
					: '',
			redirectToArticlePage: false,
			haveResult: false,
			data: {
				data: ''
			}
		}
	}

	fetchData = () => {
		let searchContent = this.state.inputValue
		if (searchContent) {
			let fetch_url = process.env.REACT_APP_PROXY_URL + '?q=' + searchContent
			// console.log(fetch_url)
			let that = this
			fetch(fetch_url)
				.then(res => res.json(res))
				.then(data => {
					that.setState({
						data: { data },
						haveResult: true
					})
					console.log('successful get data!')
					console.log(this.state.data.data)
					return data
				})
				.catch(error => {
					console.error('Error:', error);
				})
		}
	}

	handleInputChange = e => {
		this.setState({
			inputValue: e.target.value,
		})
	}

	handleSearch = e => {
		window.location.reload();
		this.fetchData()
	}

	componentDidMount() {
		this.fetchData()
	}

	render() {
		let content = (
			<div className="aaaa">
				{this.state.haveResult && this.state.data.data.hits.hits.map((value) => {
					<div className="search__article">
						<a className="search__article__title" key={value._source.title}>
							{value._source.title}
						</a>
						<p className="search__article__detail" key={value._source.urlsource}>
							{value._source.urlsource}
						</p>
					</div>
				})
				}
			</div>

		)
		let search = (
			<div>
				<div className="search__header">
					<div className="search__input">
						<SearchIcon className="search__inputIcon" />
						<input value={this.state.inputValue} onChange={this.handleInputChange} />
					</div>
					<Button onClick={this.handleSearch} variant="outlined">搜索</Button>
				</div>
				{this.state.haveResult ? content : <div />}
			</div>

		)
		let e = this.state.inputValue
		let redirect = (<Redirect
			to={{
				pathname: '/page',
				state: {
					data: this.state.data
				}
			}}
		/>)

		return (this.state.redirectToArticlePage ? redirect : search)
	}
}

export default Search