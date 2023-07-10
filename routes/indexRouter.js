'use strict';

const express = require('express');
const router = express.Router();

router.get('/createTables', (req, res) => {
    let models = require('../models');
    models.sequelize.sync().then(() => {
        res.send('tables created!');
    })
});

router.get('/', (req, res) => {
    res.render('index');
});

router.use('/asymmetric', require('../routes/asymmetricRouter'));

router.get('/:page', (req, res) => {
    res.render(req.params.page);
});

module.exports = router;