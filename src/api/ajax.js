/*
 * send GET/POST network request module via axios
 * return Promise instance
 */
import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    //1 execute ajax request
    if (method === "GET") {
      promise = axios.get(url, {
        params: data,
      });
    } else {
      promise = axios.post(url, data);
    }
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        message.error("Login request failed: " + err.message);
      });
  });
}
