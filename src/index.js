const express = require('express');
const app = express();
const port = process.env.PORT
const userRouter = require('./Routers/users-router')
const taskRouter = require('./Routers/tasks-router')

require('./db/mongoose')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>console.log(`Server running on ${port}`))
