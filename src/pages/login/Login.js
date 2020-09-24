import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./login.less";
import logo from "../../assets/images/AOB.png";

import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";

/*
 * Log in page
 */
export default class Login extends Component {
  //formRef = React.createRef();

  onFinish = async (value) => {
    const response = await reqLogin(value.username, value.password);
    console.log(response);
    //login succeed
    if (response.status === "0") {
      //system logged in successfully
      memoryUtils.isSystemLogin = true;

      this.props.history.replace("/admin");
    } else {
      //login failed
      message.error("Login failed: wrong username or password");
    }
  };

  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="AOB" />
          <h1>AOB Manual Order Process System</h1>
        </header>
        <section className="login-content">
          <h2>System Login</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                  min: 4,
                  message: "username has at least 4 letters!",
                },
                {
                  max: 12,
                  message: "username has at most 12 letters!",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message:
                    "username contains only letters, digits and underscore!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
