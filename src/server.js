require('dotenv').config();

const fs = require('fs');

const { ApolloServer, gql } = require('apollo-server');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const resolvers = require('./includes/resolvers');

const typeDefs = gql(fs.readFileSync(__dirname.concat('/includes/schema.graphql'), 'utf8'));

// const resolvers = {
//   Query: {
//     characters: (_, args, context) => context.prisma.characters,
//     races: (_, args, context) => context.prisma.races.findMany(),
//     classes: (_, args, context) => context.prisma.classes.findMany(),
//   },
// };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => ({
    ...context,
    prisma,
  }),
});
server.listen({ port: process.env.PORT });
console.log(`Server is now running on localhost:${process.env.PORT}`);
