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
  },
  {
    title: '代码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '1日均线',
    dataIndex: 'avg01',
    key: 'avg01',
  },
  {
    title: '5日均线',
    dataIndex: 'avg05',
    key: 'avg05',
  },
  {
    title: '10日均线',
    dataIndex: 'avg10',
    key: 'avg10',
  },
  {
    title: '20日均线',
    dataIndex: 'avg20',
    key: 'avg20',
  },
  {
    title: '30日均线',
    dataIndex: 'avg30',
    key: 'avg30',
  },
  {
    title: '60日均线',
    dataIndex: 'avg60',
    key: 'avg60',
  }
]
