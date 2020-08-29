import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { addTag } from '@/store/actions'
import './index.less'
// const SubMenu = Menu.SubMenu
import { KlineChart } from '@/components/KlineChart'
import { DealChart } from '@/components/DealChart'
class RightBar extends Component {
  state = {
  }
  componentWillMount() {
  }
  render() {
    return (
      <div className="sidebar-menu-container">
        {/* <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>

        </Scrollbars> */}
        <DealChart
          // data={dataSet}
          date={queryDate_string}
          stock={queryStock}
        />
        <KlineChart data={record} />

      </div>
    )
  }
}

export default connect((state) => state.user, { addTag })(withRouter(RightBar))
