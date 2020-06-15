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

const rootValue = {
  hello: () => 'Hi!',
  world: () => 'Yo!!!',
}

app
  .use('/', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }))
  .listen(3000)
