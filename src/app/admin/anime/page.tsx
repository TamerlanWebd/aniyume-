import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteAnimeButton from "@/components/admin/DeleteAnimeButton";

export default async function AdminAnimePage() {
  const animeList = await prisma.anime.findMany({
    include: {
      _count: { select: { episodes: true, likes: true } },
    },
    orderBy: { id: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Управление аниме</h1>
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/anime/create"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              + Добавить аниме
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              Назад
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Название
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Год
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Серий
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Лайков
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {animeList.map((anime) => (
                <tr key={anime.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {anime.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {anime.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {anime.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {anime._count.episodes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {anime._count.likes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <Link
                      href={`/admin/anime/${anime.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Редактировать
                    </Link>
                    <Link
                      href={`/admin/anime/${anime.id}/episodes`}
                      className="text-green-600 hover:text-green-900"
                    >
                      Серии
                    </Link>
                    <DeleteAnimeButton animeId={anime.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
