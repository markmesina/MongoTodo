const router = require('express').Router();

// /api/auth
const authRoutes = require('./authRoutes');

// /api/user
const userRoutes = require('./userRoutes');

//todo
const todoRoutes = require('./todoRoutes');

router.use('/auth',authRoutes);
router.use('/user',userRoutes);
router.use('/todo',todoRoutes);


module.exports = router;