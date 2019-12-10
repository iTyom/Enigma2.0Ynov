const db = require('../../_helpers/db');

module.exports = {
    getCode,
};

async function getCode(langage) {
    console.log("ok", langage);
    return langage;
}