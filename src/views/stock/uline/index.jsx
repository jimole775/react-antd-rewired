import React, { Component } from 'react'
import { getUline } from '@/api/stocks'
import TTable from '@/components/TTable'
import {
  Input,
  Select,
  DatePicker
} from "antd"
import KlineChart from '@/components/KlineChart'
import moment from 'moment'
// import EditForm from './forms/editForm'
import StockSelect from '@/components/StockSelect'
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
    columns: [
      {
        title: '代码',
        dataIndex: 'code',
        width: 120,
        key: 'code'
      },
      {
        title: '股票',
        dataIndex: 'name',
        key: 'name',
        width: 100
      },
      {
        title: '时间范围',
        dataIndex: 'dateRange',
        key: 'dateRange',
        render: (text, record) => {
          const str = record.klines.map((kline) => {return kline.split(',')[0]})
          return <span>{`${str[0]} ~ ${str[str.length - 1]}`}</span>
        }
      }
      // {
      //   title: '图形',
      //   dataIndex: 'chart',
      //   key: 'chart',
      //   width: 600,
      //   render: (text, record) => {
      //     return <KlineChart data={record} />
      //   }
      // }
    ],
    searchor: [
      {
        title: '股票',
        key: 'stock',
        default: null,
        component: StockSelect,
        style: {},
        required: true,
      },
      {
        title: '日期',
        key: 'date',
        component: DatePicker,
        default: '',
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
    // this.setState({ record: newData })
  }
  render () {
    return (
      <>
        <TTable
          bordered
          rowKey={(record) => record.id}
          fetchApi={getUline}
          columns={this.state.columns}
          searchor={this.state.searchor}
          update={this.tableUpdate}
          pagination={true}
          onRow={
            record => {
              return {
                onClick: () => this.setState({ record })
              }
            }
          }
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
