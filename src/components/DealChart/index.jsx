import React, { Component } from 'react'
// import { connect } from "react-redux"
import { getDealLine } from '@/api/stocks'
import ReactEcharts from 'echarts-for-react'
import { PropTypes } from "prop-types"

class KlineChart extends Component {
  static propTypes = {
    data: PropTypes.object,
    date: PropTypes.string,
    stock: PropTypes.string
  }

  static defaultProps = {
    data: {}, // 截取小段数据
    date: '', // 如果有 date 和 stock ，那么就触发内部request  
    stock: ''
  }

  constructor (prop) {
    super(prop)
    this.echartsReact = null
    this.open_price = 0
    this.option = {
      legend: {
        data: ['涨', '跌']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '涨',
        itemStyle: {
          color: '#f73333',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }, {
        name: '跌',
        itemStyle: {
          color: '#0fb300',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    }
  }
  componentDidMount () {
    this.fetchData()
  }

  async fetchData () {
    let data = null
    let blanceline = 0
    if (this.props.date && this.props.stock) {
      const res = await getDealLine({ date: this.props.date, stock: this.props.stock })
      if (res.data.data) {
        data = res.data.data
        blanceline = res.data.open_p
      }
    }
    return Promise.resolve([data, blanceline])
  }

  async componentDidUpdate () {
    const [data, blanceline] = await this.fetchData()
    let deals = []
    if (data) {
      deals = data
    } else {
      deals = this.props.data.data
    }
    this.echartsReact.getEchartsInstance().setOption(this.getOption(deals, blanceline))
  }
  getOption (deals, blanceline = 0) {
    // const deals = this.props.data.data
    const prices = []
    const dates = []
    let yMin = 9999
    let yMax = 0
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


      if (price < blanceline * 1) {
        this.option.series[0].data.push(price)
        this.option.series[1].data.push(null)
      } else {
        this.option.series[0].data.push(null)
        this.option.series[1].data.push(price)
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
    
    // 跳空高度
    // this.option.series[0].data = prices
    this.option.xAxis.data = dates
    // itemStyle: {
    //   color: '#0fb300'
    // },
    this.option.yAxis.max = yMax
    this.option.yAxis.min = yMin
    // 涨幅
    // this.option.series[1].data = rise

    // // 跌幅
    // this.option.series[2].data = down

    // // X轴的数值处理
    // this.option.xAxis.data = [...dates].fill(' ')
    // this.option.xAxis.data[0] = dates[0]
    // this.option.xAxis.data[dates.length - 1] = dates[dates.length - 1]

    // // Y轴的数值处理
    // this.option.yAxis.max = (Number.parseFloat(maxPrice) + Number.parseFloat(maxPrice * 0.05)).toFixed(2)
    // this.option.yAxis.min = (Number.parseFloat(minPrice) - Number.parseFloat(minPrice * 0.05)).toFixed(2)
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

export default KlineChart
