const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

const users = require('./database/user.json')

const app = express()

const schema = buildSchema(`
  type Query {
    hello: String
    world: String
    users(id: ID): [User]
  }

  type User {
    firstName: String
    lastName: String
  }
`)

const resolver = {
  hello: () => 'Hi!',
  world: () => 'Yo!',
  users: ({ id }) => {
    return Promise.resolve(
      users
        .filter(user => (id == null) ? true : user.id == id)
        .map(user => {
          return {
            firstName: user.name.first,
            lastName: user.name.last
          }
        })
    )
  }
}

app
  .use('/', graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
  }))
  .listen(3000)
