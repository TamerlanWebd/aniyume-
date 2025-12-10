"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditAnimeForm({
  id,
  initial,
}: {
  id: number;
  initial: {
    title: string;
    description: string;
    year: number;
    genres: string;
    posterUrl: string;
  };
}) {
  const [formData, setFormData] = React.useState(initial);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/anime/${id}`, {
        method: "PUT",
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
        alert("Ошибка при обновлении аниме");
      }
    } catch {
      alert("Ошибка при обновлении аниме");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Название *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Год *</label>
        <input
          type="number"
          required
          min={1960}
          max={new Date().getFullYear() + 1}
          value={formData.year}
          onChange={(e) =>
            setFormData({ ...formData, year: Number(e.target.value) })
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
          onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Сохранение..." : "Сохранить"}
        </button>
        <Link
          href="/admin/anime"
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
        >
          Отмена
        </Link>
      </div>
    </form>
  );
}
