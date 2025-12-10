import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddEpisodeForm from "@/components/admin/AddEpisodeForm";
import DeleteEpisodeButton from "@/components/admin/DeleteEpisodeButton";

export default async function EpisodesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const anime = await prisma.anime.findUnique({
    where: { id: parseInt(id) },
    include: {
      episodes: {
        orderBy: { episodeNumber: "asc" },
      },
    },
  });

  if (!anime) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Серии: {anime.title}
          </h1>
          <Link
            href="/admin/anime"
            className="text-gray-600 hover:text-gray-900"
          >
            Назад
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Форма добавления серии */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Добавить серию
          </h2>
          <AddEpisodeForm animeId={anime.id} />
        </div>

        {/* Список серий */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Все серии ({anime.episodes.length})
            </h2>
          </div>

          {anime.episodes.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Серия
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    URL видео
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Просмотры
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {anime.episodes.map((episode) => (
                  <tr key={episode.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Серия {episode.episodeNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                      {episode.videoUrl}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {episode.viewCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <DeleteEpisodeButton episodeId={episode.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-gray-500">
              Серии ещё не добавлены
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
