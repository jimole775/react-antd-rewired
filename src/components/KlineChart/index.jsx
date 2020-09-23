import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import { PropTypes } from 'prop-types'
import { getKline } from '@/api/stocks'
import { chartOption } from "./config"

class KlineChart extends Component {
  constructor (props) {
    super(props)
    this.echartsReact = null
    this.option = chartOption
  }
  componentDidMount () {
    
  }
  async componentDidUpdate () {
    this.echartsReact.getEchartsInstance().setOption(this.getOption(await this.fetchData()))
  }

  async fetchData () {
    let data = []
    if (this.props.stock) {
      const res = await getKline({ stock: this.props.stock })
      if (res.data.list) {
        data = res.data.list
      }
    }
    return Promise.resolve(data)
  }

  getOption (klines = []) {
    const assiants = []
    const rise = []
    const down = []
    const dates = []
    let maxPrice = 0
    let minPrice = 9999
    klines = klines.slice(klines.length - 40, klines.length)
    klines.forEach((daily, index) => {
      // 当 index 为 0 时，就默认当天为前一天，这样可以避免逻辑复杂化
      let prevDaily = klines[index - 1] ? klines[index - 1] : daily
      let [prev_date, prev_open, prev_close, _high, _low] = prevDaily.split(',')
      let [date, open, close, high, low] = daily.split(',')
      if (Number.parseFloat(maxPrice) < Number.parseFloat(open)) maxPrice = open
      if (Number.parseFloat(minPrice) > Number.parseFloat(close)) minPrice = close
      // 如果日期相同，就把 “当天的开盘价” 当作 “昨天的收盘价”
      if (date === prev_date) prev_close = open

      // 当日价差 = 当天的收盘价 - 前一天的收盘价
      let diff = Number.parseFloat(close) - Number.parseFloat(prev_close)
      if (diff < 0) {
        // 处理跌幅
        rise.push('-')
        down.push({ openvalue: open, value: Math.abs(diff).toFixed(2) })
        // 柱体高度为：前一天的收盘价 + 当天的差价
        assiants.push(Number.parseFloat(prev_close) + Number.parseFloat(diff))
      } else {
        // 处理涨幅
        rise.push({ openvalue: open, value: diff.toFixed(2) })
        down.push('-')
        // 柱体高度为：当天的开盘价
        assiants.push(open)
      }
      dates.push(date)
    })

    // 辅助线，使得柱体悬空
    this.option.series[0].data = assiants

    // 涨幅
    this.option.series[1].data = rise

    // 跌幅
    this.option.series[2].data = down

    // X轴的数值处理
    // this.option.xAxis.data = [...dates].fill(' ')
    // this.option.xAxis.data[0] = dates[0]
    // this.option.xAxis.data[dates.length - 1] = dates[dates.length - 1]
    this.option.xAxis.data = dates

    // Y轴的数值处理
    this.option.yAxis.max = (Number.parseFloat(maxPrice) + Number.parseFloat(maxPrice * 0.05)).toFixed(2)
    this.option.yAxis.min = (Number.parseFloat(minPrice) - Number.parseFloat(minPrice * 0.05)).toFixed(2)
    // console.log(this.option.yAxis.max)
    // console.log(this.option.yAxis.min)
    return this.option
  }
  render () {
    return <ReactEcharts
      option={this.getOption()}
      // 获取ReactEcharts的引用
      ref={(e) => { this.echartsReact = e }} 
    ></ReactEcharts>
  }
}

export default connect(state => state.stocks.kline)(KlineChart)
// export default KlineChart
