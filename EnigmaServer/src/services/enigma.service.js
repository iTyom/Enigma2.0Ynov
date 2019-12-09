const config = require('../../config.json');
const jwt = require('jsonwebtoken');
/* const bcrypt = require('bcryptjs'); */
const db = require('../../_helpers/db');
const User = db.User;
const bcrypt = require('bcrypt');

module.exports = {
    getCode,
};

async function getCode(langage) {
    console.log("ok", langage);
    return langage;
}
