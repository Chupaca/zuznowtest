'use strict'

const express = require('express');
const videoStoreRoute = require("./videostore")
const router = express.Router();

router.get('/choices/search', videoStoreRoute.GetByChoices);
router.get("/search", videoStoreRoute.GetBySearchParams)
router.get("/:id", videoStoreRoute.GetByFilmById)


module.exports = router;