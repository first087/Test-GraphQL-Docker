const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

const app = express()

const schema = buildSchema(`
  type Query {
    hello: String
    world: String
    user: User
  }

  type User {
    firstName: String
    lastName: String
  }
`);

const resolver = {
  hello: () => 'Hi!',
  world: () => 'Yo!',
  user: () => ({ firstName: 'Ethan', lastName: 'Hunt' })
}

app
  .use('/', graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
  }))
  .listen(3000)
