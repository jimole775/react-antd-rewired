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
    title: '时间',
    dataIndex: 't',
    key: 't',
  },
  {
    title: '价格',
    dataIndex: 'p',
    key: 'p',
    render: (text, record) => {
      return <span style={{color: record.bs === 2 ? color.red : record.bs === 1 ? color.green : ''}}>{text} 元</span>
    }
  },
  {
    title: '手数',
    dataIndex: 'v',
    key: 'v'
  },
  {
    title: '总额',
    render: (text, record) => {
      return <span style={{color: record.bs === 2 ? color.red : record.bs === 1 ? color.green : ''}}>{boundMoneySize(record.p * record.v * 100)}</span>
    }
  },
]
