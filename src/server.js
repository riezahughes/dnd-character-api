require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./includes/resolvers');

const typeDefs = `
    type Query {
        hello(name: String): String!
    }
`;

const server = new GraphQLServer({ typeDefs, resolvers });
server.start({ port: process.env.PORT });
console.log(`Server is now running on localhost:${process.env.PORT}`);
