import React, { Component } from 'react'
import {
  Table,
  Tag,
  Form,
  Button,
  Input,
  Collapse,
  Pagination,
  Divider,
  message,
  Select
} from 'antd'
import { getDeals } from '@/api/stocks'
import TTable from '@/components/TTable'
import columns from './columns'
import moment from 'moment'
// import EditForm from './forms/editForm'
const color = {
  red: '#ff5858',
  green: '#00c900',
}
class DealsComponent extends Component {
  state = {
    fetchApi: getDeals,
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
        value: '000001',
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
      },
      {
        title: '额度',
        key: 'gradient',
        type: 'input',
        value: '',
        style: {},
        required: true,
      },
      {
        title: '类型',
        key: 'type',
        type: 'input',
        value: '',
        style: {},
        required: true,
      },
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
  tableUpdate (newData) {
    console.log(newData)
  }
  render () {
    return (
      <div>12312313
        <TTable
          bordered
          rowKey={(record) => record.id}
          columns={this.state.columns}
          searchor={this.state.searchor}
          fetchApi={this.state.fetchApi}
          update={this.tableUpdate}
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
      </div>
    );
  }
}

export default DealsComponent
