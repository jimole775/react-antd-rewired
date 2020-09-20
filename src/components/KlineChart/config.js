
const barLabel = {
  normal: {
    show: true,
    position: 'bottom',
    formatter: (a) => {
      return (Number.parseFloat(a.value) / Number.parseFloat(a.data.openvalue) * 100).toFixed(2) + '%'
    }
  }
}
export const chartOption = {
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
      label: barLabel
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
      label: barLabel
    }
  ]
}