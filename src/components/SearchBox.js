import { EuiFieldSearch } from '@elastic/eui';
import React from 'react'
import { Redirect } from "react-router-dom";

import './SearchBox.css'

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isClearable: '',
      redirect: false,
      searchContent: ''
    }
  }

  render() {
    let isClearable = true
    let onChange = e => {
      this.setState({
        value: e.target.value
      })
    }
    let onSearch = searchContent => {
      this.setState({
        redirect: true,
        searchContent: searchContent
      })
      this.props.handleUpdateData(this.state.searchContent)
    }
    let searchBox = (
      <EuiFieldSearch
        placeholder="搜索"
        value={this.state.value}
        isClearable={isClearable}
        incremental={Boolean(0)}
        onChange={e => {
          onChange(e)
        }}
        onSearch={searchContent => {
          onSearch(searchContent)
        }}
        className="euiFieldSearch"
        // updateData={this.updateData}
      />
    )

    return searchBox
  }

}

