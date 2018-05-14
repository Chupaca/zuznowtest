'use strict'

const express = require('express');
const categoryRoute = require("./category")
const router = express.Router();

router.get("/search", categoryRoute.GetBySearchParams)

router.get('/:id', categoryRoute.GetByFilmsByCategoryId);

module.exports = router;

