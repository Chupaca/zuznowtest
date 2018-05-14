'use strict'
const promise = require("bluebird")
const videoStoreLogic = require("../logic/videostore")
const actorsRepository = require("../data/actors")


const GetAllActors = () => actorsRepository.GetAllActors()

const GetByFilmsByActorId = id => {
    return actorsRepository.GetFilmsIdsByActorId(id)
        .then(filmsIds => videoStoreLogic.BuildFilmsFieldsByFilmIds(filmsIds.map(film => film.film_id)))
}

const GetBySearchParams = (textSearch, log) => {
    return actorsRepository.GetActorsQuery(textSearch)
        .then(resultGet => {
            return videoStoreLogic.AddToLogs(textSearch, "actor", resultGet, log)
        })
}

module.exports = {
    GetAllActors,
    GetByFilmsByActorId,
    GetBySearchParams

}