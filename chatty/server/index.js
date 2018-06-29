import { Resolvers } from './data/resolvers';
import jwt from 'express-jwt';
import { JWT_SECRET } from './config';
import { User } from './data/connectors';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { Schema } from './data/schema';
import { executableSchema } from './data/schema';
import { Mocks } from './data/mocks';


const GRAPHQL_PORT = 8080;
const PORT = 8080;
const GRAPHQL_PATH = '/graphql';
const SUBSCRIPTIONS_PATH = '/subscriptions';

const app = express()
const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});


//addMockFunctionsToSchema({
  //schema: executableSchema,
  //mocks: Mocks,
  //preserveResolvers: true,
//});
// `context` must be an object and can't be undefined when using connectors

app.use('/graphql', bodyParser.json(), jwt({
  secret: JWT_SECRET,
  credentialsRequired: false,
}), graphqlExpress(req => ({


app.use('/graphql', bodyParser.json(), graphqlExpress({
endpointURL: GRAPHQL_PATH,
  subscriptionsEndpoint: `ws://localhost:${GRAPHQL_PORT}${SUBSCRIPTIONS_PATH}`,
graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}${GRAPHQL_PATH}`);
  console.log(`GraphQL Subscriptions are now running on ws://localhost:${GRAPHQL_PORT}${SUBSCRIPTIONS_PATH}`);
});


// eslint-disable-next-line no-unused-vars
const subscriptionServer = SubscriptionServer.create({
  schema: executableSchema,
 schema: executableSchema,
  context: {
    user: req.user ?
      User.findOne({ where: { id: req.user.id } }) : Promise.resolve(null),
  },
})));



  execute,
  subscribe,
}, {
  server: graphQLServer,
  path: SUBSCRIPTIONS_PATH,
});



  schema: executableSchema,
  context: {}, // at least(!) an empty object
}));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
const graphQLServer = createServer(app);
graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`));;
