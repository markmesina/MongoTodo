const router = require('express').Router();
const { signup, signin } = require('./../../../controllers/authController');
const { requireSignIn } = require('./../../../middlewares/authMiddleware');
// /api/auth/signup
router.post('/signup', signup);
router.post('/signin', requireSignIn, signin);
module.exports = router;