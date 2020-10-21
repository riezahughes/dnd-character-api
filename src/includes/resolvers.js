const resolvers = {
  Query: {
    characters: (_, args, context) => context.prisma.character.findMany(),
    races: (_, args, context) => context.prisma.race.findMany(),
    classes: (_, args, context) => context.prisma.class.findMany(),
  },
  Mutation: {
    createRace: (_, args, context) => context.prisma.race.create({
      data: {
        name: args.name,
      },
    }),
    deleteRace: (_, args, context) => context.prisma.race.delete({
      where: {
        id: args.id,
      },
    }),
  },
};

module.exports = resolvers;
