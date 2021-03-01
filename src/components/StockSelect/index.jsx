import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Input, Select } from "antd";
import { updateCurrentStock }  from '@/store/actions'
import store from '@/store'
import { debounce } from "lodash";
const StockSelect = (props) => {
  const [state, setState] = useState({
    ...props,
    options: null
  })
  const handleSearch = value => {
    if (value) {
      fetch(value);
    }
  }
  const fetch = value => {
    setState({
      ...props,
      options: createOptions(value)
    })
  }
  const createOptions = debounce(value => {
    const res = []
    if (props.code_name) {
      console.log(value)
      const arr = Object.entries(props.code_name)
      for (let index = 0; index < arr.length; index++) {
        if (!value && res.length === 10) break
        const element = arr[index]
        if (element[0].includes(value) || element[1].includes(value)) {
        res.push(<Select.Option key={element[0]}>{element[1]}</Select.Option>)
        } else {
          res.push(<Select.Option key={element[0]}>{element[1]}</Select.Option>)
        }
      }
    }
    console.log(res)
    return res
  }, 300)

  useEffect((val) => {
    // debugger
    // setOptions({ options: createOptions() })
    console.log('state:', state)
  }, [state])

  const valueChange = value => {
    store.dispatch(updateCurrentStock(value))
    state.onChange(value)
    setState({
      ...state,
      value
    })
  }

  return (<Select
    showSearch
    showArrow={false}
    filterOption={false}
    style={{width: '100%'}}
    defaultActiveFirstOption={false}
    defaultValue={state.defaultValue}
    value={state.value}
    placeholder={state.placeholder}
    onSearch={handleSearch}
    onBlur={state.onBlur}
    allowClear={state.allowClear}
    onPressEnter={state.onPressEnter}
    onChange={valueChange}
    notFoundContent={null}
  >
    { state.options || createOptions(state.value) }
  </Select>)
}

export default connect(state => {
  return { ...state.stocks, ...state.dicts }
}, {})(StockSelect)
