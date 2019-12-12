module.exports = {
    getCode,
    getValidationSlug,
    getBatch,
};
// messageDecrypted = 'Tu déconnes pépé ! L\'Holocauste a vraiment existé';
// messageCrypted = 'St cébnmmdr oéoé ! K\'Gnknbztrsd z uqzhldms dwhrsé';
messageCrypted = 'Vw féeqppgu réré ! N\'Jqnqecwuvg c xtckogpv gzkuvé';

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
    return batch;
}