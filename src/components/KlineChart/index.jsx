import React from 'react'
import echarts from "echarts"
// import { connect } from "react-redux"
import ReactEcharts from 'echarts-for-react'

const option = {
  // title: {
  //   text: '阶梯瀑布图',
  //   subtext: 'From ExcelHome',
  //   sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {  // 坐标轴指示器，坐标轴触发有效
      type: 'line'  // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  legend: {
    data: ['涨', '跌']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine: { show: false },
    splitNumber: 3,
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
      label: {
        show: true,
        position: 'top'
      },
      itemStyle: {
        color: '#f73333'
      },
      barWidth: 20,
      data: [],
      label: {
        normal: {
          show: true,
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
      label: {
        show: true,
        position: 'bottom'
      },
      barWidth: 20,
      itemStyle: {
        color: '#0fb300'
      },
      data: [],
      label: {
        normal: {
          show: true,
          formatter: (a) => {
            return (Number.parseFloat(a.value) / Number.parseFloat(a.data.openvalue) * 100).toFixed(2) + '%'
          }
        }
      }
    }
  ]
}

let echartsReact = null
let curKlineCode = null
const KlineChart = (props) => {

  // 用useEffect监听props有没有更新
  React.useEffect(() => {
    if (curKlineCode !== props.data.code) {
      curKlineCode = props.data.code
      echartsReact.getEchartsInstance().setOption(getOption())
    }
  })

  const getOption = () => {
    const klines = props.data.klines
    const assiants = []
    const rise = []
    const down = []
    const dates = []
    klines && klines.forEach((daily, index) => {
      // 当 index 为 0 时，就默认当天为前一天，这样可以避免逻辑复杂化
      let prevDaily = klines[index - 1] ? klines[index - 1] : daily
      let [prev_date, prev_open, prev_close, _high, _low] = prevDaily.split(',')
      let [date, open, close, high, low] = daily.split(',')

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
    option.series[0].data = assiants

    // 涨幅
    option.series[1].data = rise

    // 跌幅
    option.series[2].data = down

    // X轴的数值处理
    option.xAxis.data = dates

    // Y轴的数值处理
    const base = Math.abs(assiants[0])
    option.yAxis.max = (base + base * 0.2).toFixed(2)
    option.yAxis.min = (base - base * 0.2).toFixed(2)
    return option
  }
  return (
    <ReactEcharts
      option={getOption()}
      // 获取ReactEcharts的引用
      ref={(e) => { echartsReact = e }} 
    ></ReactEcharts>
  )
}

export default KlineChart
