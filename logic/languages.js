'use strict'
const promise = require("bluebird")
const languagesRepository = require("../data/languages")
const videoStoreLogic = require("../logic/videostore")



const GetAllLanguages = () => languagesRepository.GetAllLanguages();

const GetBySearchParams = (textSearch, log) => {
    return languagesRepository.GetLanguageQuery(textSearch)
        .then(resultGet => {
            return videoStoreLogic.AddToLogs(textSearch, "language", resultGet, log)
        })
}

const GetByFilmsByLanguageId = id => {
    return languagesRepository.GetByFilmsByLanguageId(id)
        .then(filmsIds => videoStoreLogic.BuildFilmsFieldsByFilmIds(filmsIds.map(film => film.film_id)))
}

module.exports = {
    GetAllLanguages,
    GetBySearchParams,
    GetByFilmsByLanguageId
}