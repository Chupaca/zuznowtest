'use strict'
const promise = require("bluebird")
const moment = require('moment');
const languagesLogic = require("../../logic/languages")
const videoStoreLogic = require("../../logic/videostore")
const fs = require('fs');
const ejs = require('ejs');
const elementsPartialEjs = fs.readFileSync('views/filmrowpartial.ejs', 'utf8');

exports.GetBySearchParams = (req, res) => {
    const { text , log} = req.query;
    languagesLogic.GetBySearchParams(text, log)
        .then(([log, resultGet]) => {
            res.send({ resultGet, log })
        })
}

exports.GetByFilmsByLanguageId = (req, res) => {
    const { id } = req.params;
    languagesLogic.GetByFilmsByLanguageId(id)
        .then(result => {
            if (result) {
                let films_rows = ejs.render(elementsPartialEjs, { films: result.films, categories: result.categories, actors: result.actors })
                res.send({ resultsFilmsHTML: films_rows, filmsIds: result.filmsIds })
            } else {
                res.send({ resultsFilmsHTML: '', filmsIds: [] })
            }

        })
}