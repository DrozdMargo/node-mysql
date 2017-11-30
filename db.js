const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const { promisify } = require("util");

const prototype = Connection.prototype;
prototype.connectAsync = promisify(prototype.connect);
prototype.queryAsync = promisify(prototype.query);

module.exports = mysql;