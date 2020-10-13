import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDealline } from '@/api/stocks'
import ReactEcharts from 'echarts-for-react'
import { PropTypes } from 'prop-types'
import store from '@/store'
import moment from 'moment'

class UsetoStocks extends Component {

  static propTypes = {
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  componentDidUpdate () {
  }
  render () {
    return (
      <div>
        {
          this.props.usetoStocks.map((stock) => {
            return (<a key={stock} onClick={() => this.props.onClick(stock)}>{this.props.code_name[stock]}&nbsp;&nbsp;</a>)
          })
        }
      </div>
    )
  }
}

export default connect(state => {
  return { ...state.stocks, ...state.dicts }
})(UsetoStocks)
