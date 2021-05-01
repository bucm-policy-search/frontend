import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { Redirect } from 'react-router-dom'

import Modal from '../components/Modal'
import SearchBox from '../components/SearchBox'
import './Home.css'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: false,
			searchContent: ''
			// redirect: this.props.redirect
		}
	}

	updateData = data => {
		this.setState({
			redirect: true,
			searchContent: data
		})
	}

	render() {
		let home = (
			<EuiFlexGroup direction="column" justifyContent="spaceEvenly" className="flex-group">
				<EuiFlexItem grow={false} className="title">
					<div>
						<h1>中医药搜索引擎</h1>
						<h2>{this.state.searchContent}</h2>
					</div>

				</EuiFlexItem>

				<EuiFlexItem grow={false} className="flex-item-search-box">
					<SearchBox handleUpdateData={this.updateData.bind(this)} />
				</EuiFlexItem>

				<EuiFlexItem grow={false} className="modal">
					<Modal />
				</EuiFlexItem>

			</EuiFlexGroup>
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