'use strict'
const promise = require("bluebird")
const categoriesRepository = require("../data/categories")
const videoStoreLogic = require("../logic/videostore")


const GetAllCategories = () => categoriesRepository.GetAllCategories();

const GetBySearchParams = (textSearch, log) => {
    return categoriesRepository.GetCategoryQuery(textSearch)
        .then(resultGet => {
            return videoStoreLogic.AddToLogs(textSearch, "category", resultGet, log)
        })
}

const GetByFilmsByCategoryId = id => {
    return categoriesRepository.GetByFilmsByCategoryId(id)
        .then(filmsIds => videoStoreLogic.BuildFilmsFieldsByFilmIds(filmsIds.map(film => film.film_id)))
}


module.exports = {
    GetAllCategories,
    GetBySearchParams,
    GetByFilmsByCategoryId
}