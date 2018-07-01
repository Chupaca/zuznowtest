'use strict'

const promise = require("bluebird");
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "/node-js-firs-app:europe-west4:simplesqldb-test",
    user: "root",
    password: "root",
    database: "sakila"
});

const QueryRequest = sql => {
    return new promise((resolve, reject) => {
        connection.query(sql, (err, rows) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(rows);
            }
        });
    });
}

module.exports = {
    QueryRequest
}
