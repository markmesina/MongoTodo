const router = require('express').Router();
const { addTodo, getAllUserEmails, getUserTodos, deleteUserTodoById } = require('./../../../controllers/userController');
const { requireAuth } = require('./../../../middlewares/authMiddleware');
// /api/user prepended

router.route('/todo')
    .get(requireAuth, getUserTodos)
    .post(requireAuth, addTodo);

router.get('/emails', requireAuth, getAllUserEmails);

router.route('/todo/:todoId')
  .delete(requireAuth, deleteUserTodoById);


module.exports = router;