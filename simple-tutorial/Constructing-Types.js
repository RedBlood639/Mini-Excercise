// const express = require('express')
// const { graphqlHTTP } = require('express-graphql')
// const { buildSchema } = require('graphql')

// const schema = buildSchema(`
//     type User {
//         id:String
//         name:String
//     }

//     type Query {
//         user(id: String) : User
//     }
// `)

// const fakeDatabase = {
//   a: {
//     id: 'a',
//     name: 'alice',
//   },
//   b: {
//     id: 'b',
//     name: 'bob',
//   },
// }

// const root = {
//   user: ({ id }) => {
//     return fakeDatabase[id]
//   },
// }

// const app = express()

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
//   }),
// )

// app.listen(400, () => {
//   console.log('Running a GraphQL API server at localhost:4000/graphql')
// })
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const graphql = require('graphql')

const fakeDatabase = {
  a: {
    id: 'a',
    name: 'alice',
  },
  b: {
    id: 'b',
    name: 'bob',
  },
}

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  },
})

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: (_, { id }) => {
        return fakeDatabase[id]
      },
    },
  },
})
const schema = new graphql.GraphQLSchema({ query: queryType })

const app = express()
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
)
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
