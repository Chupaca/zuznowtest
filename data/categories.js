'use strict'
const promise = require("bluebird");
const dbConnection = require("./connection");


const GetAllCategories = () => dbConnection.QueryRequest("SELECT * FROM category");

const GetCategoriesByFilmsIds = filmsIds =>  dbConnection.QueryRequest("SELECT * FROM film_category INNER JOIN category ON film_category.category_id = category.category_id WHERE film_id IN (" + filmsIds.join(",") + ")");

const GetCategoryQuery = textSearch => dbConnection.QueryRequest(`SELECT name, category_id FROM category WHERE name LIKE "%${textSearch}%"`)

const GetByFilmsByCategoryId = categoryId => dbConnection.QueryRequest(`SELECT film_id FROM film_category WHERE category_id = ${categoryId}`);

module.exports = {
    GetAllCategories,
    GetCategoriesByFilmsIds,
    GetCategoryQuery,
    GetByFilmsByCategoryId
}