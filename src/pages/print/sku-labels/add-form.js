import React, { Component } from "react";
import { Form, Input, InputNumber } from "antd";

export default class AddForm extends Component {
  state = {
    sku: "",
    quantity: -1,
  };

  onQtyChange = (quantity) => {
    this.setState({ quantity });
  };

  onSKUChange = (e) => {
    this.setState({ sku: e.target.value });
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Item
            label="SKU"
            name="sku"
            labelCol={{ span: 4 }}
            rules={[
              {
                required: true,
                message: "Please input new SKU!",
              },
            ]}
          >
            <Input onChange={this.onSKUChange} />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            labelCol={{ span: 4 }}
            rules={[
              {
                required: true,
                message: "Please input new Quantity!",
              },
            ]}
          >
            <InputNumber onChange={this.onQtyChange} />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
