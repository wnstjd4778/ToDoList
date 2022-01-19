const todo = require('../../schemas/todo');
const { createResponse }= require('../../utils/response');
const asyncHandler = require('express-async-handler');
const {SERVER_ERROR} = require('../../errors/index');

// todo 생성
const createTodo = asyncHandler(async (req, res, next) => {
    req.body.user_email = res.locals.email;
    console.log(req.body);
    await todo.create(req.body);
    res.json(createResponse(res, ''));
});

//todo 수정
const updateTodo = asyncHandler(async (req, res, next) => {
    await todo.findOneAndUpdate({'_id':req.params.id, 'user_email': res.locals.email}, res.body, { new: true});
    res.json(createResponse(res, ''));
});

//todo 삭제
const deleteTodo = asyncHandler(async(req, res, next) => {
    console.log(req.params.id);
    await todo.deleteOne({'_id': req.params.id, 'user_email': res.locals.email})
    res.json(createResponse(res, ''));
});

//오늘 날짜인 todo 가져오기
const getTodayTodo = asyncHandler(async (req, res, next) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const exTodo = await todo.find({'day': day, 'month': month, 'year': year, 'user_email': res.locals.email})
    res.json(createResponse(res, exTodo));
});

//해당 할일 중요 체크하기
const updateImportantById = asyncHandler(async (req, res, next) => {
    const exTodo = await todo.findOne({'_id':req.params.id});
    await todo.updateOne({'_id':req.params.id, 'user_email': res.locals.email}, {'important': !exTodo.important});
    res.json(createResponse(res, ''));
});

// 해당 할일 끝냈는지 체크
const updateCompletedById = asyncHandler(async (req, res, next) => {
    const exTodo = await todo.findOne({'_id':req.params.id});
    await todo.updateOne({'_id':req.params.id, 'user_email': res.locals.email}, {'completed': !exTodo.completed});
    res.json(createResponse(res, ''));
});

// 해당 날짜의 할일 가져오기
const getTodoByDay = asyncHandler(async (req, res, next) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const exTodo = await todo.find({'day':req.query.day, 'month':req.query.month, 'year':req.query.year, 'user_email': res.locals.email});
    res.json(createResponse(res, ''));
});

// 중요한 할일 모두 가져오기
const getImportantTodo = asyncHandler(async (req, res, next) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const exTodo = await todo.find({'day':{$gte : day}, 'month': {$gte : year}, 'year': {$gte : month}, 'user_email': res.locals.email});
    res.json(createResponse(res, exTodo));
})

// 해당 월 할일 개수 가져오기
const getTodoCountByMonth = asyncHandler(async (req, res, next) => {
    console.log("통과");
    const month = req.query.month;
    const year = req.query.year;
    const count = await todo.find({'month': month, 'year':year}).count();
    res.json(createResponse(res, {'count' : count}));
});


exports.getTodoByDay = getTodoByDay;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
exports.getTodayTodo = getTodayTodo;
exports.updateImportantById = updateImportantById;
exports.updateCompletedById = updateCompletedById;
exports.getImportantTodo = getImportantTodo;
exports.getTodoCountByMonth = getTodoCountByMonth;