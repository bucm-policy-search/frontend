import React from 'react'
import qs from 'qs'

import SearchBox from './components/SearchBox'
import './Search.css'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'

console.log('23434:' + process.env.PROXY_URL)

class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchContent: '',
			inputValue: this.props.location.search ?
				qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).q :
				'',
			firstInit: true
		}
	}

	fetchData = () => {
		let  searchContent  = this.state.inputValue
		if (searchContent) {
			let fetch_url = process.env.REACT_APP_PROXY_URL + '?q=' + this.state.searchContent
			console.log(fetch_url)
			fetch(fetch_url)
				.then(data => console.log(data.body))
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
		this.setState({
			searchContent: this.state.inputValue,
		})
		this.fetchData()
	}

	render() {
		let search = (
			<div className="search">
				<div className="search__input">
					<SearchIcon className="search__inputIcon" />
					<input value={this.state.inputValue} onChange={this.handleInputChange} />
				</div>
				<Button onClick={this.handleSearch} variant="outlined" >搜索</Button>
			</div>


		)



		return (search)
	}
}



export default Search