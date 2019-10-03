const Task = require('../src/models/task')
const app = require('../src/app')
const request = require('supertest')
const {userId, userOne,userTwo , setupdb} = require('./fixtures/db')

// beforEach
beforeEach(setupdb)

test('should create task for user', async () =>{
    const res = await request(app)
        .post('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            description : "Complete nodeJs course",
            completed : false
        }).expect(201)

    const task = await Task.findById(res.body._id)
    // console.log(task)
    expect(task.description).toEqual("Complete nodeJs course")
})


test('Should get all tasks for user one', async()=>{
    const res = await request(app)
        .get('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    expect(res.body.length).toBe(2)
})

test('should not allow users to delete others tasks ', async ()=>{
    const userOneTask = await Task.findOne({owner:userOne._id})
    const res = await request(app)
        .delete(`/tasks/${userOneTask._id}`)
        .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(401)

    const taskExist = await Task.findOne({owner:userOne._id})
    expect(taskExist).toEqual(userOneTask)
})

test('Should fetch only completed tasks', async()=>{
    const res = await request(app)
        .get(`/tasks?completed=true`)
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    res.body.forEach(item =>expect(item.completed).toEqual(true))
})

test('Should fetch only incomplete tasks', async()=>{
    const res = await request(app)
        .get(`/tasks?completed=false`)
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    res.body.forEach(item =>expect(item.completed).toEqual(false))
})