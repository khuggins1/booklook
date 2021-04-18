const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

const server = new ApolloServer ({
  typeDefs,
  resovers,
  context: authMiddleware
});

server.applyMiddleware ({ app });

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}!`));
  console.log('Use GraphQL at http://localhost:${PORT}$(server.graphqlPath}');
}); 
