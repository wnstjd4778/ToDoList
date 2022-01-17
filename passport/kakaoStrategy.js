const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../schemas/user');

module.exports = () => {
    
    passport.use(new KakaoStrategy({
        clientID: '331da04fc5e4bc2741f65e1d7e5ece64',
        callbackURL: '/auth/kakao/callback'
    }, async (accessToken, refreshToekn, profile, done) => {
        console.log('kakao profile', profile);
        try {
            console.log('카카오 전략 호출');
            const exUser = await User.findOne({
                where: {snsKey: profile.id, snsType: 'kakao'}
            });
            if(exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao.account-email,
                    nickName: profile.displayName,
                    snsKey: profile.id,
                    snsKey: 'kakao',
                });
                done(null, newUser);
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }))
};