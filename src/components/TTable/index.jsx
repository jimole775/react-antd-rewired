import React, { Component, ReactDOM } from "react";
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
import { PropTypes } from "prop-types";
// import EditForm from "./forms/editForm"
// const { Column } = Table
const { Panel } = Collapse
const { RangePicker } = DatePicker

export default class TableComponent extends Component {
  static propTypes = {
    pagination: PropTypes.bool,
    searchor: PropTypes.array,
    columns: PropTypes.array,
    fetchApi: PropTypes.func,
    update: PropTypes.func,
    scroll: PropTypes.object,
  }

  static defaultProps = {
    pagination: false,
    searchor: null,
    columns: null,
    fetchApi: () => {},
    update: () => {},
    scroll: {}
  }

  _isMounted = false // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
    loading: false,
    total: 0,
    listQuery: {
      pageNumber: 1,
      pageSize: 10,
    },
    editModalVisible: false,
    editModalLoading: false,
  }

  async fetchData () {
    if (this._isMounted && this.state.loading === false) {
      this.setState({ loading: true })
      console.log(this.state.listQuery)
      const res = await this.props.fetchApi(this.state.listQuery)
      const list = res.data.data
      const total = res.data.total
      this.props.update(res.data)
      this.setState({ list, total, loading: false })
    }
    return Promise.resolve()
  }

  componentDidMount () {
    this._isMounted = true
    this.updateSearchor()
    this.fetchData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.setState = () => false
  }

  componentDidUpdate (prevProps) {
    if (this.props.searchor && prevProps.searchor !== this.props.searchor) {
      this.updateSearchor()
    }
  }

  updateSearchor () {
    this.props.searchor.forEach((item, index) => {
      this.setState((state) => {
        const res = {}
        if (item.value) {
          res[item.key] = item.value
        }
        return { listQuery: { ...state.listQuery, ...res } }
      })
    })
  }

  changePage = (pageNumber, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber,
        },
      }),
      () => {
        console.log('this.changePage')
        this.fetchData()
      }
    )
  }

  changePageSize = (current, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber: 1,
          pageSize,
        },
      }),
      () => {
        console.log('this.changePageSize')
        this.fetchData()
      }
    )
  }
  // handleDelete = (row) => {
  //   deleteItem({ id: row.id }).then(res => {
  //     message.success("删除成功")
  //     this.fetchData()
  //   })
  // }
  // handleEdit = (row) => {
  //   this.setState({
  //     currentRowData: Object.assign({}, row),
  //     editModalVisible: true,
  //   })
  // }
  // handleOk = _ => {
  //   const { form } = this.formRef.props;
  //   form.validateFields((err, fieldsValue) => {
  //     if (err) {
  //       return
  //     }
  //     const values = {
  //       ...fieldsValue,
  //       'star': "".padStart(fieldsValue['star'], '★'),
  //       'date': fieldsValue['date'].format('YYYY-MM-DD HH:mm:ss'),
  //     }
  //     this.setState({ editModalLoading: true, })
  //     editItem(values).then((response) => {
  //       form.resetFields()
  //       this.setState({ editModalVisible: false, editModalLoading: false })
  //       message.success("编辑成功!")
  //       this.fetchData()
  //     }).catch(e => {
  //       message.success("编辑失败,请重试!")
  //     })
  //   })
  // }
  // handleCancel = _ => {
  //   this.setState({
  //     editModalVisible: false,
  //   })
  // }
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

  searchfieldsmonitor (key, val) {
    console.log(key, val)
    this.setState((state) => {
      return { listQuery: { ...state.listQuery, [key]: val } }
    })
  }

  createSearchBar (searchor = []) {
    const searchNodes = []
    searchor.forEach((searchItem, index) => {
      if (searchItem.type === 'input') {
        searchNodes.push(
          <Form.Item label={searchItem.title} key={index}>
            <Input allowClear defaultValue={searchItem.value} onChange={(e) => this.searchfieldsmonitor(searchItem.key, e.currentTarget.value)} />
          </Form.Item>
        )
      }

      if (searchItem.type === 'select') {
        searchNodes.push('')
      }

      if (searchItem.type === 'date') {
        searchNodes.push(
          <Form.Item label={searchItem.title} key={index}>
            <DatePicker defaultValue={searchItem.value} onChange={(date, dateString) => this.searchfieldsmonitor(searchItem.key, dateString)} />
          </Form.Item>
        )
      }

      if (searchItem.type === 'dateRange') {
        searchNodes.push(
          <Form.Item label={searchItem.title} key={index} style={{width: 100}}>
            <RangePicker onChange={(date, dateString) => this.searchfieldsmonitor(searchItem.key, dateString)} />
          </Form.Item>
        )
      }
    })
    return searchNodes
  }
  searchEvent () {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        pageNumber: 1
      }
    }), () => {
      this.fetchData()
    })
  }
  render() {
    const { SearchChildren, SummaryChildren, TableChildren } = this.getSlots(this.props)
    // todo 搜索栏vNode生成
    return (
      <div className="app-container">
        {(SearchChildren || this.props.searchor) &&
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              {this.createSearchBar(this.props.searchor)}
              {SearchChildren}
              <Form.Item>
                <Button type="primary" icon="search" onClick={() => this.searchEvent.call(this)}>
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>}
        <br />
        {
          SummaryChildren
        }
        <Table
          bordered
          scroll={this.props.scroll}
          dataSource={this.state.list}
          loading={this.state.loading}
          rowKey={this.props.rowKey}
          columns={this.props.columns}
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
          current={this.state.listQuery.pageNumber}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
        />}
      </div>
    );
  }
}
