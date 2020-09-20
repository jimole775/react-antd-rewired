const seriesDefaultProps = {
  type: 'line',
  symbol: 'none',
  lineStyle: {
    width: 2
  },
  smooth: true
}
export const chartOption = {
  legend: {
    data: ['涨', '开盘', '跌']
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
    type: 'value',
    axisLabel: {
    }
  },
  series: [{
    name: '涨',
    itemStyle: {
      color: '#f73333',
    },
    ...seriesDefaultProps
  }, {
    name: '开盘',
    itemStyle: {
      color: '#f90000',
    },
    ...seriesDefaultProps
  }, {
    name: '跌',
    itemStyle: {
      color: '#0fb300',
    },
    ...seriesDefaultProps
  }
]
}