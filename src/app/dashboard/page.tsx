import db from "@/db";

export default async function DashboardHome() {
  const animeCount = await db.anime.count();
  const episodeCount = await db.episode.count();
  const userCount = await db.user.count();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Обзор</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 mb-2">Всего аниме</h3>
          <p className="text-4xl font-bold text-purple-400">{animeCount}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 mb-2">Всего эпизодов</h3>
          <p className="text-4xl font-bold text-blue-400">{episodeCount}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 mb-2">Пользователей</h3>
          <p className="text-4xl font-bold text-green-400">{userCount}</p>
        </div>
      </div>
    </div>
  );
}
