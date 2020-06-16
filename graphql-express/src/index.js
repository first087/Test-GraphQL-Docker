const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

const app = express()

const schema = buildSchema(`
  type Query {
    hello: String
    world: String
  }
`);

const resolver = {
  hello: () => 'Hi!',
  world: () => 'Yo!!!',
}

app
  .use('/', graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
  }))
  .listen(3000)
