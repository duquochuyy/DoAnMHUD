'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/asymmetricController');

router.get('/', (req, res) => {
    res.render('asymmetric');
});

router.put('/', controller.update);

module.exports = router;