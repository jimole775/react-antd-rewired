import React, { Component } from 'react'
import { getUline } from '@/api/stocks'
import TTable from '@/components/TTable'
import KlineChart from '@/components/KlineChart'
import moment from 'moment'
// import EditForm from './forms/editForm'
function boundMoneySize (val) {
  return `${Math.round(val/10000)} 万元`
}
class UlineComponent extends Component {
  state = {
    record: {},
    dataSet: {},
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
    },
    searchor: [
      {
        title: '代码',
        key: 'code',
        type: 'input',
        value: '000001',
        style: {},
      },
      {
        title: '日期',
        key: 'date',
        type: 'date',
        value: moment(new Date()),
        style: {},
      }
    ],
    editModalVisible: false,
    editModalLoading: false,
  }
  searchmonitor (key, val) {
    console.log(key, val)
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
    console.log(newData)
    this.setState({ dataSet: newData })
  }
  tableChange = (record) => {
    this.setState({ record })
  }
  render () {
    return (
      <>
        <KlineChart test="test111" data={this.state.record}></KlineChart>
        <TTable
          bordered
          rowKey={(record) => record.id}
          fetchApi={getUline}
          searchor={this.state.searchor}
          update={this.tableUpdate}
          pagination={true}
        >
          {/* <template slot="summary">
            <div>
              <span>大单买入：{boundMoneySize(this.state.dataSet.bigDealIn)}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>大单卖出：{boundMoneySize(this.state.dataSet.bigDealOut)}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>小单买入：{boundMoneySize(this.state.dataSet.tinyDealIn)}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>小单卖出：{boundMoneySize(this.state.dataSet.tinyDealOut)}</span>
            </div>
          </template> */}
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

export default UlineComponent
