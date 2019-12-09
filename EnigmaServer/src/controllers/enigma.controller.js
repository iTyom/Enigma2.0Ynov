const express = require('express');
const router = express.Router();
const enigmaService = require('../services/enigma.service');
const jwt = require('../../_helpers/jwt')
// routes
router.post('/getCode', jwt.isAuthorized, getCode);


module.exports = router;

function getCode(req, res, next) {
    enigmaService.getCode(req.body)
        .then(data => data ? res.json(data) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}