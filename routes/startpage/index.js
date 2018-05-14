'use strict'

const express = require('express');
const generalRoute = require("./generalroute")
const router = express.Router();

/* GET home page. */
router.get('/', generalRoute.GetStartPage);

module.exports = router;