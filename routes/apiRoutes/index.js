const router = require('express').Router();

//auth
const authRoutes = require('./authRoutes');

//user
// const userRoutes = require('./userRoutes');

//todo
// const todosRoutes = require('./todosRoutes');

router.use('/auth',authRoutes);
// router.use('/user',userRoutes);
// router.use('/todos',todosRoutes);


module.exports = router;