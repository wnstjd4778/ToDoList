
const passport = require('passport');

const router = require('express').Router();


router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao'));

module.exports = router;