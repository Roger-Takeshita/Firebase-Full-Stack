const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const config = require('./config');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://socialape-4ee16.firebaseio.com',
    storageBucket: config.storageBucket,
});

const db = admin.firestore();

module.exports = {
    admin,
    db,
};
