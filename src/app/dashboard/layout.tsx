import Link from "next/link";
import {
  HomeIcon,
  FilmIcon,
  VideoCameraIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-purple-500">AniYume Admin</h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <HomeIcon className="w-6 h-6" />
            <span>Главная</span>
          </Link>
          <Link
            href="/dashboard/anime"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FilmIcon className="w-6 h-6" />
            <span>Аниме</span>
          </Link>
          <Link
            href="/dashboard/episodes"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <VideoCameraIcon className="w-6 h-6" />
            <span>Эпизоды</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition"
          >
            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            <span>Выйти на сайт</span>
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
