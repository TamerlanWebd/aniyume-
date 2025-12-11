import db from "@/db";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminEpisodesList() {
  const episodes = await db.episode.findMany({
    include: { anime: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Управление Эпизодами</h1>
        <Link
          href="/dashboard/episodes/new"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
        >
          + Добавить Эпизод
        </Link>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-gray-400">
            <tr>
              <th className="p-4">Аниме</th>
              <th className="p-4">Номер</th>
              <th className="p-4">Название серии</th>
              <th className="p-4">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {episodes.map((ep) => (
              <tr key={ep.id} className="hover:bg-gray-750">
                <td className="p-4 font-medium">{ep.anime.title}</td>
                <td className="p-4 text-gray-400">#{ep.number}</td>
                <td className="p-4">{ep.title}</td>
                <td className="p-4">
                  <button className="text-red-400 hover:text-red-300 text-sm">
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
