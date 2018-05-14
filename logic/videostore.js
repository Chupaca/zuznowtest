'use strict'

const promise = require("bluebird")
const videoStoreRepository = require("../data/videostore")
const categoriesRepository = require("../data/categories")
const languagesRepository = require("../data/languages")
const actorsRepository = require("../data/actors")
const search_log = require("../data/searchlogs")
const moment = require("moment")

const GetByChoices = dataForSearch => {
    let query = buildQueryForRequest(dataForSearch);
    if (query.length) {
        return videoStoreRepository.GetFilmsIdsByQuery(query)
            .then(filmsIds => BuildFilmsFieldsByFilmIds(filmsIds.map(film => film.film_id)))
    } else {
        return new promise.resolve(null)
    }
}

const GetBySearchParams = (textSearch, type, log) => {
    if (type == "title") {
        return videoStoreRepository.GetFilmsIdsByTitleQuery(textSearch)
            .then(resultGet => {
                return AddToLogs(textSearch, type, resultGet, log)
            })
    } else {
        return videoStoreRepository.GetFilmsIdsByDescriptionQuery(textSearch)
            .then(resultGet => {
                return AddToLogs(textSearch, type, resultGet, log)
            })
    }
}

const AddToLogs = (textSearch, type, resultGet, log) => {
    if (log && log == "true") {
        let time = moment.utc().format("YYYY-MM-DD HH:mm:ss")
        let log = {
            date: time,
            type: type,
            value: textSearch,
            count: resultGet.length
        }
        search_log.AddNewLog(time, textSearch, type, resultGet.length)
        return [log, resultGet]
    }
    else {
        return [{}, resultGet]
    }
}

function buildQueryForRequest(dataForSearch) {
    let query = '';
    if (dataForSearch.category && dataForSearch.category.length) {
        query += `category.category_id IN (${dataForSearch.category.join(",")})`
    }
    if (dataForSearch.language && dataForSearch.language.length) {
        query += ` ${(query.length > 1 ? 'AND' : '')} film.language_id IN (${dataForSearch.language.join(",")})`
    }
    if (dataForSearch.actor && dataForSearch.actor.length) {
        query += ` ${(query.length > 1 ? 'AND' : '')} actor.actor_id IN  (${dataForSearch.actor.join(",")})`
    }
    return query;
}

function BuildFilmsFieldsByFilmIds(filmsIds) {
    if (filmsIds.length) {
        return promise.join(GetFilmsByIds(filmsIds),
            categoriesRepository.GetCategoriesByFilmsIds(filmsIds), actorsRepository.GetActorsByFilmIds(filmsIds),
            (films, categories, actors) => {
                actors = buildActorsList(actors)
                categories = buildCategoriesList(categories)
                return { films, categories, actors, filmsIds }
            })
    } else {
        return null
    }
}

function buildActorsList(actors) {
    actors = actors.reduce((prev, curr) => {
        if (prev[curr.film_id]) {
            prev[curr.film_id].push(curr.first_name + " " + curr.last_name)
        } else {
            prev[curr.film_id] = []
            prev[curr.film_id].push(curr.first_name + " " + curr.last_name)
        }
        return prev;
    }, {})
    return actors;
}

function buildCategoriesList(categories) {
    categories = categories.reduce((prev, curr) => {
        prev[curr.film_id] = curr.name
        return prev;
    }, {})
    return categories
}

const GetFilmsByIds = ids => videoStoreRepository.GetFilmsByIds(ids)

const GetFilmsById = id => BuildFilmsFieldsByFilmIds([id])

module.exports = {
    GetFilmsByIds,
    GetByChoices,
    GetBySearchParams,
    BuildFilmsFieldsByFilmIds,
    GetFilmsById,
    AddToLogs
}