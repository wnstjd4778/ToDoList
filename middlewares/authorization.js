const jwt = require('jsonwebtoken');
const {LOGIN_REQUIRED} = require('../errors/index');
const asyncHandler = require('express-async-handler');

const verifyToken = asyncHandler((req, res, next) => {
    console.log('verifyToken 호출');  
        const clientToken = req.headers.authorization;
        if(!clientToken) {
            return next(LOGIN_REQUIRED);
        }
        const decode = jwt.verify(clientToken, 'YOUR_SECRET_KEY');
        console.log(decode);
        if(decode) {
            res.locals.email = decode.user_email;
            next();
        } else {
            return next(LOGIN_REQUIRED);
        }
    
});

exports.verifyToken = verifyToken;