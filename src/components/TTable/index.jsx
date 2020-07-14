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
  Select
} from "antd"
import { tableList, deleteItem, editItem } from "@/api/table"
import { PropTypes } from "prop-types";
// import EditForm from "./forms/editForm"
// const { Column } = Table
const { Panel } = Collapse

export default class TableComponent extends Component {
  static propTypes = {
    pagination: PropTypes.bool,
    searchor: PropTypes.array,
    columns: PropTypes.array,
    fetchApi: PropTypes.func,
  }

  static defaultProps = {
    pagination: false,
    searchor: null,
    columns: null,
    fetchApi: () => {},
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
      const list = res.data.data.items
      const total = res.data.data.total
      this.setState({ list, total, loading: false })
    }
    return Promise.resolve()
  }

  componentDidMount () {
    this._isMounted = true
    this.fetchData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.setState = () => false
  }

  async componentDidUpdate (prevProps) {
    if (this.props.searchor && prevProps.searchor !== this.props.searchor) {
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
  getSlots (children = []) {
    const templates = children.filter((item) => {
      return item.type === 'template'
    })

    if (!templates || templates.length === 0) return ''

    let SearchChildren = templates.filter((item) => {
      return item.props.slot === 'SearchBar'
    })

    let TableChildren = templates.filter((item) => {
      return item.props.slot === 'Columns'
    })

    SearchChildren = SearchChildren && SearchChildren.length ? SearchChildren[0].props.children : ''
    TableChildren = TableChildren && TableChildren.length ? TableChildren[0].props.children : ''
    return { SearchChildren, TableChildren }
  }

  searchfieldsmonitor (key, val) {
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
            <Input allowClear onChange={(e) => this.searchfieldsmonitor(searchItem.key, e.currentTarget.value)} />
          </Form.Item>
        )
      }

      if (searchItem.type === 'select') {
        searchNodes.push('')
      }
    })
    return searchNodes
  }

  render() {
    const { SearchChildren, TableChildren } = this.getSlots(this.props.children)
    // todo 搜索栏vNode生成
    return (
      <div className="app-container">
        {(SearchChildren || this.props.searchor) && <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              {this.createSearchBar(this.props.searchor)}
              {SearchChildren}
              <Form.Item>
                <Button type="primary" icon="search" onClick={() => this.fetchData.call(this)}>
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>}
        <br />
        <Table
          bordered
          dataSource={this.state.list}
          loading={this.state.loading}
          rowKey={this.props.rowKey}
          columns={this.props.columns}
          pagination={false} /* 不使用table的原生分页 */
        >
          {TableChildren}
          {/* <Column title="序号" dataIndex="id" key="id" width={200} align="center" sorter={(a, b) => a.id - b.id}/>
          <Column title="标题" dataIndex="title" key="title" width={200} align="center"/>
          <Column title="作者" dataIndex="author" key="author" width={100} align="center"/>
          <Column title="阅读量" dataIndex="readings" key="readings" width={195} align="center"/>
          <Column title="推荐指数" dataIndex="star" key="star" width={195} align="center"/>
          <Column title="状态" dataIndex="status" key="status" width={195} align="center" render={(status) => {
            let color =
              status === "published" ? "green" : status === "deleted" ? "red" : "";
            return (
              <Tag color={color} key={status}>
                {status}
              </Tag>
            );
          }}/>
          <Column title="时间" dataIndex="date" key="date" width={195} align="center"/>
          <Column title="操作" key="action" width={195} align="center" render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" icon="edit" title="编辑" onClick={this.handleEdit.bind(null,row)}/>
              <Divider type="vertical" />
              <Button type="primary" shape="circle" icon="delete" title="删除" onClick={this.handleDelete.bind(null,row)}/>
            </span>
          )}/> */}
        </Table>
        <br />
        {this.props.pagination && <Pagination
          total={this.state.total}
          pageSizeOptions={["10", "20", "40"]}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={this.state.listQuery.pageNumber}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
        />}
        {/* <EditForm
          currentRowData={this.state.currentRowData}
          wrappedComponentRef={formRef => this.formRef = formRef}
          visible={this.state.editModalVisible}
          confirmLoading={this.state.editModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        />   */}
      </div>
    );
  }
}
