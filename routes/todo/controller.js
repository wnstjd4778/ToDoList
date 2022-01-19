const todo = require('../../schemas/todo');
const { createResponse }= require('../../utils/response');

// todo 생성
const createTodo = async (req, res) => {
    req.body.user_email = res.locals.email;
    console.log(req.body);
    await todo.create(req.body)
        .then(todo => res.json(createResponse(res, todo)))
        .catch(err => res.status(500).send(err));
}

//todo 수정
const updateTodo = async (req, res) => {
    await todo.findOneAndUpdate({'_id':req.params.id, 'user_email': res.locals.email}, res.body, { new: true})
        .then(todo => res.send(todo))
        .catch(err => res.send(err));
}

//todo 삭제
const deleteTodo = async (req, res) => {
    console.log(req.params.id);
    await todo.deleteOne({'_id': req.params.id, 'user_email': res.locals.email})
        .then(todo => res.json(createResponse(res, todo)))
        .catch(err => res.send(err));
}

//오늘 날짜인 todo 가져오기
const getTodayTodo = async (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    await todo.find({'day': day, 'month': month, 'year': year, 'user_email': res.locals.email})
        .then(todo => res.json(createResponse(res, todo)))
        .catch(err => res.send(err));
}

//해당 할일 중요 체크하기
const updateImportantById = async (req, res) => {
    const exTodo = await todo.findOne({'_id':req.params.id});
    await todo.updateOne({'_id':req.params.id, 'user_email': res.locals.email}, {'important': !exTodo.important})
        .then(todo => res.json(createResponse(res, todo)))
        .catch(err => res.send(err));
}

// 해당 할일 끝냈는지 체크
const updateCompletedById = async (req, res) => {
    const exTodo = await todo.findOne({'_id':req.params.id});
    await todo.updateOne({'_id':req.params.id, 'user_email': res.locals.email}, {'completed': !exTodo.completed})
        .then(todo => res.json(createResponse(res, todo)))
        .catch(err => res.send(err));
}

// 해당 날짜의 할일 가져오기
const getTodoByDay = async (req, res) => {
    await todo.find({'day':req.query.day, 'month':req.query.month, 'year':req.query.year, 'user_email': res.locals.email})
        .then(todo => res.json(createResponse(res, todo)))
        .catch(err => res.send(err));
}



exports.getTodoByDay = getTodoByDay;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
exports.getTodayTodo = getTodayTodo;
exports.updateImportantById = updateImportantById;
exports.updateCompletedById = updateCompletedById;