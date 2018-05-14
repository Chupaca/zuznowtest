'use strict'
const promise = require("bluebird");
const dbConnection = require("./connection");


const GetAllActors = () => dbConnection.QueryRequest("SELECT * FROM actor");

const GetActorsByFilmIds = filmIds => dbConnection.QueryRequest("SELECT * FROM film_actor INNER JOIN actor ON film_actor.actor_id = actor.actor_id WHERE film_id IN (" + filmIds.join(",") + ")");

const GetActorsQuery = textSearch => dbConnection.QueryRequest(`SELECT first_name, last_name, actor_id FROM actor WHERE first_name LIKE "%${textSearch}%" OR last_name LIKE "%${textSearch}%"`)

const GetFilmsIdsByActorId = actorId => dbConnection.QueryRequest(`SELECT film_id FROM film_actor WHERE actor_id = ${actorId}`);

module.exports = {
    GetAllActors,
    GetActorsByFilmIds,
    GetActorsQuery,
    GetFilmsIdsByActorId
}
