const jwt = require('jsonwebtoken');
const userServices = require('./services/userServices');
const { SECURE_KEY_JWT } = process.env;

exports.createJWT = (payload) => {
    const Token = jwt.sign(payload, SECURE_KEY_JWT, { expiresIn: '24hr' });
    return Token;
};

exports.verifyJWT = (token) => {
    const decodedToken = jwt.verify(token, SECURE_KEY_JWT, (err, decoded) => {
        if(err || Date.now() >= decoded.exp * 1000) {
            return "Token is now valid";
        } else {
            return decoded;
        }
    });

    return decodedToken;
};
