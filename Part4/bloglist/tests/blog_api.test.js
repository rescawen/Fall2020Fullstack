const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'String',
        author: 'String',
        url: 'String',
        likes: 1
    },
    {
        title: 'String2',
        author: 'String2',
        url: 'String2',
        likes: 2
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('correct number of blogs in JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('title-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the unique identifier property of blogs is named id', async () => {
    const response = await api.get('/api/blogs')
    const identifiers = response.body.map(blog => blog.id)
    expect(identifiers).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'testnewblog',
        author: 'author',
        url: 'http..',
        likes: 3
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('title-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(response.body.map(blog => blog.title)).toContain('testnewblog')
})

test('if likes is missing, it will default to 0', async () => {
    const newBlog = {
        title: 'missingLikes',
        author: 'author',
        url: 'http..missing'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('title-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(response.body.map(blog => blog.title)).toContain('missingLikes')
    expect(response.body.map(blog => blog.likes)).toContain(0)
})

test('blog without title and url is not added', async () => {
    const newBlog = {
        author: 'missingTitleURL'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})


// currently working but badly done, also messing up some of the tests above
// possibly implement blog test helper to solve problem
// test('deletion of a single blog', async () => {
//     const blogsAtStart = await api.get('/api/blogs')
//     const idList = blogsAtStart.body.map(blog => blog.id)

//     await api
//         .delete(`/api/blogs/${idList[0]}`)
//         .expect(204)

//     const blogsAtEnd = await api.get('/api/blogs')

//     expect(blogsAtEnd.body).toHaveLength(
//         initialBlogs.length - 1
//     )

//     expect(blogsAtEnd.body.map(blog => blog.id)).not.toContain(idList[0])
// })


afterAll(() => {
    mongoose.connection.close()
})