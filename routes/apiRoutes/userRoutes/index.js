const router = require('express').Router();
const { addTodo, getAllUserEmails, getUserTodos } = require('./../../../controllers/userController');
const { requireAuth } = require('./../../../middlewares/authMiddleware');
// /api/user prepended

router.route('/todo')
    .get(requireAuth, getUserTodos)
    .post(requireAuth, addTodo);

router.get('/emails', requireAuth, getAllUserEmails);


module.exports = router;