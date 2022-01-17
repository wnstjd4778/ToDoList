const connect = require('../../schemas');
const todo = require('../../schemas/todo');

// todo 생성
const createTodo = async (req, res) => {
    await todo.create(req.body)
        .then(todo => res.send(todo))
        .catch(err => res.status(500).send(err));
}

//todo 수정
const updateTodo = async (req, res) => {
    await todo.findOneAndUpdate({'_id':req.params.id}, payload, { new: true})
        .then(todo => res.send(todo))
        .catch(err => res.send(err));
}

//todo 삭제
const deleteTodo = async (req, res) => {
    console.log(req.params.id);
    await todo.deleteOne({'_id': req.params.id})
        .then(todo => res.send(todo))
        .catch(err => res.send(err));
}

//오늘 날짜인 todo 가져오기
const getTodayTodo = async (req, res) => {
    console.log("통과");
    await todo.find({'day':'2022-01-17'})
        .then(todo => res.send(todo))
        .catch(err => res.send(err));
}

//해당 할일 중요 체크하기
const updateImportantById = async (req, res) => {
    await todo.findOneAndUpdate({'_id':req.params.id}, {'important': true}) // 이거 true -> false or false-> true로 바꿔야함
        .then(todo => res.send(todo))
        .catch(err => res.send(err));
}

exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
exports.getTodayTodo = getTodayTodo;
exports.updateImportantById = updateImportantById;