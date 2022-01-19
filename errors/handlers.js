const { NOT_FOUND } = require('./');

const notFound = (req, res, next) => next(NOT_FOUND);
const errorHandler = (err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const code = err.code || 'SERVER_ERROR';

    const response = {
        success: false,
        status,
        code,
        message: err.message
    };
    res.status(status).json(response);
};

exports.notFound = notFound;
exports.errorHandler = errorHandler;