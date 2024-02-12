import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const author1 = await prisma.author.create({
    data: {
      firstName: 'Madiha',
      lastName: 'Velasquez',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      firstName: 'Warren',
      lastName: 'Haley',
    },
  });

  const author3 = await prisma.author.create({
    data: {
      firstName: 'Chaya',
      lastName: 'Dean',
    },
  });

  await prisma.book.create({
    data: {
      title: 'Day of solaris',
      authors: {
        connect: [author1],
      },
    },
  });

  await prisma.book.create({
    data: {
      title: 'Day of solaris 2',
      authors: {
        connect: [author2, author3],
      },
    },
  });
  await prisma.book.create({
    data: {
      title: 'Day of solaris 3',
      authors: {
        connect: [author1],
      },
    },
  });

  await prisma.book.create({
    data: {
      title: 'Day of solaris 4',
      authors: {
        connect: [author2],
      },
    },
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
