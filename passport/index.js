const passport = require('passport');
const kakao = require('./kakaoStrategy');
const User = require('../schemas/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('serializeUser 호출');
        done(null, user.snsKey)
    });

    passport.deserializeUser((snsKey, done) => {
        console.log('deserializeUser 호출');
        User.findOne({'snsKey': snsKey})
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    kakao();
}