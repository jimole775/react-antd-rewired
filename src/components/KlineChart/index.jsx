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
    //   formatter: function (params) {
    //     var tar
    //     if (params[1].value !== '-') {
    //       tar = params[1]
    //     }
    //     else {
    //       tar = params[0]
    //     }
    //     return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
    //   }
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
      name: '开盘价',
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
      data: []
    },
    {
      name: '跌',
      type: 'bar',
      stack: '总量',
      label: {
        show: true,
        position: 'bottom'
      },
      data: []
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
    klines && klines.forEach((daily) => {
      const [date, open, close, high, low] = daily.split(',')
      dates.push(date)

      // 涨跌需要根据前一日的收盘价和当日的开盘价做对比才能得出
      // 因为有时候开盘价是跌停开盘，一直跌到收盘，那么涨跌只有0
      const diff = Number.parseFloat(close) - Number.parseFloat(open)

      if (diff < 0) {
        // 处理跌幅
        rise.push('-')
        down.push(Math.abs(diff).toFixed(2))
      } else {
        // 处理涨幅
        rise.push(diff.toFixed(2))
        down.push('-')
      }
      assiants.push(open)
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
