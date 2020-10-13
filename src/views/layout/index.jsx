import React from "react"
import { connect } from "react-redux"
import Content from "./Content"
import Header from "./Header"
import RightPanel from "./RightPanel"
import RightBar from "./RightBar"
import Sider from "./Sider"
import TagsView from "./TagsView"
import { Layout } from "antd"
import { loadDict, loadFinalDealDate } from "@/store/actions"
const Main = (props) => {
  const { tagsView, loadDict, loadFinalDealDate } = props
  loadDict('code_name')
  loadDict('name_code')
  loadFinalDealDate()
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        {tagsView ? <TagsView /> : null}
        <Content />
        {/* <RightPanel /> */}
      </Layout>
      <RightBar />
    </Layout>
  )
}
export default connect((state) => state.settings, { loadDict, loadFinalDealDate })(Main)
