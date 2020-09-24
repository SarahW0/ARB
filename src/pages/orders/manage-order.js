import React, { Component } from "react";
import { Card, Button, Table } from "antd";

import SearchCard from "../../components/search-card";

import { dataSource } from "./data-source";

export default class ManageOrders extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    invoices: [],
  };

  //
  onAddToPrint = () => {};

  onDelete = () => {};

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  //initialize table columns
  initColumns = () => {
    this.columns = [
      {
        title: "Invoice Number",
        dataIndex: "InvoiceNumber",
        key: "InvoiceNumber",
      },
      {
        title: "Company Name",
        dataIndex: "CompanyName",
        key: "CompanyName",
      },
      {
        title: "Date",
        dataIndex: "DateString",
        key: "DateString",
        render: (DateString) => DateString.substring(0, 10),
      },
    ];
  };

  //get Invoices
  getInvoices = () => {
    let invoices = [];
    for (let i = 0; i < dataSource.length; i++) {
      let invoice = {};
      invoice.key = dataSource[i]["InvoiceNumber"];
      invoice["InvoiceNumber"] = dataSource[i]["InvoiceNumber"];
      invoice["DateString"] = dataSource[i]["DateString"];
      invoice["CompanyName"] = dataSource[i]["Contact"]["Name"];
      invoice["LineItems"] = dataSource[i]["LineItems"];
      invoices.push(invoice);
    }
    this.setState({ invoices });
    console.log(this.state);
  };

  //prepare data for render at first time: initialize columns
  componentWillMount() {
    this.initColumns();
  }

  //get data
  componentDidMount() {
    this.getInvoices();
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const extra = (
      <span style={{ fontSize: "1.5em" }}>
        <Button
          type="primary"
          disabled={!hasSelected}
          loading={loading}
          onClick={this.onAddToPrint}
        >
          Add to Print
        </Button>

        <Button
          type="primary"
          disabled={!hasSelected}
          loading={loading}
          onClick={this.onDelete}
          style={{ marginLeft: "20px" }}
        >
          Delete
        </Button>
      </span>
    );

    return (
      <div>
        <SearchCard />
        <Card title="Order List" extra={extra}>
          <Table
            rowSelection={rowSelection}
            dataSource={this.state.invoices}
            columns={this.columns}
            bordered
          />
        </Card>
      </div>
    );
  }
}
