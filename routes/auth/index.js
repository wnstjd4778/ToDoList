const router = require('express').Router();
const controller = require('./controller');
const {verifyToken} = require('../../middlewares/authorization');
router.post('/signup', controller.checkDuplicatedNickName, controller.checkDuplicatedTel, controller.checkDuplicatedEmail, controller.signUp);
router.post('/signin', controller.signIn);
router.post('/signup/checkEmail', controller.checkDuplicatedEmail);
router.post('/signup/checkTel', controller.checkDuplicatedTel);
router.post('/signup/checkNickName', controller.checkDuplicatedNickName);
router.get('/myProfile', verifyToken, controller.getMyProfile);
router.post('/change/password', verifyToken, controller.updatePassword);
router.post('/change/nickName', verifyToken, controller.updateNickName);
router.post('/find/password', controller.findPasswordByTelAndEmail);
router.post('/find/email', controller.findEmailByTel);

module.exports= router;