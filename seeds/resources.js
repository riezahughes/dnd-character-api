const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const resourceListToSeed = [
  {
    name: 'Aquisitions Incorporated',
    acronym: 'AI',
  },
  {
    name: 'Baldurs Gate: Descent Into Avernis',
    acronym: 'BGDIA',
  },
  {
    name: 'Curse of Strahd',
    acronym: 'CoS',
  },
  {
    name: 'Dragons of Icespire Peak',
    acronym: 'DIP',
  },
  {
    name: 'Dungeon Masters Guide',
    acronym: ' DMG',
  },
  {
    name: 'Explorers Guide to Wildemount',
    acronym: 'EGW',
  },
  {
    name: 'Eberron: Rising of the Last War',
    acronym: 'ERLW',
  },
  {
    name: 'Essentials Kit',
    acronym: 'ESK',
  },
  {
    name: "Guildmaster's Guide to Ravnica",
    acronym: 'GRR',
  },
  {
    name: 'Ghosts of Saltmarsh',
    acronym: 'GoS',
  },
  {
    name: 'Essentials Kit',
    acronym: 'ESK',
  },
  {
    name: 'Hunt for the Thessalhydra',
    acronym: 'HotDQ',
  },
  {
    name: 'Icewind Dale: Rime of the Frostmaiden',
    acronym: 'IDRotF',
  },
  {
    name: "Krenko's Way",
    acronym: 'KKW',
  },
  {
    name: 'Lost Mine of Phandelver',
    acronym: 'LMOP',
  },
  {
    name: 'Monster Manual',
    acronym: 'MM',
  },

  {
    name: 'Mythod Odysseys of Theros',
    acronym: 'MOT',
  },
  {
    name: "Mordenkainen's Tome of Foes",
    acronym: 'MTF',
  },
  {
    name: 'The Orrery of the Wanderer',
    acronym: 'OoW',
  },
  {
    name: 'Out of the Abyss',
    acronym: 'OoTa',
  },
  {
    name: 'Players Handbook',
    acronym: 'PHB',
  },
  {
    name: 'Princes of the Apocalypse',
    acronym: 'PotA',
  },
  {
    name: 'The Lost Dungeon of Rickedness - Big Rick Energy',
    acronym: 'RMBREW',
  },
  {
    name: 'The Rise of Tiamat',
    acronym: 'RoT',
  },
  {
    name: 'Sleeping Dragons Wake',
    acronym: 'SDW',
  },
  {
    name: 'Storm Kings Thunder',
    acronym: 'STK',
  },
  {
    name: 'Storm Lords Wrath',
    acronym: 'SLW',
  },
  {
    name: 'Tales from the Yawning Portal',
    acronym: 'TftYP',
  },
  {
    name: 'Tomb of Annihilation',
    acronym: 'ToA',
  },
  {
    name: "Volo's Guide to Monsters",
    acronym: 'VGM',
  },
  {
    name: 'Waterdeep - Dragon Heist',
    acronym: 'WDH',
  },
  {
    name: 'Waterdeep - Dungeons of the Mad Mage',
    acronym: 'WDMM',
  },
  {
    name: "Xanthar's Guide to Everything",
    acronym: 'XGE',
  },
];

async function main() {
  for (const resource of resourceListToSeed) {
    await prisma.dataResource.create({
      data: {
        name: resource.name,
        acronym: resource.acronym,
      },
    });
  }
  console.log('Seeded Book Data');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
