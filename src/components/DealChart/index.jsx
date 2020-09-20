import React, { Component } from 'react'
import { connect } from "react-redux"
import { getDealline } from '@/api/stocks'
import ReactEcharts from 'echarts-for-react'
import { PropTypes } from "prop-types"
import store from '@/store'
import moment from "moment"
import { chartOption } from "./config"

class DealChart extends Component {
  constructor (props) {
    super(props)
    this.echartsReact = null
    this.blanceline = 0
    this.option = chartOption
  }
  componentDidMount () {
    this.fetchData()
  }

  async fetchData () {
    let data = null
    // let blanceline = 0
    if (this.props.stock) {
      const res = await getDealline({ date: moment(this.props.date || new Date()).format('YYYY-MM-DD'), stock: this.props.stock })
      if (res.data.list) {
        data = res.data.list
        this.blanceline = res.data.open_p * 1
      }
    }
    return Promise.resolve(data)
  }

  async componentDidUpdate () {
    this.echartsReact.getEchartsInstance().setOption(this.getOption(await this.fetchData()))
  }
  getOption (deals) {
    // const deals = this.props.data.data
    const blanceline = this.blanceline || 0
    const prices = []
    const dates = []
    let yMin = 9999
    let yMax = 0
    this.option.series[0].data = []
    this.option.series[1].data = []
    this.option.series[2].data = []
    deals && deals.forEach((daily, index) => {
      const price = daily.p * 1
      prices.push(price)
      dates.push(daily.t)
      if (price < yMin) {
        yMin = price
      }

      if (price > yMax) {
        yMax = price
      }

      this.option.series[1].data.push(blanceline)
      if (price < blanceline) {
        // this.option.series[0].data.push(null)
        const last0 = this.option.series[0].data[this.option.series[0].data.length - 1]
        if (last0 > blanceline) {
          this.option.series[0].data.push(price)
        } else {
          this.option.series[0].data.push(null)
        }
        this.option.series[2].data.push(price)
      } else if (price > blanceline) {
        this.option.series[0].data.push(price)

        const last2 = this.option.series[2].data[this.option.series[2].data.length - 1]
        if (last2 < blanceline) {
          this.option.series[2].data.push(price)
        } else {
          this.option.series[2].data.push(null)
        }
        // this.option.series[2].data.push(null)
      } else if (price === blanceline) {
        this.option.series[0].data.push(blanceline)
        this.option.series[2].data.push(blanceline)
      }
      //   // 当 index 为 0 时，就默认当天为前一天，这样可以避免逻辑复杂化
      //   let prevDaily = deals[index - 1] ? deals[index - 1] : daily
      //   let [prev_date, prev_open, prev_close, _high, _low] = prevDaily.split(',')
      //   let [date, open, close, high, low] = daily.split(',')
      //   if (Number.parseFloat(maxPrice) < Number.parseFloat(open)) maxPrice = open
      //   if (Number.parseFloat(minPrice) > Number.parseFloat(close)) minPrice = close
      //   // 如果日期相同，就把 “当天的开盘价” 当作 “昨天的收盘价”
      //   if (date === prev_date) prev_close = open

      //   // 当日价差 = 当天的收盘价 - 前一天的收盘价
      //   let diff = Number.parseFloat(close) - Number.parseFloat(prev_close)
      //   if (diff < 0) {
      //     // 处理跌幅
      //     rise.push('-')
      //     down.push({ openvalue: open, value: Math.abs(diff).toFixed(2) })
      //     // 砥柱高度为：前一天的收盘价 + 当天的差价
      //     assiants.push(Number.parseFloat(prev_close) + Number.parseFloat(diff))
      //   } else {
      //     // 处理涨幅
      //     rise.push({ openvalue: open, value: diff.toFixed(2) })
      //     down.push('-')
      //     // 砥柱高度为：当天的开盘价
      //     assiants.push(open)
      //   }
    })
    this.option.xAxis.data = dates
    const absLimit = yMax - blanceline > blanceline - yMin ? yMax - blanceline : blanceline - yMin
    this.option.yAxis.max = (absLimit + blanceline + blanceline * 0.01).toFixed(2) * 1
    this.option.yAxis.min = (blanceline - absLimit - blanceline * 0.01).toFixed(2) * 1
   
    this.option.yAxis.axisLabel.formatter = (a, b) => {
      if (!a || !blanceline) return 0
      if (a > blanceline) {
        return (((a - blanceline) / blanceline) * 100).toFixed(0) + '%'
      }
      if (a < blanceline) {
        return (((blanceline - a) / blanceline) * 100).toFixed(0) + '%'
      }
      return 0
    }
    return this.option
  }
  render () {
    return <div>
      <ReactEcharts
        option={this.getOption()}
        // 获取ReactEcharts的引用
        ref={(e) => { this.echartsReact = e }} 
      />
    </div>
  }
}
export default connect(state => state.stocks.deal)(DealChart)
