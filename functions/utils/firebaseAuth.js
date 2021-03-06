const { admin, db } = require('./admin');

module.exports = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('Not token found');
        return res.status(403).json({ error: 'Unauthorized!' });
    }

    admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            req.user = decodedToken;
            return db.collection('users').where('userId', '==', req.user.uid).limit(1).get();
        })
        .then((data) => {
            req.user.handle = data.docs[0].data().handle;
            req.user.imageUrl = data.docs[0].data().imageUrl;
            return next();
        })
        .catch((error) => {
            console.error('Error while verifying token', error);
            return res.status(403).json(error);
        });
};
