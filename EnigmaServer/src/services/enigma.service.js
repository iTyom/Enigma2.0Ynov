module.exports = {
    getCodeToExecute,
    getValidationSlug,
    getBatch,
    getMessageCrypted,
};
// messageDecrypted = 'Tu déconnes pépé ! L\'Holocauste a vraiment existé';
// messageCrypted = 'St cébnmmdr oéoé ! K\'Gnknbztrsd z uqzhldms dwhrsé';
messageCrypted = 'Vw féeqppgu réré ! N\'Jqnqecwuvg c xtckogpv gzkuvé';

async function getMessageCrypted() {
    messagesCrypted = {};
    messagesCrypted[1] = {
        id: 1,
        message: 'Vw féeqppgu réré ! N\'Jqnqecwuvg c xtckogpv gzkuvé',
        treated: false
    }; // clé 2
    messagesCrypted[2] = {
        id: 2,
        message: 'Wx géfrqqhv sésé ! Vwdu Zduv f\'hvw wurs elhq.',
        treated: false
    }; // 3
    messagesCrypted[3] = {
        id: 3,
        message: 'Fg péoazzqe bébé ! V\'udmu pazo bxmupqd zafdq omgeq mg eézmf, eakql bdgpqzf !',
        treated: false
    }; // 12
    messagesCrypted[4] = {
        id: 4,
        message: 'Mn wévhggxl iéié ! Ftbgmxgtgm mn kxlmx eà xm mn éobmxl wx ytbkx wxl uêmblxl.',
        treated: false
    }; // 19
    messagesCrypted[5] = {
        id: 5,
        message: 'Rs béamllcq néné ! Rmsq lmq bpmïbcq tmlr w pcqrcp.',
        treated: false
    }; // 24

    return Object.values(messagesCrypted).find(x => !x.treated);
}

async function getCodeToExecute(langage) {
    let ceasarCipher = "function decode() {return [STRING].toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 - [FROMKEY]) % 26 + 65));} decode();";
    // console.log("messagesCrypted[5]", messagesCrypted);
    messagesCrypted[5].treated = true;
    ceasarCipher = Buffer.from(ceasarCipher).toString('base64');
    if (langage.langage === 'js') {
        return ceasarCipher;
    }
}

async function getValidationSlug() {
    // console.log("messagesCrypted[5]", messagesCrypted);
    const validationSlug = "Tu déconnes pépé !";
    return validationSlug;
}

async function getBatch() {
    let promiseMessage = getMessageCrypted()
    let message;
    let idMessage;
    await promiseMessage.then(x => {
        message = x.message;
        idMessage = x.id;
    })

    return {
        message: message,
        idMessage: idMessage,
        fromKey: 1,
        toKey: 5,
    };
    promiseMessage.then(data => {

    })
}