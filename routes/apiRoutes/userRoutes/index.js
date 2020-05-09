const router = require('express').Router();
const { addTodo, getAllUserEmails } = require('./../../../controllers/userController');
const { requireAuth } = require('./../../../middlewares/authMiddleware');
// /api/user prepended

router.route('/todos')
    .post(requireAuth, addTodo);

router.get('/emails', requireAuth, getAllUserEmails);


module.exports = router;