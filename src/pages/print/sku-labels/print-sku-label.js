import React, { Component } from "react";
import { Card, Button, Table, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { dataSource } from "./data-source";
import {
  addALabel,
  removeALabel,
  addLabels,
  getLabelsByQty,
  updateALabel,
} from "../../../utils/labelUtils";

import AddForm from "./add-form";
import PrintForm from "./print-form";
import UploadForm from "./upload-form";
import UpdateQtyForm from "./update-qty-form-v1";

export default class PrintSkuLabels extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    visibleAddSKUModal: false,
    visiblePrintModal: false,
    visibleUploadModal: false,
    visibleUpdateQtyModal: false,
    skus: dataSource,
    selectedSKUs: [],
  };

  updatedSKU = "";
  updatedQYT = -1;

  columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",

      sorter: {
        compare: (a, b) => a.sku > b.sku,
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",

      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
      },
    },

    {
      title: "Action",
      key: "action",
      width: 300,
      render: (text, record) => {
        return (
          <Button onClick={() => this.onUpdateQTY(record.sku, record.quantity)}>
            Update
          </Button>
        );
      },
    },
  ];

  myAddFormRef = React.createRef();
  myUploadFileRef = React.createRef();
  myUpdateQTYRef = React.createRef();

  //remove labels from label list
  removeSeletedSKUs = () => {
    const selectedLabels = this.state.selectedRowKeys;

    let labels = this.state.skus;
    for (let i = 0; i < selectedLabels.length; i++) {
      labels = removeALabel(labels, selectedLabels[i]);
    }

    this.setState({
      selectedRowKeys: [],
      skus: labels,
    });
  };

  //Delete selected skus from the list
  onDelete = () => {
    const { confirm } = Modal;
    confirm({
      title: "Are you sure to delete selected skus?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.removeSeletedSKUs();
      },
      onCancel: () => {
        //console.log("Cancel");
      },
    });
  };

  //click Add sku button to show the AddSKUForm
  onAddSKU = () => {
    this.setState({
      visibleAddSKUModal: true,
    });
  };

  //click uPDATE button to show the Update Qty Form
  onUpdateQTY = (sku, quantity) => {
    this.setState({
      visibleUpdateQtyModal: true,
      selectedRowKeys: [],
    });
    this.updatedSKU = sku;
    this.updatedQTY = quantity;
  };

  //Import SKUs From a CSV file
  onImportCSVFile = () => {
    this.setState({
      visibleUploadModal: true,
    });
  };

  //click Print button to show the PrintForm
  onPrint = () => {
    this.setState({
      visiblePrintModal: true,
    });
  };

  //triggered when Selection of skus change
  onSelectChange = (selectedRowKeys) => {
    let selectedSKUs = [];

    for (let i = 0; i < selectedRowKeys.length; i++) {
      const labels = getLabelsByQty(this.state.skus, selectedRowKeys[i]);
      selectedSKUs = [...selectedSKUs, ...labels];
    }

    this.setState({ selectedRowKeys, selectedSKUs });
  };

  //Click Add button on AddForm to add new sku to the list
  handleAdd = (e) => {
    let newSKU = this.myAddFormRef.current.state;
    this.setState({
      skus: addALabel(this.state.skus, newSKU.sku, newSKU.quantity),
    });
  };

  //Click Upload button on Upload File Form to upload a csv file
  handleUpload = (e) => {
    let uploadForm = this.myUploadFileRef.current.state;

    this.setState({
      skus: addLabels(this.state.skus, uploadForm.skus),
      visibleUploadModal: false,
    });
  };

  //Click Save button on Update Qty Form to save the new quantity
  handleUpdateQty = (e) => {
    let updateForm = this.myUpdateQTYRef.current.state;

    this.setState({
      skus: updateALabel(this.state.skus, this.updatedSKU, updateForm.quantity),
      visibleUpdateQtyModal: false,
    });
  };

  //Click the Cancel Button on Print Form
  handleCancelPrintModal = (e) => {
    this.setState({
      visiblePrintModal: false,
    });
  };

  //Click the Cancel Button on Add SKU Form
  handleCancelAddSKUModal = (e) => {
    this.setState({
      visibleAddSKUModal: false,
    });
  };

  //Click the Cancel Button on Upload File Form
  handleCancelUploadModal = (e) => {
    this.setState({
      visibleUploadModal: false,
    });
  };

  //Click the Cancel Button on Update Qty Form
  handleCancelUpdateQtyModal = (e) => {
    this.setState({
      visibleUpdateQtyModal: false,
    });
  };

  //Click the Print Button on Print Modal
  handlePrintSkuLabels = () => {
    const ifr = document.getElementById("iframe-for-print").contentWindow;
    ifr.focus();
    ifr.print();
  };

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
          onClick={this.onImportCSVFile}
          style={{ marginRight: "40px" }}
        >
          Import SKUs
        </Button>

        <Button
          type="primary"
          onClick={this.onAddSKU}
          style={{ marginRight: "20px" }}
        >
          Add SKU
        </Button>

        <Button
          type="primary"
          disabled={!hasSelected}
          loading={loading}
          onClick={this.onDelete}
          style={{ marginRight: "40px" }}
        >
          Delete
        </Button>

        <Button
          type="primary"
          disabled={!hasSelected}
          loading={loading}
          onClick={this.onPrint}
        >
          Print
        </Button>
      </span>
    );

    return (
      <div>
        <Card title="SKU List" extra={extra}>
          <Table
            rowSelection={rowSelection}
            dataSource={this.state.skus}
            columns={this.columns}
            bordered
            scroll={{ y: 300 }}
          />
        </Card>
        {/** Form to add new skus */}
        <Modal
          title="Add New SKU"
          visible={this.state.visibleAddSKUModal}
          onCancel={this.handleCancelAddSKUModal}
          footer={[
            <Button key="add" type="primary" onClick={this.handleAdd}>
              Add
            </Button>,
            <Button key="back" onClick={this.handleCancelAddSKUModal}>
              Exit
            </Button>,
          ]}
        >
          <AddForm ref={this.myAddFormRef} />
        </Modal>
        {/** Form to Update Quantity */}
        <Modal
          title="Update Quantity"
          visible={this.state.visibleUpdateQtyModal}
          onCancel={this.handleCancelUpdateQtyModal}
          footer={[
            <Button key="add" type="primary" onClick={this.handleUpdateQty}>
              Save
            </Button>,
            <Button key="back" onClick={this.handleCancelUpdateQtyModal}>
              Exit
            </Button>,
          ]}
        >
          <UpdateQtyForm
            ref={this.myUpdateQTYRef}
            sku={this.updatedSKU}
            quantity={this.updatedQTY}
          />
        </Modal>

        {/** Form to Import CSV File */}
        <Modal
          title="Import CSV File"
          visible={this.state.visibleUploadModal}
          onCancel={this.handleCancelUploadModal}
          footer={null}
        >
          <UploadForm
            ref={this.myUploadFileRef}
            onUploaded={this.handleUpload}
          />
        </Modal>

        {/** Form to print skus */}
        <Modal
          title="Print SKUs"
          visible={this.state.visiblePrintModal}
          onCancel={this.handleCancelPrintModal}
          width="60vw"
          footer={[
            <Button
              key="add"
              type="primary"
              onClick={this.handlePrintSkuLabels}
            >
              Print
            </Button>,
            <Button key="back" onClick={this.handleCancelPrintModal}>
              Exit
            </Button>,
          ]}
        >
          <PrintForm skus={this.state.selectedSKUs} />
        </Modal>
      </div>
    );
  }
}
