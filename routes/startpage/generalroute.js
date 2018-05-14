'use strict'
const promise = require("bluebird")
const moment = require('moment');
const categoriesLogic = require("../../logic/categories")
const languagesLogic = require("../../logic/languages")
const actorsLogic = require("../../logic/actors")
const videoStoreLogic = require("../../logic/videostore")



exports.GetStartPage = (req, res) => {
    promise.join(categoriesLogic.GetAllCategories(), languagesLogic.GetAllLanguages(), actorsLogic.GetAllActors(),
        (categories, languages, actors) => {
            res.render('index', { categories:categories, languages:languages, actors:actors });
            })
};
