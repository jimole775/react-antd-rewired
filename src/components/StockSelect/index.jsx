import React from "react";
import { connect } from "react-redux";
import { Input, Select } from "antd";
import { toggleSettingPanel } from "@/store/actions";
const StockSelect = (props) => {
  const { toggleSettingPanel } = props;
  <Select
    showSearch
    value={this.state.value}
    placeholder={this.props.placeholder}
    style={this.props.style}
    defaultActiveFirstOption={false}
    showArrow={false}
    filterOption={false}
    onSearch={this.handleSearch}
    onChange={this.handleChange}
    notFoundContent={null}
  >
    {options}
  </Select>
}

handleSearch = value => {
  if (value) {
    fetch(value, data => this.setState({ data }));
  } else {
    this.setState({ data: [] });
  }
};

handleChange = value => {
  this.setState({ value });
};

export default connect(state => {
  return state.dicts
}, {})(StockSelect)
