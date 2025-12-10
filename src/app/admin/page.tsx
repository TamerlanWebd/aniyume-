import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const stats = await prisma.$transaction([
    prisma.anime.count(),
    prisma.episode.count(),
    prisma.user.count(),
    prisma.like.count(),
  ]);

  const [animeCount, episodeCount, userCount, likeCount] = stats;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Админ-панель AniYume
          </h1>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Вернуться на сайт
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm mb-2">Всего аниме</div>
            <div className="text-3xl font-bold text-purple-600">
              {animeCount}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm mb-2">Всего серий</div>
            <div className="text-3xl font-bold text-blue-600">
              {episodeCount}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm mb-2">Пользователей</div>
            <div className="text-3xl font-bold text-green-600">{userCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm mb-2">Лайков</div>
            <div className="text-3xl font-bold text-red-600">{likeCount}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/anime"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">📺</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Управление аниме
            </h2>
            <p className="text-gray-600">
              Добавить, редактировать или удалить аниме
            </p>
          </Link>

          <div className="bg-white rounded-lg shadow p-6 opacity-50">
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Пользователи
            </h2>
            <p className="text-gray-600">Скоро...</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 opacity-50">
            <div className="text-4xl mb-4">⚙️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Настройки</h2>
            <p className="text-gray-600">Скоро...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
