'use strict'

const promise = require("bluebird");
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "/dev-test.conversation.one",
    user: "test",
    password: "pass",
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