'use strict'
const promise = require("bluebird")
const moment = require('moment');
const categoriesLogic = require("../../logic/categories")
const languagesLogic = require("../../logic/languages")
const actorsLogic = require("../../logic/actors")
const videoStoreLogic = require("../../logic/videostore")
const fs = require('fs');
const ejs = require('ejs');
const elementsPartialEjs = fs.readFileSync('views/filmrowpartial.ejs', 'utf8');


exports.GetByChoices = (req, res) => {
    const { data } = req.query;
    videoStoreLogic.GetByChoices(JSON.parse(data))
        .then(result => {
            if (result) {
                let films_rows = ejs.render(elementsPartialEjs, { films: result.films, categories: result.categories, actors: result.actors })
                res.send({ resultsFilmsHTML: films_rows, filmsIds: result.filmsIds })
            } else {
                res.send({ resultsFilmsHTML: '', filmsIds: [] })
            }

        })
};

exports.GetBySearchParams = (req, res) => {
    const { text, type, log } = req.query;
    videoStoreLogic.GetBySearchParams(text, type, log)
        .then(([log, resultGet]) => {
            res.send({resultGet, log})
        })
}

exports.GetByFilmById = (req, res) => {
    const { id } = req.params;
    videoStoreLogic.GetFilmsById(id)
        .then(result => {
            if (result) {
                let films_rows = ejs.render(elementsPartialEjs, { films: result.films, categories: result.categories, actors: result.actors })
                res.send({ resultsFilmsHTML: films_rows, filmsIds: result.filmsIds })
            } else {
                res.send({ resultsFilmsHTML: '', filmsIds: [] })
            }
        })
}