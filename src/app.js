const express = require('express');
const app = express();
const userRouter = require('./Routers/users-router')
const taskRouter = require('./Routers/tasks-router')
const cors = require('cors')
require('./db/mongoose')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.options('*',cors())

module.exports = app