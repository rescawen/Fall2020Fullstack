const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const { v1: uuid } = require('uuid')
const book = require('./models/book')

const MONGODB_URI = 'mongodb+srv://phonebook:fullstackphonebook@cluster0.lzmmj.mongodb.net/books?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
    Query: {
        authorCount: () => Author.collection.countDocuments(),
        bookCount: () => Book.collection.countDocuments(),
        allBooks: () => Book.find({}).populate('author', { name: 1, born: 1 }),
        allBooks: (root, args) => {
          if (args.genre) {
            return Book.find({ genres: {$in: args.genre }}).populate('author', { name: 1, born: 1 })
          }
          return Book.find({}).populate('author', { name: 1, born: 1 })
        },
        allAuthors: () => Author.find({})
    },
    Author: {
        bookCount: async (root) => {
            const bookCount = await Book.find({ author: root.id })
            return bookCount.length
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            let authorExists = await Author.findOne({ name: args.author })
            if (authorExists === null) {
                const author = new Author({ name: args.author, born: null })
                authorExists = await author.save()
            }
            const book = new Book({ ...args, author: authorExists })
            return book.save()
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            return author.save()
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})