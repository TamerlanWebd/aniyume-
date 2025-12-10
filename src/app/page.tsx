import db from "@/db";
import AnimeCard from "@/components/AnimeCard";

export const revalidate = 60;

export default async function Home() {
  const animes = await db.anime.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <header className="mb-10 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AniYume
        </h1>
        <nav className="space-x-4">
          <a
            href="/dashboard"
            className="text-gray-300 hover:text-white transition"
          >
            Dashboard
          </a>
        </nav>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-6">Недавние релизы</h2>
        {animes.length === 0 ? (
          <p className="text-gray-500">
            Аниме пока нет. Добавьте их через админку.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {animes.map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                coverImage={anime.coverImage}
                year={anime.year}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
