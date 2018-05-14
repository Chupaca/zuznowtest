'use strict'

const express = require('express');
const actorsRoute = require("./actors")
const router = express.Router();

router.get("/search", actorsRoute.GetBySearchParams)
router.get('/:id', actorsRoute.GetByFilmsByActorId);



module.exports = router;