const router = require('express').Router();

const { signup } = require('./../../../controllers/authController');
// /api/auth/signup
router.post('signup', signup);


module.exports = router;