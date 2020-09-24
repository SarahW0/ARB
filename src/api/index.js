/*
 * Module file contains all API network calls
 * All API calls return a Promise instance
 */
import ajax from "./ajax";

//send user login info to server for validation
export const reqLogin = (username, password) =>
  ajax(
    "https://www.aironboard.com/ARB/index.php",
    { username: username, password: password },
    "POST"
  );

//get invoices by date
//code example https://api.xero.com/api.xro/2.0/Invoices?where=Date>DateTime(2020, 09, 01)&page=1
export const reqInvoicesByDate = (from) =>
  ajax(
    "https://api.xero.com/api.xro/2.0/Invoices",
    { where: `Date>DateTime(${from})`, page: "1" }, //page=1 will return maximun 100 invoices
    "GET"
  );

//get invoices
//code example GET https://api.xero.com/api.xro/2.0/Invoices/243216c5-369e-4056-ac67-05388f86dc81
export const reqInvoiceByNumber = (number) =>
  ajax(`https://api.xero.com/api.xro/2.0/Invoices/${number}`, {}, "GET");

//get Company Info
export const reqCompanyInfo = (id) =>
  ajax("https://www.xero.com/ARB/index.php", { ContactID: id }, "GET");
