import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';

import Modal from './components/Modal'
import './Home.css'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: false,
			inputValue: ''
		}
	}

	render() {

		const handleSearch = e => {-
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
					<form className="home__search" onSubmit={handleSubmit}>
						<div className="home__search__input">
							<SearchIcon className="home__search__icon" onClick={handleSearch} />
							<input value={this.state.inputValue} onChange={handleInputChange} />
							<CloseRoundedIcon className="close__icon" onClick={handleClearContent} />
						</div>
						<div className="home__search__button">
							<Button variant="outlined" type="submit" onClick={handleSearch} >搜索</Button>
							<Modal />
						</div>

					</form>

				</div>
			</div>
		)

		const { redirect } = this.state

		console.log("redirect touch: " + redirect)
		let e = this.state.inputValue
		// let redirect1 = (<Redirect
		// 	to={{
		// 		pathname: '/search',
		// 		search: '?q=' + e,
		// 		state: {
		// 			searchContent: e
		// 		}
		// 	}}
		// />)
		return (redirect === true ? redirect1 : home)
	}
}

export default Home