const express = require('express');
const app = express();
const userRouter = require('./Routers/users-router')
const taskRouter = require('./Routers/tasks-router')
require('./db/mongoose')
const cors= require('cors')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(cors({
    origin: '*'
}))


module.exports = app