'use strict'
const promise = require("bluebird");
const dbConnection = require("./connection");

const AddNewLog = (date, value, type, count) => {
    return dbConnection.QueryRequest(`
        INSERT INTO search_logs (date_log, type_log, value_log, count_log)
           VALUES ('${date}', '${type}', '${value}', ${count})`)
        .catch(err => {
            return createIFNotExists()
                .then(() => {
                    return AddNewLog(date, value, type, count)
                })

        })
}

function createIFNotExists() {
    return dbConnection.QueryRequest(`CREATE TABLE search_logs (
        date_log timestamp,
        type_log varchar(255),
        value_log varchar(255),
        count_log int
    )`);
}

module.exports = {
    AddNewLog
}