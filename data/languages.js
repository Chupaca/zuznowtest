'use strict'
const promise = require("bluebird");
const dbConnection = require("./connection");


const GetAllLanguages = () => dbConnection.QueryRequest("SELECT * FROM language");

const GetLanguageQuery = textSearch => dbConnection.QueryRequest(`SELECT name, language_id FROM language WHERE name LIKE "%${textSearch}%"`)

const GetByFilmsByLanguageId = categoryId => dbConnection.QueryRequest(`SELECT film_id FROM film WHERE language_id = ${categoryId}`);

module.exports = {
    GetAllLanguages,
    GetLanguageQuery,
    GetByFilmsByLanguageId
}