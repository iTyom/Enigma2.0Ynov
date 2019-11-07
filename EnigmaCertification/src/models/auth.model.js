const mongoose = require('mongoose')

// Une ressource est un Utilisateurs 

const authSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Auth', authSchema)