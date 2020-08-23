import React, { Component } from 'react'
import { getLowerpoint } from '@/api/stocks'
import TTable from '@/components/TTable'
import columns from './columns'
import moment from 'moment'
// import EditForm from './forms/editForm'
const color = {
  red: '#ff5858',
  green: '#00c900',
}
function boundMoneySize (val) {
  return `${Math.round(val/10000)} 万元`
}
class DealsComponent extends Component {
  state = {
    fetchApi: getLowerpoint,
    dataSet: {},
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
    },
    columns: columns,
    searchor: [
      {
        title: '代码',
        key: 'code',
        type: 'input',
        value: '',
        style: {},
        required: true,
      },
      {
        title: '股票',
        key: 'name',
        type: 'input',
        value: '',
        style: {},
        required: true,
      },
      {
        title: '日期',
        key: 'date',
        type: 'date',
        value: moment(new Date()),
        style: {},
        required: true,
      }
    ]
  }
  searchmonitor (key, val) {
    const searchs = [...this.state.searchor]
    searchs.forEach((item, index) => {
      if (item.key === key) {
        item.value = val
      }
    })
    this.setState({
      searchor: searchs
    })
  }
  tableUpdate = (newData) => {
    this.setState({ dataSet: newData })
  }
  render () {
    return (
      <>
        <TTable
          bordered
          rowKey={(record) => record.id}
          columns={this.state.columns}
          searchor={this.state.searchor}
          fetchApi={this.state.fetchApi}
          update={this.tableUpdate}
          pagination={true}
        >
          {/*<template slot="summary">
            <div>
              <span>大单买入：{boundMoneySize(this.state.dataSet.bigDealIn)}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>大单卖出：{boundMoneySize(this.state.dataSet.bigDealOut)}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>小单买入：{boundMoneySize(this.state.dataSet.tinyDealIn)}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>小单卖出：{boundMoneySize(this.state.dataSet.tinyDealOut)}</span>
            </div>
          </template>*/}
          {/* <EditForm
            currentRowData={this.state.currentRowData}
            wrappedComponentRef={formRef => this.formRef = formRef}
            visible={this.state.editModalVisible}
            confirmLoading={this.state.editModalLoading}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
          />   */}
        </TTable>
      </>
    );
  }
}

export default DealsComponent
