import React, { Component } from "react";
import { Form, Input, InputNumber } from "antd";

export default class UpdateQtyForm extends Component {
  state = {
    quantity: this.props.quantity,
    sku: this.props.sku,
  };
  /*
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.sku !== this.props.sku) {
      //Forcibly overwrite input value to new default if the default ever changes
      this.setState({sku: nextProps.sku,
        quantity, nextProps.quantity});
    }
  };
*/

  onQtyChange = (quantity) => {
    this.setState({ quantity });
  };

  componentDidUpdate = (prevProps) => {
    console.log("prevPros: " + prevProps.sku + " : " + prevProps.quantity);
    console.log("currentPros: " + this.props.sku + " : " + this.props.quantity);

    if (prevProps && prevProps.sku !== this.props.sku) {
      this.setState({ sku: this.props.sku, quantity: this.props.quantity });
      console.log("force update");
      this.forceUpdate();
    }
  };

  render() {
    return (
      <div>
        <Form ref="form">
          <Form.Item label="SKU" name="sku" labelCol={{ span: 4 }}>
            <Input value={this.state.sku} disabled />
          </Form.Item>
          <Form.Item label="Quantity" name="quantity" labelCol={{ span: 4 }}>
            <InputNumber
              value={this.state.quantity}
              onChange={this.onQtyChange}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
