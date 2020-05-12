const router = require('express').Router();

const { getTodos } = require('./../../../controllers/todoController');

// api/todo prepeded on every single route declared on this route
router.route('/')
    .get(getTodos);

module.exports = router;
