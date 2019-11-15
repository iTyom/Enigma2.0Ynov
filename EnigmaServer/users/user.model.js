const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    login: { type: String, unique: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);