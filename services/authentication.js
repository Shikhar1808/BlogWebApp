const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function createTokenforUser(user) {
    const payload={
        _id: user._id,
        email: user.email,
        profileimageURL: user.profileimageURL,
        role: user.role
    };
    const token = JWT.sign(payload, secret, {expiresIn: '1h'});
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = {createTokenforUser, validateToken};