module.exports = {
    getCode,
    getValidationSlug,
    getBatch,
};
messageCrypted = 'Uv eédpooft qéqé ! M\'ipmpdbvtuf b wsbjnfou fyjtué';
messageCrypted2 = 'Vw féeqppgu réré ! E\'guv xtckogpv vgttkdng';

batch = {
    message: messageCrypted,
    fromKey: 1,
    toKey: 5,
};



async function getCode(langage) {
    const ceasarCipher = "function decode() {return [STRING].toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 - [FROMKEY]) % 26 + 65));} decode();";
    if (langage.langage === 'js') {
        return ceasarCipher;
    }
}

async function getValidationSlug() {
    const validationSlug = "Tu déconnes pépé !";
    return validationSlug;
}

async function getBatch() {
    console.log("ok", batch)
    return batch;
}