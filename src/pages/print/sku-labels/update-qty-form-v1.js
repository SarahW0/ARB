import React, { Component } from "react";
import { Row, Col } from "antd";

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

  onQtyChange = (e) => {
    this.setState({ quantity: e.target.value });
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
        <form>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={8}>
              <label>SKU</label>
            </Col>
            <Col span={16}>
              <input
                type="text"
                value={this.state.sku}
                disabled
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <label>Quantity</label>
            </Col>
            <Col span={16}>
              <input
                type="number"
                value={this.state.quantity}
                onChange={this.onQtyChange}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
