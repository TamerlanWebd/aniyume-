import db from "@/db";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0;

export default async function AdminAnimeList() {
  const animes = await db.anime.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Управление Аниме</h1>
        <Link
          href="/dashboard/anime/new"
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition"
        >
          + Добавить Аниме
        </Link>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-gray-400">
            <tr>
              <th className="p-4">Обложка</th>
              <th className="p-4">Название</th>
              <th className="p-4">Год</th>
              <th className="p-4">Жанры</th>
              <th className="p-4">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {animes.map((anime) => (
              <tr key={anime.id} className="hover:bg-gray-750">
                <td className="p-4">
                  <div className="relative w-12 h-16 bg-gray-700 rounded overflow-hidden">
                    <Image
                      src={anime.coverImage}
                      alt={anime.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="p-4 font-medium">{anime.title}</td>
                <td className="p-4 text-gray-400">{anime.year}</td>
                <td className="p-4 text-gray-400 text-sm">
                  {anime.genres.join(", ")}
                </td>
                <td className="p-4">
                  <button className="text-red-400 hover:text-red-300 text-sm">
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {animes.length === 0 && (
          <div className="p-8 text-center text-gray-500">Список пуст</div>
        )}
      </div>
    </div>
  );
}
