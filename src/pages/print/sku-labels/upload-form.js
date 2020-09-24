import React, { Component } from "react";

import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

function convertCSVto2DArray(str, delimiter = ",") {
  const titles = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  let result = [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i]) {
      const values = rows[i].split(delimiter);
      result.push(
        titles.reduce(
          (object, curr, j) => ((object[curr] = values[j]), object),
          {}
        )
      );
    }
  }
  return result;
}
//generate
function getSKUs(str) {
  const array = convertCSVto2DArray(str);

  let result_array = [];
  for (let i = 0; i < array.length; i++) {
    let sku = {
      sku: array[i]["InventoryItemCode"],
      quantity: parseInt(array[i]["Quantity"]),
    };
    result_array.push(sku);
  }

  return result_array;
}

export default class UploadForm extends Component {
  state = {
    skus: [],
  };

  render() {
    const { Dragger } = Upload;

    const props = {
      name: "file",
      //read files
      transformFile: (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onloadend = () => {
            this.setState({ skus: getSKUs(reader.result) });
            this.props.onUploaded();
          };
        });
      },
    };
    return (
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support upload for a single csv file exported from ReadyToShip
          platform
        </p>
      </Dragger>
    );
  }
}
