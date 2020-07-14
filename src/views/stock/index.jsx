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
import { getvline } from "@/api/stocks"
import { tableList } from "@/api/table"
import TTable from "@/components/TTable"
// import EditForm from "./forms/editForm"
const { Column } = Table
const { Panel } = Collapse
const color = {
  red: '#ff5858',
  green: '#00c900',
}
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
    
    //     heavies, // 买入总额
    //     timeRange: `${rangeCans[0].t} ~ ${rangeCans[rangeCans.length - 1].t}`, // 买入总额
    //     buy_p_v: (sum_buy_p / (sum_buy_v * 100)).toFixed(2), // 买入均价
    //     sal_p_v: (sum_sal_p / (sum_sal_v * 100)).toFixed(2), // 卖出均价
    //     sum_buy_p: sum_buy_p, // 买入总额
    //     sum_buy_v: sum_buy_v, // 买入手数
    //     sum_sal_p: sum_sal_p, // 卖出总额
    //     sum_sal_v: sum_sal_v, // 卖出手数
    //     heavy_buy: heavy_buy, // 大单买入额
    //     heavy_sal: heavy_sal // 大单卖出额
    columns: [
      {
        title: () => <span style={{color:color.green}}> 主卖人 </span>,
        dataIndex: 'author',
        key: 'author',
        width: 30
      },
      {
        title: '测试2',
        dataIndex: 'date',
        key: 'date',
        width: 30
      },
      {
        title: '测试3',
        dataIndex: 'readings',
        key: 'readings',
        width: 30
      },
      {
        title: '测试3',
        dataIndex: 'star',
        key: 'star',
        width: 30
      },
      {
        title: '测试4',
        dataIndex: 'status',
        key: 'status',
        width: 30,
      },
      {
        title: '测试5',
        dataIndex: 'title',
        key: 'title',
        width: 30,
      },
      {
        title: '测试5',
        dataIndex: 'id',
        key: 'id',
        width: 30,
      },
    ],
    searchor: [
      {
        title: '标题',
        key: 'title',
        type: 'input',
        value: '',
        style: {},
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
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
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
  render() {
    return (
      <TTable
        bordered
        columns={this.state.columns}
        rowKey={(record) => record.id}
        searchor={this.state.searchor}
        fetchApi={this.state.fetchApi}
        pagination={true}
      >
        <template slot="SearchBar">
          <Form.Item label="类型：">
            <Select
              allowClear
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
        </template>
        <br />
        <template slot="Columns">
          {/* <Column title="序号" dataIndex="id" key="id" width={200} align="center" sorter={(a, b) => a.id - b.id}/>
          <Column title="时间阈值" dataIndex="timeRange" key="timeRange" width={200} align="center"/>
          <Column title="主买均价" dataIndex="buy_p_v" key="buy_p_v" width={100} align="center" render={(buy_p_v) => {
            return (
              <span style={{color: color.red}}>{11}</span>
            )
          }}/>
          <Column title="主卖均价" dataIndex="sal_p_v" key="sal_p_v" width={195} align="center" render={(sum_buy_p) => {
            return (
              <span style={{color: color.green}}>{11}</span>
            )
          }}/>
          <Column title="主买总额" dataIndex="sum_buy_p" key="sum_buy_p" width={195} align="center" render={(sum_buy_p) => {
            return (
              <span style={{color: color.red}}>{11}</span>
            )
          }}/>
          <Column title="主买手数" dataIndex="sum_buy_v" key="sum_buy_v" width={195} align="center" render={(sum_buy_p) => {
            return (
              <span style={{color: color.red}}>{11}</span>
            )
          }}/>
          <Column title="时间" dataIndex="date" key="date" width={195} align="center"/> */}
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
