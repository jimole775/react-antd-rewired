import React, { Component } from "react"
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
} from "antd"
import { tableList, deleteItem, editItem } from "@/api/table"
import TTable from "@/components/TTable"
// import EditForm from "./forms/editForm"
const { Column } = Table
const { Panel } = Collapse
class TableComponent extends Component {
  _isMounted = false // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
    loading: false,
    total: 0,
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
      title: "",
      star: "",
      status:""
    },
    searchor: [
      {
        title: '标题',
        key: 'title',
        type: 'input',
        value: '',
        style: {},
      },
      {
        title: '类型',
        key: 'status',
        type: 'select',
        value: '',
        style: { width: 120 },
        dict: 'status'
      },
      {
        title: '推荐指数',
        key: 'star',
        type: 'select',
        value: '',
        style: { width: 120 },
        dict: ''
      },
    ],
    editModalVisible: false,
    editModalLoading: false,
  }
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  searchmonitor (key, val) {
    debugger
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
  render() {
    return (
      <TTable
        bordered
        rowKey={(record) => record.id}
        searchor={this.state.searchor}
        pagination={true}
      >
        <template slot="SearchBar">
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
        </template>
        <br />
        <template slot="Columns">
          <Column title="序号" dataIndex="id" key="id" width={200} align="center" sorter={(a, b) => a.id - b.id}/>
          <Column title="标题" dataIndex="title" key="title" width={200} align="center"/>
          <Column title="作者" dataIndex="author" key="author" width={100} align="center"/>
          <Column title="阅读量" dataIndex="readings" key="readings" width={195} align="center"/>
          <Column title="推荐指数" dataIndex="star" key="star" width={195} align="center"/>
          <Column title="状态" dataIndex="status" key="status" width={195} align="center" render={(status) => {
            let color = status === "published" ? "green" : status === "deleted" ? "red" : ""
            return (
              <Tag color={color} key={status}>
                {status}
              </Tag>
            )
          }}/>
          <Column title="时间" dataIndex="date" key="date" width={195} align="center"/>
          {/* <Column title="操作" key="action" width={195} align="center"render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" icon="edit" title="编辑" onClick={this.handleEdit.bind(null,row)}/>
              <Divider type="vertical" />
              <Button type="primary" shape="circle" icon="delete" title="删除" onClick={this.handleDelete.bind(null,row)}/>
            </span>
          )}/> */}
        </template>
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
};

export default TableComponent;
