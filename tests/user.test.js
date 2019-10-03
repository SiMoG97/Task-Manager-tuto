const app = require('../src/app')
const request = require('supertest')
const User = require('../src/models/user')
const {userId, userOne,userTwo,setupdb} = require('./fixtures/db')


beforeEach(setupdb)

test('Create new user',async()=>{
    await request(app).post('/users').send({
        name: "SimoHamed",
        age : 21,
        email: "achaaranimohamed@gmail.com",
        password : "Euro-pvc2014"
    }).expect(201)
})

test('Should not signup user with invalid name/email/password', async()=>{
    await request(app).post('/users').send({
        name: 'test',
        age : 21,
        email: "achaaranimohamed1@test.com",
        password : "password"
    }).expect(400)
})

test('should login existing user', async ()=>{
    const res = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password,
        // 'tokens[1].token': userOne.tokens[0].token
    }).expect(200)
    const user = await User.findById(userId)
    // console.log(user)
    expect(user.tokens[1].token).toBe(res.body.token)
})


test('should not login non-existing user', async ()=>{
    await request(app).post('/users/login').send({
        email:'notExist@test.com',
        password:'notExist12345'
    }).expect(400)
})

test('should get profile for user', async()=>{
    const res = await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unauthorized user',async()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('should delete account for authorized user', async()=>{
    const res = await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    // console.log(res.body)
    const user = await User.findById(userId)
    expect(user).toBeNull()
})
test('should not delete account for unauthorized user', async()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('should upload avatar image', async ()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should not update user if unauthenticated', async()=>{
    await request(app)
        .patch('/users/me')
        .send()
        .expect(401)
})

test('should update valid user fileds', async()=>{
    const res = await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({name:'damoh'})
    .expect(200)
    
    const user = await User.findById(userId)
    expect(user.name).toBe(res.body.name)
})

test('should not update invalid user fileds', async()=>{
    await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({location:'Agadir'})
        .expect(400)
    
})