const { forEach, zipObject, reduce } = require('lodash')
const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    if (!blogs.length) {
        return 0
    } else {
        const likes = blogs.map(blog => blog.likes)
        const sumReducer = (sumOfLikes, currentLikes) => sumOfLikes + currentLikes
        const totalLikes = likes.reduce(sumReducer)
        return totalLikes
    }
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    return blogs[likes.indexOf(Math.max(...likes))]
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const result = _(authors).countBy().toPairs().maxBy(_.last)
    return { author: result[0], blogs: result[1] }
}

const mostLikes = (blogs) => {
    const authorLikes = _(blogs)
        .groupBy('author')
        .map((likes, author) => ({
            'author': author,
            'likes': _.sumBy(likes, 'likes')
        }))
        .value()
        
    return _.maxBy(authorLikes, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}