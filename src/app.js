const express = require('express');
const app = express();
const userRouter = require('./Routers/users-router')
const taskRouter = require('./Routers/tasks-router')
require('./db/mongoose')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app