import React, { Component } from 'react'
const color = {
  red: '#ff5858',
  green: '#00c900',
}
function boundMoneySize (val) {
  return `${Math.round(val/10000)} 万元`
}
export default [
  {
    title: '股票',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: true
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: 120,
    key: 'date'
  },
  {
    title: '开始时间',
    width: 100,
    dataIndex: 'vstart',
    key: 'vstart'
  },
  {
    title: '结束时间',
    width: 100,
    dataIndex: 'vend',
    key: 'vend'
  },
  {
    title: '下潜深度',
    dataIndex: 'deep_size',
    key: 'deep_size',
    render: (text) => <span> {(text * 100).toFixed(2)}%</span>
  },
  {
    title: '开盘价',
    dataIndex: 'open_p',
    key: 'open_p',
    render: (text) => <span> {(text / 1000).toFixed(2)} 元</span>
  },
  {
    title: '收盘价',
    dataIndex: 'close_p',
    key: 'close_p',
    render: (text) => <span> {(text / 1000).toFixed(2)} 元</span>
  },
  {
    title: '顶部价',
    dataIndex: 'high_p',
    key: 'high_p',
    render: (text) => <span> {(text / 1000).toFixed(2)} 元</span>
  },
  {
    title: '底部价',
    dataIndex: 'deep_p',
    key: 'deep_p',
    render: (text) => <span> {(text / 1000).toFixed(2)} 元</span>
  },
  {
    title: () => <span style={{color:color.red}}> 主买均价 </span>,
    dataIndex: 'buy_p_v',
    key: 'buy_p_v',
    render: (text) => <span style={{color:color.red}}> {text} 元 </span>,
  },
  {
    title: () => <span style={{color:color.green}}> 主卖均价 </span>,
    dataIndex: 'sal_p_v',
    key: 'sal_p_v',
    render: (text) => <span style={{color:color.green}}> {text} 元</span>,
  },
  {
    title: () => <span style={{color:color.red}}> 主买总额 </span>,
    dataIndex: 'sum_buy_p',
    key: 'sum_buy_p',
    render: (text) => <span style={{color:color.red}}> {boundMoneySize(text)} </span>,
  },
  {
    title: () => <span style={{color:color.green}}> 主卖总额 </span>,
    dataIndex: 'sum_sal_p',
    key: 'sum_sal_p',
    render: (text) => <span style={{color:color.green}}> {boundMoneySize(text)} </span>,
  },
  {
    title: () => <span style={{color:color.red}}> 大单主买额 </span>,
    dataIndex: 'heavy_buy',
    key: 'heavy_buy',
    render: (text) => <span style={{color:color.red}}> {boundMoneySize(text)} </span>,
  },
  {
    title: () => <span style={{color:color.green}}> 大单主卖额 </span>,
    dataIndex: 'heavy_sal',
    key: 'heavy_sal',
    render: (text) => <span style={{color:color.green}}> {boundMoneySize(text)} </span>,
  },
  {
    title: () => <span style={{color:color.red}}> 小单跟买 </span>,
    render: (text, record) => <span style={{color:color.red}}> {boundMoneySize(record.sum_buy_p - record.heavy_buy)} </span>,
  },
  {
    title: () => <span style={{color:color.green}}> 小单跟卖 </span>,
    render: (text, record) => <span style={{color:color.green}}> {boundMoneySize(record.sum_sal_p - record.heavy_sal)} </span>,
  },
]
