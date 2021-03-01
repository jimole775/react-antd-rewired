import React, { Component } from 'react'
import {
  Input,
  Select,
  DatePicker
} from "antd"
import { getVline } from '@/api/stocks'
import TTable from '@/components/TTable'
import columns from './columns'
import StockSelect from '@/components/StockSelect'
// import EditForm from './forms/editForm'
const color = {
  red: '#ff5858',
  green: '#00c900',
}
class VlineComponent extends Component {
  state = {
    fetchApi: getVline,
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
      title: '',
      star: '',
      status:'',
    },
    columns: columns,
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
        style: {}
      },
      // {
      //   title: '类型',
      //   key: 'status',
      //   type: 'select',
      //   value: '',
      //   style: { width: 120 },
      //   dict: 'status'
      // },
      // {
      //   title: '推荐指数',
      //   key: 'star',
      //   type: 'select',
      //   value: '',
      //   style: { width: 120 },
      //   dict: ''
      // },
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
  render () {
    return (
      <TTable
        bordered
        scroll={{ x: 'calc(700px + 90%)' }}
        rowKey={(record) => record.id}
        columns={this.state.columns}
        searchor={this.state.searchor}
        fetchApi={this.state.fetchApi}
        pagination={true}
      >
        {/* <template slot="searchor">
          <Form.Item label="类型：">
            <Select
              allowClear
              labelInValue
              defaultValue={this.male}
              style={{ width: 120 }}
              onChange={(val) => this.searchmonitor('status', val)}>
              <Select.Option value="published">published</Select.Option>
              <Select.Option value="draft">draft</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="推荐指数:">
            <Select
              allowClear
              style={{ width: 120 }}
              onChange={(val) => this.searchmonitor('star', val)}>
              <Select.Option value={1}>★</Select.Option>
              <Select.Option value={2}>★★</Select.Option>
              <Select.Option value={3}>★★★</Select.Option>
            </Select>
          </Form.Item>
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
    );
  }
}

export default VlineComponent
