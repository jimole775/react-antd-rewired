import React, { Component } from 'react'
// import { connect } from "react-redux"
import ReactEcharts from 'echarts-for-react'
import { PropTypes } from "prop-types"

class KlineChart extends Component {
  static propTypes = {
    data: PropTypes.object,
    stock: PropTypes.string
  }

  static defaultProps = {
    data: {},
    stock: '000001'
  }
  constructor (prop) {
    super(prop)
    this.echartsReact = null
    this.option = {
      // title: {
      //   text: '阶梯瀑布图',
      //   subtext: 'From ExcelHome',
      //   sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
      // },
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {  // 坐标轴指示器，坐标轴触发有效
      //     type: 'line'  // 默认为直线，可选为：'line' | 'shadow'
      //   },
      // },
      // grid: {
      //   height: 200
      // },
      // legend: {
      //   data: ['涨', '跌']
      // },
      grid: {
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
          type: 'value',
          scale: true,
          name: '价格',
          max: 100,
          min: 0,
          boundaryGap: [0.2, 0.2]
      },
      series: [
        {
          name: '收盘价',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          },
          // emphasis: {
          //   itemStyle: {
          //     barBorderColor: 'rgba(0,0,0,0)',
          //     color: 'rgba(0,0,0,0)'
          //   }
          // },
          data: []
        },
        {
          name: '涨',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#f73333'
          },
          barWidth: 20,
          data: [],
          label: {
            normal: {
              show: true,
              position: 'bottom',
              formatter: (a) => {
                return (Number.parseFloat(a.value) / Number.parseFloat(a.data.openvalue) * 100).toFixed(2) + '%'
              }
            }
          }
        },
        {
          name: '跌',
          type: 'bar',
          stack: '总量',
          barWidth: 20,
          itemStyle: {
            color: '#0fb300'
          },
          data: [],
          label: {
            normal: {
              show: true,
              position: 'bottom',
              formatter: (a) => {
                return (Number.parseFloat(a.value) / Number.parseFloat(a.data.openvalue) * 100).toFixed(2) + '%'
              }
            }
          }
        }
      ]
    }
    // this.echartsReact.getEchartsInstance().setOption(getOption())
  }
  componentDidMount () {

  }

  getOption () {
    const klines = this.props.data.klines
    const assiants = []
    const rise = []
    const down = []
    const dates = []
    let maxPrice = 0
    let minPrice = 9999
    klines && klines.forEach((daily, index) => {
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
        // 砥柱高度为：前一天的收盘价 + 当天的差价
        assiants.push(Number.parseFloat(prev_close) + Number.parseFloat(diff))
      } else {
        // 处理涨幅
        rise.push({ openvalue: open, value: diff.toFixed(2) })
        down.push('-')
        // 砥柱高度为：当天的开盘价
        assiants.push(open)
      }
      dates.push(date)
    })
    
    // 跳空高度
    this.option.series[0].data = assiants

    // 涨幅
    this.option.series[1].data = rise

    // 跌幅
    this.option.series[2].data = down

    // X轴的数值处理
    this.option.xAxis.data = [...dates].fill(' ')
    this.option.xAxis.data[0] = dates[0]
    this.option.xAxis.data[dates.length - 1] = dates[dates.length - 1]

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

export default KlineChart
