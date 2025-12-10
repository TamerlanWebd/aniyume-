"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateAnimePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    genres: "",
    posterUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/anime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          genres: formData.genres
            .split(",")
            .map((g) => g.trim())
            .filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push("/admin/anime");
      } else {
        alert("Ошибка при создании аниме");
      }
    } catch (error) {
      alert("Ошибка при создании аниме");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Добавить аниме</h1>
          <Link
            href="/admin/anime"
            className="text-gray-600 hover:text-gray-900"
          >
            Назад
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Название *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Attack on Titan"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Описание *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                placeholder="Краткое описание аниме..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Год выпуска *
              </label>
              <input
                type="number"
                required
                min="1960"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Жанры (через запятую) *
              </label>
              <input
                type="text"
                required
                value={formData.genres}
                onChange={(e) =>
                  setFormData({ ...formData, genres: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Экшен, Драма, Фэнтези"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                URL постера
              </label>
              <input
                type="url"
                value={formData.posterUrl}
                onChange={(e) =>
                  setFormData({ ...formData, posterUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://example.com/poster.jpg"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? "Создание..." : "Создать аниме"}
              </button>
              <Link
                href="/admin/anime"
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
              >
                Отмена
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
