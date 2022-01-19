const httpErrors = require('http-errors');

const createError = err => {
    const e = httpErrors(err[0], err[1]);
    e.code = err[2];
    return e;
};

const errors = {
    // 400 Errors
    DUPLICATED_EMAIL: [400, '현재 이메일을 사용할 수 없습니다.'],
    DUPLICATED_TEL: [400, '현재 전화번호를 사용할 수 없습니다.'],
    DUPLICATED_NICKNAME: [400, '현재 닉네임을 사용할 수 없습니다.'],
    INVAILED_EMAIL_OR_PASSWORD: [400, '이메일 또는 비밀번호가 유효하지 않습니다.'],
    PASSWORD_NOT_FOUND: [400, '현재 이메일과 전화번호를 비밀번호를 찾을 수 업습니다.'],
    EMAIL_NOT_FOUND: [400, '현재 전화번호로 이메일을 찾을 수 없습니다.'],
    INVALID_PASSWORD: [400, '비밀번호가 일치하지 않습니다.'],

    // 401 Errors
    LOGIN_REQUIRED: [401, '로그인이 필요합니다.'],
  
    // 403 Errors
    FORBIDDEN: [403, '권한이 없는 요청입니다.'],
  
    // 404 Errors
    NOT_FOUND: [404, '찾을 수 없는 요청입니다.'],
  
    // 500 Errors
    SERVER_ERROR: [500, '서버 에러.'],
  };

  Object.keys(errors).forEach(key => {
    errors[key] = createError([...errors[key], key]);
  });

  module.exports = errors;