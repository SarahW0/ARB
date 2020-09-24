import React, { Component } from "react";
import { Form, Row, Col, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { DatePicker } from "antd";

import "./index.less";

export default class SearchCard extends Component {
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  render() {
    const config = {
      rules: [
        {
          type: "object",
          message: "Please select FROM date!",
        },
      ],
    };
    return (
      <Form
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={this.onFinish}
      >
        <Row>
          <Col span={8}>
            <Form.Item name="search-by-number" label="Invoice Number">
              <Input placeholder="Invoice Number" />
            </Form.Item>
          </Col>
          <Col
            span={10}
            style={{
              paddingLeft: "30px",
            }}
          >
            <Form.Item name="date-picker" label="Date From" {...config}>
              <DatePicker style={{ width: "80%" }} />
            </Form.Item>
          </Col>
          <Col
            span={6}
            style={{
              textAlign: "right",
            }}
          >
            <Button type="primary" htmlType="submit">
              <SearchOutlined style={{ fontSize: "1.5em" }} />
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
