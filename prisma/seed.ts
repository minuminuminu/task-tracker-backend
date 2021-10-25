import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 5,
        name: 'Minu die Ente',
        imageLink: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png'
      },
      {
        id: 6,
        name: 'Max Coachi',
        imageLink: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png'
      },
      {
        id: 7,
        name: 'Oki doki',
        imageLink: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png'
      }
    ]
  });

  await prisma.task.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 1,
        title: 'Take out the trash',
        description: 'Mum wants you to take ou the trash, its important',
        due: '5pm',
        profileId: 5
      },
      {
        id: 2,
        title: 'Finish PokeAPI',
        description: 'One of the coolest projects you can do',
        due: 'Saturday',
        profileId: 5
      },
      {
        id: 3,
        title: 'Complete the Valorant daily missions',
        description: 'Self explanatory',
        due: 'Today',
        profileId: 6
      },
      {
        id: 4,
        title: 'Remember the song',
        description: 'Oki doki yoo',
        due: 'Wednesday',
        profileId: 7
      }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
