import React, { Component } from "react";
import { Link } from "react-router-dom";

import menuList from "../../config/menuConfig";

import { Menu } from "antd";
import {
  AppstoreOutlined,
  PrinterOutlined,
  CarOutlined,
  BorderlessTableOutlined,
} from "@ant-design/icons";

import "./index.less";

import logo from "../../assets/images/AOB.png";

const { SubMenu } = Menu;

/**
 * Left side navigation bar
 */
export default class LeftNav extends Component {
  handleClick = (e) => {
    this.props.onTitleChange(e.item.node.textContent);
  };
  render() {
    const pathname = window.location.pathname;
    return (
      <div className="left-nav">
        <header className="left-nav-header">
          <img src={logo} alt="AOB" />
          <h1>Manual Order Process App</h1>
        </header>
        <Menu
          onClick={this.handleClick}
          style={{ width: "100%" }}
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="/import-orders" icon={<AppstoreOutlined />}>
            <Link to="/import-orders">{menuList["/import-orders"]}</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<PrinterOutlined />} title="Print Labels">
            <Menu.Item key="/print-shipping-labels" icon={<CarOutlined />}>
              <Link to="/print-shipping-labels">
                {menuList["/print-shipping-labels"]}
              </Link>
            </Menu.Item>
            <Menu.Item
              key="/print-sku-labels"
              icon={<BorderlessTableOutlined />}
            >
              <Link to="/print-sku-labels">
                {menuList["/print-sku-labels"]}
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
