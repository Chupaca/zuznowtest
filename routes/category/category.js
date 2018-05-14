'use strict'
const promise = require("bluebird")
const moment = require('moment');
const categoriesLogic = require("../../logic/categories")
const videoStoreLogic = require("../../logic/videostore")
const fs = require('fs');
const ejs = require('ejs');
const elementsPartialEjs = fs.readFileSync('views/filmrowpartial.ejs', 'utf8');

exports.GetBySearchParams = (req, res) => {
    const { text , log} = req.query;
    categoriesLogic.GetBySearchParams(text, log)
        .then(([log, resultGet]) => {
            res.send({ resultGet, log })
        })
}

exports.GetByFilmsByCategoryId = (req, res) => {
    const { id } = req.params;
    categoriesLogic.GetByFilmsByCategoryId(id)
        .then(result => {
            if (result) {
                let films_rows = ejs.render(elementsPartialEjs, { films: result.films, categories: result.categories, actors: result.actors })
                res.send({ resultsFilmsHTML: films_rows, filmsIds: result.filmsIds })
            } else {
                res.send({ resultsFilmsHTML: '', filmsIds: [] })
            }

        })
}