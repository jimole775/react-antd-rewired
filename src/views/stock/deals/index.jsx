import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDeals } from '@/api/stocks'
import TTable from '@/components/TTable'
import columns from './columns'
import moment from 'moment'
import DealChart from '@/components/DealChart'
import {
  Input,
  Select,
  DatePicker
} from "antd"
const color = {
  red: '#ff5858',
  green: '#00c900',
}
function boundMoneySize (val) {
  return `${Math.round(val/10000)} 万元`
}
class DealsComponent extends Component {
  state = {
    fetchApi: getDeals,
    dataSet: {},
    modalShow: false,
    TTableState: {},
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
    },
    columns,
    searchor: [
      {
        title: '股票',
        key: 'stock',
        default: null,
        component: Input,
        style: {},
        required: true,
      },
      {
        title: '日期',
        key: 'date',
        component: DatePicker,
        default: null,
        style: {},
        required: true,
      },
      {
        title: '额度（万）',
        key: 'gradient',
        component: Input,
        default: '',
        style: {},
        required: true,
      }
    ],
    editModalVisible: false,
    editModalLoading: false,
  }
  constructor (props) {
    super(props)
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
  tableUpdate = (newData, state) => {
    this.setState({ dataSet: newData, modalShow: true, TTableState: state })
  }
  render () {
    const { columns, searchor, fetchApi, dataSet, TTableState: { listQuery = {} }, modalShow } = this.state
    const { date: queryDate, stock: queryStock } = listQuery
    const queryDate_string = queryDate ? moment(queryDate).format('YYYY-MM-DD') : ''
    // console.log('rerender:', queryDate, queryStock)
    return (
      <>
        <TTable
          bordered
          rowKey={(record) => record.id}
          columns={columns}
          searchor={searchor}
          fetchApi={fetchApi}
          update={this.tableUpdate}
          pagination={true}
        >
          <template slot="summary">
            <div>
              <span>大单买入：{boundMoneySize(dataSet.bigDealIn)}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>大单卖出：{boundMoneySize(dataSet.bigDealOut)}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>小单买入：{boundMoneySize(dataSet.tinyDealIn)}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>小单卖出：{boundMoneySize(dataSet.tinyDealOut)}</span>
            </div>
          </template>
          {/* <EditForm
            currentRowData={currentRowData}
            wrappedComponentRef={formRef => this.formRef = formRef}
            visible={editModalVisible}
            confirmLoading={editModalLoading}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
          />   */}
        </TTable>
        {/* <Modal
          visible={modalShow}
          footer={null}
          onCancel={
            () => this.setState({modalShow: false})
          }
        >
          <DealChart
            // data={dataSet}
            date={queryDate_string}
            stock={queryStock}
          />
        </Modal> */}
      </>
    );
  }
}

export default connect(state => state.stocks)(DealsComponent)
