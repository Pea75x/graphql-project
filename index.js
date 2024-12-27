const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()

const authors = [
  { id: 1, name: "bill" },
  { id: 2, name: "ben" }
]

const books = [
  { id: 1, name: "bills book", authorId: 1 },
  { id: 2, name: "bens book", authorId: 2 },
  { id: 3, name: "bills second book", authorId: 1 }
]

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "HelloWorld",
//     fields: () => ({
//       message: { 
//         type: GraphQLString,
//         resolve: () => 'Hello World'
//         // function that tells graphql where to get the information from
//       }
//     })
//   })
// })
const BookType = new GraphQLObjectType({
  name: "book",
  description: "i have no idea whats going on",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: "Query", 
  description: 'Root Query',
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of books",
      resolve: () => books
    }
  })
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
// graphiql:true gives us userface without having to use postman

app.listen(5000., () => console.log("server running"))
