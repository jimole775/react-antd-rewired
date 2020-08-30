import React, { Component } from 'react'
// import { Menu, Icon } from 'antd'
// import { Link, withRouter } from 'react-router-dom'
// import { Scrollbars } from 'react-custom-scrollbars'
import { PropTypes } from "prop-types"
// import { connect } from 'react-redux'
// import { addTag } from '@/store/actions'
import './index.less'
// const SubMenu = Menu.SubMenu
import KlineChart from '@/components/KlineChart'
import DealChart from '@/components/DealChart'
class RightBar extends Component {
  static propTypes = {
    date: PropTypes.string,
    stock: PropTypes.string
  }

  static defaultProps = {
    date: new Date(),
    stock: '000001'
  }
  state = {
  }
  constructor (props) {
    super(props)
  }
  componentWillMount() {
  }
  componentWillReceiveProps() {
    
  }
  render() {
    return (
      <div className="right-bar">
        {/* <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>

        </Scrollbars> */}
        <DealChart
          date={this.props.date}
          stock={this.props.stock}
        />
        <KlineChart stock={this.props.stock} />
      </div>
    )
  }
}

// export default connect((state) => state.user, { addTag })(withRouter(RightBar))
export default RightBar
