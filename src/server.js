require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./includes/resolvers');

const typeDefs = `
    type Query {
        "Just a quick hello"
        hello(name: String): String!
    }
`;

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: process.env.PORT });
console.log(`Server is now running on localhost:${process.env.PORT}`);
