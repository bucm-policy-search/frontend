/* eslint-disable react/prop-types */
import { EuiFieldSearch } from '@elastic/eui';
import React from 'react';

import './SearchBox.css';

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      firstInit: true,
    };
  }

  componentDidUpdate(prevState) {
    const { value, firstInit } = this.state;
    this.onUpdate(function callback() {
      if (value !== prevState.value && firstInit) {
        this.setState({
          firstInit: false,
        });
      }
    });
  }

  render() {
    const isClearable = true;
    const { value } = this.props;
    const onChange = (e) => {
      this.setState({
        value: e.target.value,
      });
    };

    const searchBox = (
      <EuiFieldSearch
        placeholder="搜索"
        value={value}
        isClearable={isClearable}
        incremental={Boolean(0)}
        onChange={(e) => {
          onChange(e);
        }}
        onSearch={(searchContent) => {
          const { handleUpdateData } = this.props;
          handleUpdateData(searchContent);
        }}
        className="euiFieldSearch"
      />
    );

    return searchBox;
  }
}
