const express = require('express');
const mongoose = require('mongoose');


const routes = require('./routes');
const PORT = process.env.PORT || 3001;


const app = express();

//setup middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//setup routes
app.use('/', routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo_db', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));