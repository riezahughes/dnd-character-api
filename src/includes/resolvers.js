const resolvers = {
  Query: {
    // singles
    character: (_, args, context) => context.prisma.character.findOne({ where: { id: args.id } }),
    race: (_, args, context) => context.prisma.race.findOne({ where: { id: args.id } }),
    class: (_, args, context) => context.prisma.class.findOne({ where: { id: args.id } }),
    dataresource: (_, args, context) => context.prisma.dataresource.findOne({ where: { id: args.id } }),
    proficiency: (_, args, context) => context.prisma.proficiency.findOne({ where: { id: args.id } }),
    equipmentsingle: (_, args, context) => context.prisma.equipment.findOne({ where: { id: args.id } }),
    skill: (_, args, context) => context.prisma.skill.findOne({ where: { id: args.id } }),
    condition: (_, args, context) => context.prisma.condition.findOne({ where: { id: args.id } }),
    background: (_, args, context) => context.prisma.background.findOne({ where: { id: args.id } }),
    language: (_, args, context) => context.prisma.language.findOne({ where: { id: args.id } }),
    feat: (_, args, context) => context.prisma.feat.findOne({ where: { id: args.id } }),
    spell: (_, args, context) => context.prisma.spell.findOne({ where: { id: args.id } }),
    spellschool: (_, args, context) => context.prisma.spellschool.findOne({ where: { id: args.id } }),
    psyonic: (_, args, context) => context.prisma.psyonic.findOne({ where: { id: args.id } }),
    deity: (_, args, context) => context.prisma.deity.findOne({ where: { id: args.id } }),
    supernaturalpassive: (_, args, context) => context.prisma.supernaturalpassive.findOne({ where: { id: args.id } }),
    vehicle: (_, args, context) => context.prisma.vehicle.findOne({ where: { id: args.id } }),

    // manys
    characters: (_, args, context) => context.prisma.character.findMany(),
    races: (_, args, context) => context.prisma.race.findMany(),
    classes: (_, args, context) => context.prisma.class.findMany(),
    dataresources: (_, args, context) => context.prisma.dataResource.findMany(),
    proficiencies: (_, args, context) => context.prisma.proficiency.findMany(),
    equipmentmany: (_, args, context) => context.prisma.equipment.findMany(),
    skills: (_, args, context) => context.prisma.skill.findMany(),
    conditions: (_, args, context) => context.prisma.condition.findMany(),
    backgrounds: (_, args, context) => context.prisma.background.findMany(),
    languages: (_, args, context) => context.prisma.language.findMany(),
    feats: (_, args, context) => context.prisma.feat.findMany(),
    spells: (_, args, context) => context.prisma.spell.findMany(),
    spellschools: (_, args, context) => context.prisma.spellschool.findMany(),
    psyonics: (_, args, context) => context.prisma.psyonic.findMany(),
    deities: (_, args, context) => context.prisma.deity.findMany(),
    supernaturalpassives: (_, args, context) => context.prisma.supernaturalpassive.findMany(),
    vehicles: (_, args, context) => context.prisma.vehicle.findMany(),
  },
  Mutation: {
    createRace: (_, args, context) => context.prisma.race.create({
      data: {
        unique_id: args.unique_id,
        name: args.name,
        speed: args.speed,
        size: args.size,
        traits: {
          create: {
            name: args.traits.name,
            description: args.traits.description,
          },
        },
      },
    }),
    updateRace: (_, args, context) => context.prisma.race.update({
      data: {
        name: args.name,
        traits: args.traits,
      },
      where: {
        id: args.id,
      },
    }),
    deleteRace: (_, args, context) => context.prisma.race.delete({
      where: {
        id: args.id,
      },
    }),
    createClass: (_, args, context) => context.prisma.class.create({
      data: {
        name: args.name,
        hitdice: args.hitdice,
        hpfirstlevel: args.hpfirstlevel,
        hpperlevel: args.hpperlevel,
        hpperlevel_roll: args.hpperlevel_roll,
        proficiencies: args.proficiencies,
        classfeatures: args.classfeatures,
        classresources: args.classresources,
      },
    }),
    updateClass: (_, args, context) => context.prisma.class.update({
      data: {
        name: args.name,
        hitdice: args.hitdice,
        hpfirstlevel: args.hpfirstlevel,
        hpperlevel: args.hpperlevel,
        hpperlevel_roll: args.hpperlevel_roll,
        proficiencies: args.proficiencies,
        classfeatures: args.classfeatures,
        classresources: args.classresources,
      },
      where: {
        id: args.id,
      },
    }),
    deleteClass: (_, args, context) => context.prisma.class.delete({
      where: {
        id: args.id,
      },
    }),
    createDataResource: (_, args, context) => context.prisma.dataResource.create({
      data: {
        name: args.name,
      },
    }),
    updateDataResource: (_, args, context) => context.prisma.dataResource.update({
      data: {
        name: args.name,
        acronym: args.traits,
      },
      where: {
        id: args.id,
      },
    }),
    deleteDataResource: (_, args, context) => context.prisma.dataResource.delete({
      where: {
        id: args.id,
      },
    }),
    createLanguage: (_, args, context) => context.prisma.language.create({
      data: {
        name: args.name,
        type: args.type,
        script: args.script,
        source: args.source,
      },
    }),
    updateLanguage: (_, args, context) => context.prisma.language.update({
      data: {
        name: args.name,
        type: args.type,
        script: args.script,
        source: args.source,
      },
      where: {
        id: args.id,
      },
    }),
    deleteLanguage: (_, args, context) => context.prisma.language.delete({
      where: {
        id: args.id,
      },
    }),
    createFeat: (_, args, context) => context.prisma.feat.create({
      data: {
        name: args.name,
        ability: args.ability,
        prerequisite: args.prerequisite,
        description: args.description,
        source: args.source,
      },
    }),
    updateFeat: (_, args, context) => context.prisma.feat.update({
      data: {
        name: args.name,
        ability: args.ability,
        prerequisite: args.prerequisite,
        description: args.description,
        source: args.source,
      },
      where: {
        id: args.id,
      },
    }),
    deleteFeat: (_, args, context) => context.prisma.feat.delete({
      where: {
        id: args.id,
      },
    }),
    createSpell: (_, args, context) => context.prisma.spell.create({
      data: {
        name: args.name,
        level: args.level,
        time: args.time,
        school: args.school,
        concentration: args.concentration,
        class: args.class,
        source: args.dataResource,
      },
    }),
    updateSpell: (_, args, context) => context.prisma.spell.update({
      data: {
        name: args.name,
        level: args.level,
        time: args.time,
        school: args.school,
        concentration: args.concentration,
        class: args.class,
        source: args.dataResource,
      },
      where: {
        id: args.id,
      },
    }),
    deleteSpell: (_, args, context) => context.prisma.spell.delete({
      where: {
        id: args.id,
      },
    }),
    createSpellSchool: (_, args, context) => context.prisma.spellschool.create({
      data: {
        name: args.name,
        summary: args.summary,
        description: args.description,
      },
    }),
    updateSpellSchool: (_, args, context) => context.prisma.spellschool.update({
      data: {
        name: args.name,
        summary: args.summary,
        description: args.description,
      },
      where: {
        id: args.is,
      },
    }),
    deleteSpellSchool: (_, args, context) => context.prisma.spellschool.delete({
      where: {
        id: args.id,
      },
    }),
    createPsyonic: (_, args, context) => context.prisma.psyonic.create({
      data: {
        name: args.name,
        type: args.type,
        order: args.order,
        description: args.description,
        source: args.dataResource,
      },
    }),
    updatePsyonic: (_, args, context) => context.prisma.psyonic.update({
      data: {
        name: args.name,
        type: args.type,
        order: args.order,
        description: args.description,
        source: args.dataResource,
      },
      where: {
        id: args.id,
      },
    }),
    deletePsyonic: (_, args, context) => context.prisma.psyonic.delete({
      where: {
        id: args.id,
      },
    }),
    createDeity: (_, args, context) => context.prisma.deity.create({
      data: {
        name: args.name,
        alignment: args.alignment,
        domains: args.domains,
        pantheon: args.pantheon,
        province: args.province,
        symbol: args.symbol,
        description: args.description,
      },
    }),
    updateDeity: (_, args, context) => context.prisma.deity.update({
      data: {
        name: args.name,
        alignment: args.alignment,
        domains: args.domains,
        pantheon: args.pantheon,
        province: args.province,
        symbol: args.symbol,
        description: args.description,
      },
      where: {
        id: args.id,
      },
    }),
    deleteDeity: (_, args, context) => context.prisma.deity.delete({
      where: {
        id: args.id,
      },
    }),
    createSupernaturalPassive: (_, args, context) => context.prisma.supernaturalPassive.create({
      data: {
        name: args.name,
        type: args.type,
        description: args.description,
        source: args.source,
      },
    }),
    updateSupernaturalPassive: (_, args, context) => context.prisma.supernaturalPassive.update({
      data: {
        name: args.name,
        type: args.type,
        description: args.description,
        source: args.source,
      },
      where: {
        id: args.id,
      },
    }),
    deleteSupernaturalPassive: (_, args, context) => context.prisma.supernaturalPassive.delete({
      where: {
        id: args.id,
      },
    }),
    createProficiency: (_, args, context) => context.prisma.proficiency.create({
      data: {
        name: args.name,
        bonus: args.bonus,
        attribute: args.attribute,
        modifier: args.modifier,
        type: args.type,
      },
    }),
    updateProficiency: (_, args, context) => context.prisma.proficiency.update({
      data: {
        name: args.name,
        bonus: args.bonus,
        attribute: args.attribute,
        modifier: args.modifier,
        type: args.type,
      },
      where: {
        id: args.id,
      },
    }),
    deleteProficiency: (_, args, context) => context.prisma.proficiency.delete({
      where: {
        id: args.id,
      },
    }),
    createTrait: (_, args, context) => context.prisma.trait.create({
      data: {
        name: args.name,
        description: args.description,
        class: args.class,
        level: args.level,
      },
    }),
    updateTrait: (_, args, context) => context.prisma.trait.update({
      data: {
        name: args.name,
        description: args.description,
        class: args.class,
        level: args.level,
      },
      where: {
        id: args.id,
      },
    }),
    deleteTrait: (_, args, context) => context.prisma.trait.delete({
      where: {
        id: args.id,
      },
    }),
    createVehicle: (_, args, context) => context.prisma.vehicle.create({
      data: {
        name: args.name,
        type: args.type,
        size: args.size,
        sizedimentions: args.sizedimentions,
        creaturecapacity: args.creaturecapacity,
        cargocapacity: args.cargocapacity,
        travelpace: args.travelpace,
        speed: args.speed,
        strength: args.strength,
        strengthmod: args.strengthmod,
        dexterity: args.dexterity,
        dexteritymod: args.dexteritymod,
        constitution: args.constitution,
        constitutionmod: args.constitutionmod,
        intelligence: args.intelligence,
        intelligencemod: args.intelligencemod,
        wisdom: args.wisdom,
        wisdommod: args.wisdommod,
        charisma: args.charisma,
        charismamod: args.charismamod,
        damageimmunities: args.damageimmunities,
        conditionimmunities: args.conditionimmunities,
        source: args.source,
      },
    }),
    updateVehicle: (_, args, context) => context.prisma.vehicle.update({
      data: {
        name: args.name,
        type: args.type,
        size: args.size,
        sizedimentions: args.sizedimentions,
        creaturecapacity: args.creaturecapacity,
        cargocapacity: args.cargocapacity,
        travelpace: args.travelpace,
        speed: args.speed,
        strength: args.strength,
        strengthmod: args.strengthmod,
        dexterity: args.dexterity,
        dexteritymod: args.dexteritymod,
        constitution: args.constitution,
        constitutionmod: args.constitutionmod,
        intelligence: args.intelligence,
        intelligencemod: args.intelligencemod,
        wisdom: args.wisdom,
        wisdommod: args.wisdommod,
        charisma: args.charisma,
        charismamod: args.charismamod,
        damageimmunities: args.damageimmunities,
        conditionimmunities: args.conditionimmunities,
        source: args.source,
      },
      where: {
        id: args.id,
      },
    }),
    deleteVehicle: (_, args, context) => context.prisma.vehicle.delete({
      where: {
        id: args.id,
      },
    }),
    createVehicleAction: (_, args, context) => context.prisma.vehiceleaction.create({
      data: {
        vehicle: args.vehicle,
        name: args.name,
        description: args.description,
      },
    }),
    updateVehicleAction: (_, args, context) => context.prisma.vehiceleaction.update({
      data: {
        vehicle: args.vehicle,
        name: args.name,
        description: args.description,
      },
      where: {
        id: args.id,
      },
    }),
    deleteVehicleAction: (_, args, context) => context.prisma.vehiceleaction.delete({
      where: {
        id: args.id,
      },
    }),
  },
};

module.exports = resolvers;
