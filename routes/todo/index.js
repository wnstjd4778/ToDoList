const router = require('express').Router();
const todo = require('../../schemas/todo');
const controller = require('./controller');
const passport = require('passport');

router.post('/', controller.createTodo);
router.delete('/:id', controller.deleteTodo);
router.put('/:id', controller.updateTodo);
router.get('/today', controller.getTodayTodo);
router.get('/important/:id', controller.updateImportantById);
router.get('/completed/:id', controller.updateCompletedById);
router.get('/all/:date', controller.getTodoByDay);
router.get('/kakao', passport.authenticate('kakao'));
module.exports = router;