import React, { Component } from "react";
import { Select, Card, Form } from "antd";
import printLayout from "../../../config/printLayoutConfig";

export default class PrintForm extends Component {
  state = {
    cprint: 0 /*array index */,
  };

  start_row = 0;
  start_col = 0;
  //test if props changed
  isPropsSame = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  };

  componentDidUpdate = (prevProps) => {
    console.log(prevProps.skus);
    console.log(this.props.skus);
    let result = this.isPropsSame(prevProps.skus, this.props.skus);
    console.log(result);
    if (!result) {
      this.refreshPrintWindow();

      this.forceUpdate();
    }
  };

  //printLayoutChange
  printLayoutChange = () => {};

  //generate print layout select options
  generatePrintSelect = () => {
    const { Option } = Select;

    let layout_options = [];
    let row_options = [];
    let col_options = [];

    //generate print layout drop down list
    for (let i = 0; i < printLayout.length; i++) {
      layout_options.push(
        <Option value={printLayout[i].id}>{printLayout[i].name}</Option>
      );
    }

    //generate row drop down list
    for (let i = 0; i < printLayout[this.state.cprint].rows; i++) {
      row_options.push(<Option value={"row-" + i}>{i + 1}</Option>);
    }

    //generate column drop down list
    for (let i = 0; i < printLayout[this.state.cprint].columns; i++) {
      col_options.push(<Option value={"col-" + i}>{i + 1}</Option>);
    }

    return (
      <div
        style={{
          paddingLeft: 20,
          width: "100%",
        }}
      >
        <p>Select Page Layout</p>
        <Select
          defaultValue={printLayout[this.state.cprint].id}
          onChange={this.handlePrintLayoutChange}
          style={{ width: "100%" }}
        >
          {layout_options}
        </Select>
        <p style={{ marginTop: "20px" }}>Print Starting Cell:</p>
        <Card>
          <Card.Grid style={{ width: "50%" }} hoverable={false}>
            <Form.Item label="Row">
              <Select
                defaultValue={"row-0"}
                placeholder="Starting Row"
                onChange={this.handleRowChange}
                style={{ width: "100%" }}
              >
                {row_options}
              </Select>
            </Form.Item>
          </Card.Grid>
          <Card.Grid style={{ width: "50%" }} hoverable={false}>
            <Form.Item label="Column">
              <Select
                defaultValue={"col-0"}
                placeholder="Starting Column"
                onChange={this.handleColumnChange}
                style={{ width: "100%" }}
              >
                {col_options}
              </Select>
            </Form.Item>
          </Card.Grid>
        </Card>
      </div>
    );
  };

  //refresh print preview window
  refreshPrintWindow = () => {
    const ifr = document.getElementById("iframe-for-print").contentWindow;

    ifr.document.open();
    ifr.document.write(this.generateHTML(""));
    ifr.document.close();
  };
  //generate HTML for iframe
  generateHTML = (labels) => {
    let style = `
     <style>
     * {
       margin:0;
       padding:0;
       box-sizing: border-box;       
     }

      body {        
        font-size:12px;        
      }

      .grid-container {
        display: grid;
        width: 100%;
        grid-template-columns: auto auto auto auto;
        background-color: #2196F3;
        
        overflow: auto;
      }
      .grid-item {
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.8);
        padding: 20px;        
        text-align: center;
      }

      @media print {
        body {
          font-size:14pt;
        }
        body, .grid-container,.grid-item {
          background-color: transparent;          
        }

        body {          
          margin:0;
          padding:0;
        }

        .grid-container{
          overflow:initial;          
        }

        .grid-item {
           border:none;
           height:17.5mm;
           padding: 4mm;   
        }
      }
      </style>
    `;

    let header = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        ${style}
    </head>`;

    let footer = `</html>`;

    let grid_items = "";

    //add space, so print starts from beginning cell
    const columns_per_row = printLayout[this.state.cprint].columns;
    const total_space = this.start_row * columns_per_row + this.start_col;
    for (let i = 0; i < total_space; i++) {
      grid_items += `<div class="grid-item" style={background-color:"white"}>&nbsp;</div>`;
    }
    //add skus to the grid
    for (let i = 0; i < this.props.skus.length; i++) {
      grid_items += `<div class="grid-item">${this.props.skus[i]}</div>`;
    }

    return `
    ${header}
    <body>
      <div class="grid-container">
        ${grid_items}
      </div>  
    </body>
    ${footer}
    `;
  };

  componentDidMount() {
    this.refreshPrintWindow();
  }

  handlePrintLayoutChange = (e) => {
    console.log(e);
  };

  //row selection is changed
  handleRowChange = (e) => {
    //extract row number
    this.start_row = parseInt(e.substring(4));
    this.refreshPrintWindow();
  };
  handleColumnChange = (e) => {
    //extract column number
    this.start_col = parseInt(e.substring(4));
    this.refreshPrintWindow();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "60vh", display: "flex" }}>
        <iframe
          title="Preview"
          height="100%"
          width="60%"
          id="iframe-for-print"
        ></iframe>

        <div
          style={{
            paddingLeft: 20,
            borderLeft: "1px dotted rgba(0,0,0,0.2)",
            width: "40%",
          }}
        >
          {this.generatePrintSelect()}
        </div>
      </div>
    );
  }
}
