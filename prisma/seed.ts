import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const adminPassword = await hashPassword("admin123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@aniyume.com" },
    update: {},
    create: {
      email: "admin@aniyume.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin created:", admin.email);

  const animeData = [
    {
      title: "Attack on Titan",
      description:
        "Человечество борется за выживание против гигантских титанов",
      year: 2013,
      genres: ["Экшен", "Драма", "Фэнтези"],
      posterUrl:
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
    },
    {
      title: "Death Note",
      description: "Гениальный студент находит тетрадь смерти",
      year: 2006,
      genres: ["Триллер", "Детектив", "Психология"],
      posterUrl:
        "https://images.unsplash.com/photo-1618945524163-32451704427e?w=400",
    },
    {
      title: "Demon Slayer",
      description: "Мальчик становится охотником на демонов",
      year: 2019,
      genres: ["Экшен", "Приключения", "Фэнтези"],
      posterUrl:
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400",
    },
  ];

  for (const anime of animeData) {
    const created = await prisma.anime.create({
      data: {
        ...anime,
        episodes: {
          create: [
            {
              episodeNumber: 1,
              videoUrl:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              episodeNumber: 2,
              videoUrl:
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            },
          ],
        },
      },
    });
    console.log(`✅ Created: ${created.title}`);
  }

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
