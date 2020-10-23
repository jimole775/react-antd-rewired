import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo, loadDict, loadFinalDealDate, loadUsetoStocks } from "@/store/actions";
import Layout from "@/views/layout";
import Login from "@/views/login";
class Router extends React.Component {
  render() {
    const { token, role, getUserInfo, loadDict, loadFinalDealDate, loadUsetoStocks } = this.props;
    loadDict('code_name')
    loadDict('name_code')
    loadFinalDealDate()
    loadUsetoStocks()
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            path="/"
            render={() => {
              if (!token) {
                return <Redirect to="/login" />;
              } else {
                if (role) {
                  return <Layout />;
                } else {
                  getUserInfo(token).then(() => <Layout />);
                }
              }
            }}
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default connect((state) => state.user, { getUserInfo, loadDict, loadFinalDealDate, loadUsetoStocks })(Router);
