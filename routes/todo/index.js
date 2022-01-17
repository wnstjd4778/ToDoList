const router = require('express').Router();
const todo = require('../../schemas/todo');
const controller = require('./controller');


router.post('/', controller.createTodo);
router.delete('/:id', controller.deleteTodo);
router.put('/:id', controller.updateTodo);
router.get('/today', controller.getTodayTodo);
router.get('/important/:id', controller.updateImportantById);
module.exports = router;