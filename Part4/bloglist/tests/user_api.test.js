const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
})

test('a valid user can be added', async () => {
    const validUser = {
        username: 'validUser',
        name: 'valid',
        password: 'valid'
    }

    await api
        .post('/api/users')
        .send(validUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
    expect(response.body.map(user => user.username)).toContain('validUser')
})

test('user without username is not added', async () => {
    const missingUsername = [
        {
            name: 'missingUsername',
            password: 'missingUsername'
        }
    ]

    await api
        .post('/api/users')
        .send(missingUsername)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(0)
})

test('user with username shorter than 3 characters is not added', async () => {
    const shortUsername = [
        {
            username: 'su',
            name: 'shortUsername',
            password: 'shortUsername',
        }
    ]

    await api
        .post('/api/users')
        .send(shortUsername)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(0)
})

test('user without password is not added', async () => {
    const missingPassword = [
        {
            username: 'missingPassword',
            name: 'missingPassword'
        }
    ]

    await api
        .post('/api/users')
        .send(missingPassword)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(0)
})

test('user with password shorter than 3 characters is not added', async () => {
    const shortPassword = [
        {
            username: 'shortPassword',
            name: 'shortPassword',
            password: 'sp',
        }
    ]

    await api
        .post('/api/users')
        .send(shortPassword)
        .expect(400)

    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(0)
})

afterAll(() => {
    mongoose.connection.close()
})