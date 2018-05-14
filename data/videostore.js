'use strict'
const promise = require("bluebird");
const dbConnection = require("./connection");

const GetFilmsByIds = ids => dbConnection.QueryRequest("SELECT * FROM film INNER JOIN language ON film.language_id = language.language_id  WHERE film_id IN (" + ids.join(",") + ")")

const GetFilmsIdsByQuery = query => {
    return dbConnection.QueryRequest(`SELECT DISTINCT film.film_id FROM film AS film 
              INNER JOIN film_category AS category ON film.film_id = category.film_id 
              INNER JOIN film_actor AS actor ON film.film_id = actor.film_id 
              WHERE ${query}`)
}

const GetFilmsIdsByTitleQuery = textSearch => dbConnection.QueryRequest(`SELECT film_id, title, description, release_year FROM film WHERE title LIKE "%${textSearch}%"`) 

const GetFilmsIdsByDescriptionQuery = textSearch => dbConnection.QueryRequest(`SELECT film_id, title, description, release_year FROM film WHERE description LIKE "%${textSearch}%"`)

module.exports = {
    GetFilmsByIds,
    GetFilmsIdsByQuery,
    GetFilmsIdsByTitleQuery,
    GetFilmsIdsByDescriptionQuery
}