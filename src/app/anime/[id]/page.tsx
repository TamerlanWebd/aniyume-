import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AnimePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ episode?: string }>;
}) {
  const { id } = await params;
  const { episode: episodeNum } = await searchParams;

  const anime = await prisma.anime.findUnique({
    where: { id: parseInt(id) },
    include: {
      episodes: {
        orderBy: { episodeNumber: "asc" },
      },
      _count: { select: { likes: true } },
    },
  });

  if (!anime) {
    notFound();
  }

  // Определяем текущую серию (из URL или первую)
  const currentEpisodeNum = episodeNum
    ? parseInt(episodeNum)
    : anime.episodes[0]?.episodeNumber || 1;
  const currentEpisode = anime.episodes.find(
    (ep) => ep.episodeNumber === currentEpisodeNum
  );

  // Увеличиваем счётчик просмотров
  if (currentEpisode) {
    await prisma.episode.update({
      where: { id: currentEpisode.id },
      data: { viewCount: { increment: 1 } },
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хедер */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            AniYume
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-purple-600">
              Популярное
            </Link>
            <Link
              href="/catalog"
              className="text-gray-700 hover:text-purple-600"
            >
              Каталог
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-purple-600">
              Войти
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Видеоплеер */}
        {currentEpisode && (
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-8">
            <div className="p-4 bg-gray-800 border-b border-gray-700">
              <h1 className="text-xl font-bold text-white">
                {anime.title} - Серия {currentEpisode.episodeNumber}
              </h1>
            </div>

            <div className="aspect-video bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full"
                src={currentEpisode.videoUrl}
                key={currentEpisode.id}
              >
                Ваш браузер не поддерживает видео
              </video>
            </div>
          </div>
        )}

        {/* Список серий */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Серии ({anime.episodes.length})
          </h2>

          {anime.episodes.length > 0 ? (
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {anime.episodes.map((episode) => (
                <Link
                  key={episode.id}
                  href={`/anime/${anime.id}?episode=${episode.episodeNumber}`}
                  className={`
                    p-3 rounded text-center font-semibold transition
                    ${
                      episode.id === currentEpisode?.id
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-purple-100"
                    }
                  `}
                >
                  {episode.episodeNumber}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Серии пока не добавлены
            </div>
          )}
        </div>

        {/* Информация об аниме */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="md:flex">
            {/* Постер */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="aspect-[3/4] bg-gray-200">
                {anime.posterUrl ? (
                  <img
                    src={anime.posterUrl}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>

            {/* Информация */}
            <div className="md:w-2/3 lg:w-3/4 p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">О аниме</h2>

              <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded">
                  {anime.year}
                </span>
                <span>❤️ {anime._count.likes} лайков</span>
                <span>👁️ {anime.viewCount} просмотров</span>
              </div>

              {/* Жанры */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Жанры:</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Описание */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Описание:</h3>
                <p className="text-gray-700 leading-relaxed">
                  {anime.description}
                </p>
              </div>

              {/* Кнопки действий */}
              <div className="flex space-x-4">
                <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
                  ❤️ Добавить в избранное
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50 transition">
                  📋 В закладки
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
