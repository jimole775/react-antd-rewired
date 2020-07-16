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
import { getvline } from '@/api/stocks'
import TTable from '@/components/TTable'
import { moneyFormat } from '@/utils'
// import EditForm from './forms/editForm'
const { Column } = Table
const { Panel } = Collapse
const color = {
  red: '#ff5858',
  green: '#00c900',
}
class TableComponent extends Component {
  _isMounted = false // 这个变量是用来标志当前组件是否挂载
  state = {
    fetchApi: getvline,
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
      title: '',
      star: '',
      status:'',
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
        title: '股票',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        fixed: true
      },
      {
        title: '日期',
        dataIndex: 'date',
        width: 120,
        key: 'date'
      },
      {
        title: '开始时间',
        width: 100,
        dataIndex: 'vstart',
        key: 'vstart'
      },
      {
        title: '结束时间',
        width: 100,
        dataIndex: 'vend',
        key: 'vend'
      },
      {
        title: '下潜深度',
        dataIndex: 'deep_size',
        key: 'deep_size',
        render: (text) => <span> {(text * 100).toFixed(2)}%</span>
      },
      {
        title: '开盘价',
        dataIndex: 'open_p',
        key: 'open_p',
        render: (text) => <span> {(text / 1000).toFixed(2)} 元</span>
      },
      {
        title: '收盘价',
        dataIndex: 'close_p',
        key: 'close_p',
        render: (text) => <span> {(text / 1000).toFixed(2)} 元</span>
      },
      {
        title: '顶部价',
        dataIndex: 'high_p',
        key: 'high_p',
        render: (text) => <span> {(text / 1000).toFixed(2)} 元</span>
      },
      {
        title: '底部价',
        dataIndex: 'deep_p',
        key: 'deep_p',
        render: (text) => <span> {(text / 1000).toFixed(2)} 元</span>
      },
      {
        title: () => <span style={{color:color.red}}> 主买均价 </span>,
        dataIndex: 'buy_p_v',
        key: 'buy_p_v',
        render: (text) => <span style={{color:color.red}}> {text} 元 </span>,
      },
      {
        title: () => <span style={{color:color.green}}> 主卖均价 </span>,
        dataIndex: 'sal_p_v',
        key: 'sal_p_v',
        render: (text) => <span style={{color:color.green}}> {text} 元</span>,
      },
      {
        title: () => <span style={{color:color.red}}> 主买总额 </span>,
        dataIndex: 'sum_buy_p',
        key: 'sum_buy_p',
        render: (text) => <span style={{color:color.red}}> {this.boundMoneySize(text)} </span>,
      },
      {
        title: () => <span style={{color:color.green}}> 主卖总额 </span>,
        dataIndex: 'sum_sal_p',
        key: 'sum_sal_p',
        render: (text) => <span style={{color:color.green}}> {this.boundMoneySize(text)} </span>,
      },
      {
        title: () => <span style={{color:color.red}}> 大单主买额 </span>,
        dataIndex: 'heavy_buy',
        key: 'heavy_buy',
        render: (text) => <span style={{color:color.red}}> {this.boundMoneySize(text)} </span>,
      },
      {
        title: () => <span style={{color:color.green}}> 大单主卖额 </span>,
        dataIndex: 'heavy_sal',
        key: 'heavy_sal',
        render: (text) => <span style={{color:color.green}}> {this.boundMoneySize(text)} </span>,
      },
      {
        title: () => <span style={{color:color.red}}> 小单跟买 </span>,
        render: (text, record) => <span style={{color:color.red}}> {this.boundMoneySize(record.sum_buy_p - record.heavy_buy)} </span>,
      },
      {
        title: () => <span style={{color:color.green}}> 小单跟卖 </span>,
        render: (text, record) => <span style={{color:color.green}}> {this.boundMoneySize(record.sum_sal_p - record.heavy_sal)} </span>,
      },
    ],
    searchor: [
      {
        title: '股票',
        key: 'name',
        type: 'input',
        value: '',
        style: {},
      },
      {
        title: '日期',
        key: 'date',
        type: 'date',
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
  componentDidMount () {
    this._isMounted = true
  }
  componentWillUnmount () {
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
  boundMoneySize (val) {
    return `${Math.round(val/10000)} 万元`
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
        {/* <template slot="SearchBar">
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
};

export default TableComponent;
