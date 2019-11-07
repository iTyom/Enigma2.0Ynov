const express = require('express')
const router = express.Router()
const Auth = require('../models/auth.model')

router.get('/', async (req, res) => {
    try {
        const msg = "Ca marche"
        res.json(msg);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router