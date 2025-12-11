import db from "@/db";

export async function getRecommendations(userId: string) {
  const userLikes = await db.like.findMany({
    where: { userId },
    include: { anime: true },
  });
  if (userLikes.length === 0) {
    return db.anime.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });
  }
  const preferredGenres = new Set<string>();
  userLikes.forEach((like) => {
    like.anime.genres.forEach((g) => preferredGenres.add(g));
  });

  const genresArray = Array.from(preferredGenres);
  const recommendations = await db.anime.findMany({
    where: {
      genres: { hasSome: genresArray },
      id: { notIn: userLikes.map((l) => l.animeId) },
    },
    take: 5,
  });

  return recommendations;
}
