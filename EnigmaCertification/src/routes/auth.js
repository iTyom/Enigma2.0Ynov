const express = require('express')
const router = express.Router()
const Auth = require('../models/auth.model')
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4');

const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300

const users = {
    user1: 'password1',
    user2: 'password2'
}

const { username, password } = {
    username: "tom",
    password: "tom"
};

//On donne le token généré par jwt
router.post('/token', async (req, res) => {
    try {
        const token = jwt.sign({ username }, jwtKey, {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds
        })
        res.json(token);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router