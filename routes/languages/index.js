'use strict'

const express = require('express');
const languagesRoute = require("./languages")
const router = express.Router();

router.get("/search", languagesRoute.GetBySearchParams)

router.get('/:id', languagesRoute.GetByFilmsByLanguageId);

module.exports = router;