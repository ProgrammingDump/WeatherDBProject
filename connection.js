var mysql = require("mysql2");
var con = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "PASSSql1",
        database:"weather"
    }
);

module.exports = con;