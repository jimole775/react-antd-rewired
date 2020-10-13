
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
    containLabel: false,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: function (params) {
      var tar;
      if (params[1].value !== '-') {
          tar = params[1];
      }
      else {
          tar = params[2];
      }
      return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
    }
  },
  xAxis: {
    type: 'category',
    data: []
    // data: function () {
    //     var list = [];
    //     for (var i = 1; i <= 11; i++) {
    //         list.push('11月' + i + '日');
    //     }
    //     return list;
    // }()
  },
  yAxis: {
    type: 'value',
    scale: true,
    name: '价格',
    boundaryGap: [0.2, 0.2]
  },
  series: [
    {
      name: ' ',
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
      barWidth: 5,
      data: []
      // label: barLabel
    },
    {
      name: '跌',
      type: 'bar',
      stack: '总量',
      barWidth: 5,
      itemStyle: {
        color: '#0fb300'
      },
      data: []
      // label: barLabel
    }
  ]
}