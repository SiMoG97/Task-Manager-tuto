const User = require('../../src/models/user')
const Task = require('../../src/models/task')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userId = mongoose.Types.ObjectId()
const userOne = {
    _id:userId,
    name:"SimoHamed",
    age:21,
    email:"simo@example.com",
    password:"simo123",
    tokens:[
        {
            token:jwt.sign({_id:userId},process.env.JWT_SECRET)
        }
    ]
}
const user2Id = mongoose.Types.ObjectId()
const userTwo = {
    _id:user2Id,
    name:"Simo",
    age:21,
    email:"simo2@example.com",
    password:"simo123",
    tokens:[
        {
            token:jwt.sign({_id:user2Id},process.env.JWT_SECRET)
        }
    ]
}


const taskOne = {
    _id: mongoose.Types.ObjectId(),
    description: "Task1",
    completed: false,
    owner: userId 
}
const taskTwo = {
    _id: mongoose.Types.ObjectId(),
    description: "Task2",
    completed: true,
    owner: userId 
}
const taskThree = {
    _id: mongoose.Types.ObjectId(),
    description: "Task3",
    completed: false,
    owner: user2Id 
}
const taskfour = {
    _id: mongoose.Types.ObjectId(),
    description: "Task4",
    completed: true,
    owner: user2Id 
}


const setupdb = async ()=>{
    await Task.deleteMany()
    await User.deleteMany()
    await new User(userOne).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
    await new Task(taskfour).save()
}

module.exports = {
    userId,
    userOne,
    userTwo,
    setupdb
}