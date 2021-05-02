import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';

import Modal from './components/Modal'
import SearchBox from './components/SearchBox'
import './Home.css'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: false,
			searchContent: '',
			inputValue: ''
		}
	}

	render() {

		const handleSearch = e => {
			// e.preventDefault()
			// history.push('/search')
			console.log('Search hit')
			handleSubmit()
		}

		const handleInputChange = e => {
			this.setState({
				inputValue: e.target.value
			})
			console.log('inputValue:' + this.state.inputValue)
		}

		const handleSubmit = e => {
			this.setState({
				redirect: true,
				searchContent: this.state.inputValue
			})
			console.log("this state:" + e)
		}

		const handleClearContent = () => {
			this.setState({
				inputValue: ''
			})
		}

		let home = (
			<div className="home">
				<div className="home__body">
					<h1>中医药搜索引擎</h1>
					<form className="search" onSubmit={handleSubmit}>
						<div className="search__input">
							<SearchIcon className="search__icon" onClick={handleSearch} />
							<input value={this.state.inputValue} onChange={handleInputChange} />
							<CloseRoundedIcon className="close__icon" onClick={handleClearContent} />
						</div>
						<div className='search__button'>
							<Button variant="outlined" type="submit" onClick={handleSearch} >搜索</Button>
							<Modal />
						</div>

					</form>

				</div>
			</div>
		)

		const { redirect } = this.state

		console.log("redirect touch: " + redirect)
		let e = this.state.searchContent
		let aaa = (<Redirect
			to={{
				pathname: '/search',
				search: '?q=' + e,
				state: {
					searchContent: e
				}
			}}
		/>)
		return (redirect === true ? aaa : home)
	}
}

export default Home