import React, { Component } from "react";

import { Layout } from "antd";

import memoryUtils from "../../utils/memoryUtils";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LeftNav from "../../components/left-nav";
import Header from "../../components/header";

import menuList from "../../config/menuConfig";

import ManageOrders from "../orders/manage-order";
import PrintShippingLabels from "../print/shipping-labels/print-shipping-label";
import PrintSkuLabels from "../print/sku-labels/print-sku-label";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      orders: [],
      title: "",
    };
  }

  onTitleChange = (title) => {
    this.setState({ title });
  };

  render() {
    if (!this.state.title) {
      const pathname = window.location.pathname;
      this.setState({ title: menuList[pathname] });
    }

    if (memoryUtils.isSystemLogin) {
      const { Footer, Sider, Content } = Layout;
      return (
        <Layout style={{ height: "100%" }}>
          <Sider width={"20vw"}>
            <LeftNav onTitleChange={this.onTitleChange} />
          </Sider>
          <Layout>
            <Header title={this.state.title} />
            <Content style={{ backgroundColor: "white", margin: "20px" }}>
              <Switch>
                <Route path="/import-orders" component={ManageOrders}></Route>
                <Route
                  path="/print-shipping-labels"
                  component={PrintShippingLabels}
                ></Route>
                <Route
                  path="/print-sku-labels"
                  component={PrintSkuLabels}
                ></Route>
                <Redirect to="/import-orders" />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              "@copyright Sarah JH Wang 2020 ~"
            </Footer>
          </Layout>
        </Layout>
      );
    } else {
      //redirect to another route in render function
      return <Redirect to="/login" />;
    }
  }
}
