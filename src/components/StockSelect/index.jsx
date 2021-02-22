import React, {useState} from "react";
import { connect } from "react-redux";
import { Input, Select } from "antd";
import { toggleSettingPanel } from "@/store/actions";
const { Option } = Select;
const StockSelect = (props) => {
  const [state, setState] = useState(props);

  const handleSearch = value => {
    if (value) {
      fetch(value, state);
    }
  };
  
  const handleChange = value => {
    // this.setState({ value });
    setState({ value })
  };
  const fetch = value => {
    
  };
  
  const createOptions = value => {
    return (<Option value="jack">Jack</Option>)
  };

  return (<Select
    showSearch
    showArrow={false}
    labelInValue={true}
    filterOption={false}
    style={{width: '100%'}}
    value={state.value}
    defaultActiveFirstOption={false}
    placeholder={props.placeholder}
    onSearch={handleSearch}
    onChange={handleChange}
    notFoundContent={null}
  >
    {createOptions()}
  </Select>)
}


export default connect(state => {
  return state.dicts
}, {})(StockSelect)
