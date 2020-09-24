import React, { Component } from "react";
import { formatDate } from "../../utils/dateUtils";
import "./index.less";
/**
 * Header Module
 */
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: formatDate(Date.now()),
    };
  }

  getTime = () => {
    setInterval(() => {
      const currentTime = formatDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };

  componentDidMount() {
    this.getTime();
  }

  render() {
    return (
      <div className="header">
        <div className="header-left">{this.props.title}</div>
        <div className="header-right">{this.state.currentTime}</div>
      </div>
    );
  }
}
