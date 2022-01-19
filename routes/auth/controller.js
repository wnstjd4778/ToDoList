const User = require('../../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createResponse } = require('../../utils/response');
const asyncHandler = require('express-async-handler');
const { DUPLICATED_EMAIL, DUPLICATED_NICKNAME, DUPLICATED_TEL, EMAIL_NOT_FOUND,
    INVAILED_EMAIL_OR_PASSWORD, INVALID_PASSWORD, PASSWORD_NOT_FOUND, FORBIDDEN } = require('../../errors/index');


// 회원가입하기
const signUp = asyncHandler(async (req, res) => {
    const { email, tel, password, nickName } = req.body;
    const exUser = User.find({ 'email': email });
    if (exUser) {
        return next(DUPLICATED_EMAIL);
    }
    exUser = User.find({ 'nickName': nickName });
    if (exUser) {
        return next(DUPLICATED_NICKNAME);
    }
    exUser = User.find({ 'tel': tel });
    if (exUser) {
        return next(DUPLICATED_TEL);
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
        email,
        nickName,
        password: hash,
        tel
    });
    res.json(createResponse(res, ''));
});


// 로그인 하기
const signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.find({ 'email': email });
    if (user.length) {
        await bcrypt.compare(password, user[0].password, (err, result) => {
            console.log(result);
            if (result) {
                const token = jwt.sign({
                    user_email: user[0].email
                }, 'YOUR_SECRET_KEY', {
                    expiresIn: '1h'
                });
                res.json(createResponse(res, { 'token': token }));
            } else {
                next(INVAILED_EMAIL_OR_PASSWORD);
            }
        });
    } else {
        next(INVAILED_EMAIL_OR_PASSWORD);
    }
});


// 중복 아이디 체크하기
const checkDuplicatedEmail = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const exUser = await User.find({ 'email': email });
    if (exUser.length) {
        next(DUPLICATED_EMAIL);
    } else {
        res.json(createResponse(res, ''));
    }
});


// 중복 닉네임 체크하기
const checkDuplicatedNickName = asyncHandler(async (req, res, next) => {
    const { nickName } = req.body;
    const exUser = await User.find({ 'nickName': nickName });
    if (exUser.length) {
        next(DUPLICATED_NICKNAME);
    } else {
        res.json(createResponse(res, ''));
    }
});

// 중복 전화번호 체크하기
const checkDuplicatedTel = asyncHandler(async (req, res, next) => {
    const { tel } = req.body;
    const exUser = await User.find({ 'tel': tel });
    if (exUser.length) {
        next(DUPLICATED_TEL);
    } else {
        res.json(createResponse(res, ''));
    }
});


// 전화번호와 이메일로 비밀번호 찾기
const findPasswordByTelAndEmail = asyncHandler(async (req, res, next) => {
    const { email, tel } = req.body;

    const exUser = await User.findOne({ 'tel': tel, 'email': email });
    if (exUser) {
        res.json(createResponse(res, { 'password': exUser.password }));
    } else {
        next(PASSWORD_NOT_FOUND);
    }
});


// 전화번호로 이메일 찾기
const findEmailByTel = asyncHandler(async (req, res, next) => {
    const { tel } = req.body;
    const exUser = await User.findOne({ 'tel': tel });
    if (exUser) {
        res.json(createResponse(res, { 'email': exUser.email }));
    } else {
        next(EMAIL_NOT_FOUND);
    }
});


// 비밀번호가 맞는지 체크하고 변경하기
const updatePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const exUser = await User.findOne({ 'email': res.locals.email });
    await bcrypt.compare(oldPassword, exUser.password, async (err, result) => {
        if (result) {
            const hash = await bcrypt.hash(newPassword, 12);
            await User.updateOne({ '_id': exUser._id }, { 'password': newPassword });
            res.json(createResponse(res, ''));
        }
        else {
            next(INVALID_PASSWORD);
        }
    });
});


// 내정보 확인하기
const getMyProfile = async (req, res, next) => {
    try {
        const exUser = await User.findOne({ 'email': res.locals.email });
        res.json(createResponse(res, exUser));
    } catch (err) {
        next(err);
    }
};


// 닉네임 변경하기
const updateNickName = asyncHandler(async (req, res, next) => {
    const { nickName } = req.body;
    const user = await User.findOne({ 'nickName': nickName });
    if (user) {

        return next(DUPLICATED_NICKNAME);
    }
    const exUser = await User.findOne({ 'email': res.locals.email });
    if (exUser) {
        await User.updateOne({ '_id': exUser._id }, { 'nickName': nickName });
        res.json(createResponse(res, ''));
    } else {
        next(FORBIDDEN);
    }
});


exports.signUp = signUp;
exports.signIn = signIn;
exports.checkDuplicatedEmail = checkDuplicatedEmail;
exports.checkDuplicatedNickName = checkDuplicatedNickName;
exports.checkDuplicatedTel = checkDuplicatedTel;
exports.findPasswordByTelAndEmail = findPasswordByTelAndEmail;
exports.findEmailByTel = findEmailByTel;
exports.updatePassword = updatePassword;
exports.getMyProfile = getMyProfile;
exports.updateNickName = updateNickName;