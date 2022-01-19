const router = require('express').Router();
const todo = require('../../schemas/todo');
const controller = require('./controller');
const {verifyToken} = require('../../middlewares/authorization');


router.post('/', verifyToken, controller.createTodo);
router.delete('/:id', verifyToken, controller.deleteTodo);
router.put('/:id', verifyToken, controller.updateTodo);
router.get('/today', verifyToken, controller.getTodayTodo);
router.get('/important/:id', verifyToken, controller.updateImportantById);
router.get('/completed/:id', verifyToken, controller.updateCompletedById);
router.get('/all', verifyToken, controller.getTodoByDay);
router.get('/important', verifyToken, controller.getImportantTodo);
router.get('/month', verifyToken, controller.getTodoCountByMonth);


module.exports = router;