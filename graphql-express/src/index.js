const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

const users = require('./database/user.json')

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
  user: () => {
    const { first: firstName, last: lastName } = users[0].name

    return Promise.resolve({ firstName, lastName })
  }
}

app
  .use('/', graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
  }))
  .listen(3000)
