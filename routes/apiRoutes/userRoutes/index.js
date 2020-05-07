const router = require('express').Router();
const { addTodo } = require('./../../../controllers/userController')
// /api/user prepended

router.route('/todos')
    .post(addTodo);

module.exports = router;