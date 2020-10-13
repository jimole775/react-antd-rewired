import React, { Component, ReactDOM } from 'react'
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
  Select,
  DatePicker
} from "antd"
import { PropTypes } from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { compare } from '@/utils'
import UsetoStocks from '@/components/UsetoStocks'
// import EditForm from "./forms/editForm"
// const { Column } = Table
const { Panel } = Collapse
const { RangePicker } = DatePicker

class TableComponent extends Component {
  static propTypes = {
    pagination: PropTypes.bool,
    searchor: PropTypes.array,
    columns: PropTypes.array,
    fetchApi: PropTypes.func,
    update: PropTypes.func,
    scroll: PropTypes.object,
    onRow: PropTypes.func
  }

  static defaultProps = {
    pagination: false,
    searchor: null,
    columns: null,
    scroll: {},
    fetchApi: () => {},
    update: () => {},
    onRow: () => {},
  }
  _paramsStage = {} // 暂存当前查询的条件，如果参数相同，就不重复执行【查询】事件，除非使用【reload】方法
  _isMounted = false // 这个变量是用来标志当前组件是否挂载
  // searchNodes = []
  state = {
    params: {
      pageNumber: 1,
      pageSize: 10,
    },
    list: [],
    total: 0,
    loading: false,
  }

  storageFetchParams (params) {
    this._paramsStage = JSON.parse(JSON.stringify(params))
  }

  // 正常http请求
  async fetching () {
    const params = this.formatParams(this.state.params)
    const _paramsStage = this.formatParams(this._paramsStage)
    if (this._isMounted && this.state.loading === false && !compare(params, _paramsStage)) {
      this.setState({ loading: true })
      const res = await this.props.fetchApi(params)
      const list = res.data.list || []
      const total = res.data.total || 0
      this.props.update(res.data, this.state)
      this.setState({ list, total, loading: false })
      this.storageFetchParams(params)
    }
    return Promise.resolve()
  }

  // 查询请求，查询时，确保返回的肯定是第一页
  async searching () {
    this.setState((state) => ({
      params: {
        ...state.params,
        pageNumber: 1
      }
    }),
    () => this.fetching())
  }

  // 重载数据，这个方法的调用时，是已经可以确定场景的
  // 所以，方法内不用做任何限制，直接拉取数据即可
  async reload () {
    this.setState({ loading: true })
    const res = await this.props.fetchApi(this.formatParams(this.state.params))
    const list = res.data.list || []
    const total = res.data.total || 0
    this.props.update(res.data, this.state)
    this.setState({ list, total, loading: false })
    return Promise.resolve()
  }

  // 主要处理moment对象
  formatParams (params) {
    const res = {}
    Object.keys(params).forEach((key) => {
      let val = params[key]
      if (val instanceof moment) {
        val = moment(val).format('YYYY-MM-DD')
      }
      res[key] = val
    })
    return res
  }

  componentWillMount() {
    // this.searchNodes = this.createSearchBar()
    this.bindDefaultParams()
  }

  componentDidMount () {
    this._isMounted = true
    this.fetching()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.setState = () => false
  }

  componentWillReceiveProps () {
    // this.searchNodes = this.createSearchBar()
  }

  bindDefaultParams () {
    const updatepropty = {}
    this.props.searchor.forEach((searchItem, index) => {
      if (searchItem.key === 'date') {
        if (!searchItem.default && this.props.finalDealDate) {
          searchItem.default = moment(this.props.finalDealDate)
        }
      }
      if (searchItem.key === 'stock') {
        if (!searchItem.default && this.props.usetoStocks) {
          searchItem.default = this.props.usetoStocks[0]
        }
      }
      if (searchItem.default) {
        updatepropty[searchItem.key] = searchItem.default
      }
    })
    this.setState((state) => ({
      params: {
        ...state.params,
        ...updatepropty
      }
    }))
  }

  changePage = (pageNumber, pageSize) => {
    this.setState((state) => ({
      params: {
        ...state.params,
        pageNumber
      }
    }),
    () => this.fetching())
  }

  changePageSize = (current, pageSize) => {
    this.setState((state) => ({
      params: {
        ...state.params,
        pageSize
      }
    }),
    () => this.fetching())
  }

  getSlots ({ children = [] }) {
    let templates = []
    let SearchChildren = ''
    let SummaryChildren = ''
    let TableChildren = ''
    if (children instanceof Array) {
      templates = children.filter((item) => {
        return item.type === 'template'
      })
    } else {
      templates = [children]
    }

    if (!templates || templates.length === 0) return ''
    SearchChildren = templates.filter((item) => {
      return item.props && item.props.slot === 'searchor'
    })

    SummaryChildren = templates.filter((item) => {
      return item.props && item.props.slot === 'summary'
    })

    TableChildren = templates.filter((item) => {
      return item.props && item.props.slot === 'columns'
    })

    SearchChildren = SearchChildren && SearchChildren.length ? SearchChildren[0].props.children : ''
    SummaryChildren = SummaryChildren && SummaryChildren.length ? SummaryChildren[0].props.children : ''
    TableChildren = TableChildren && TableChildren.length ? TableChildren[0].props.children : ''
    return { SearchChildren, SummaryChildren, TableChildren }
  }

  /**
   * @bEvent 是预留参数
   */
  updateParams (key, aEvent, bEvent) {
    let val = ''
    debugger
    if (typeof aEvent === 'number') {
      val = aEvent
    }

    if (typeof aEvent === 'string') {
      val = aEvent
    }

    // date类型的事件
    if (aEvent instanceof moment) {
      val = moment(aEvent).format('YYYY-MM-DD')
    }

    // input类型的事件
    if (aEvent.currentTarget) {
      val = aEvent.currentTarget.value
    }

    if (this.state.params[key] !== val) {
      this.setState((state) => ({
        params: {
          ...state.params,
          [key]: val
        }
      }))
    }
  }

  createSearchBar () {
    const searchNodes = []
    const searchor = this.props.searchor || []
    searchor.forEach((searchItem, index) => {
      searchNodes.push(
        <Form.Item label={searchItem.title} key={index}>
          <searchItem.component
            allowClear defaultValue={searchItem.default}
            onChange={(a, b) => this.updateParams(searchItem.key, a, b)}
            onPressEnter={() => this.searching.call(this)}
            onBlur={() => this.searching.call(this)}
          />
        </Form.Item>
      )
    })
    return searchNodes
  }

  render() {
    const { SearchChildren, SummaryChildren, TableChildren } = this.getSlots(this.props)
    // todo 搜索栏vNode生成
    return (
      <div className="app-container">
        <Form layout="inline">
          {this.createSearchBar()}
          {SearchChildren}
        </Form>
        <UsetoStocks onClick={
          (stock) => {
            this.updateParams.call(this, 'stock', stock)
            this.searching.call(this)
          }
        } />
        <br />
        {SummaryChildren}
        <Table
          bordered
          scroll={this.props.scroll}
          dataSource={this.state.list}
          loading={this.state.loading}
          rowKey={this.props.rowKey}
          columns={this.props.columns}
          onRow={this.props.onRow}
          pagination={false} /* 不使用table的原生分页 */
        >
          {TableChildren}
        </Table>
        <br />
        {this.props.pagination &&
        <Pagination
          total={this.state.total}
          pageSizeOptions={["10", "20", "40"]}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={this.state.params.pageNumber}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
        />}
      </div>
    )
  }
}

export default connect(state => {
  return state.stocks
})(TableComponent)
