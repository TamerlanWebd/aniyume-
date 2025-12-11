"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewEpisodePage() {
  const router = useRouter();
  const [animes, setAnimes] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/anime/list")
      .then((res) => res.json())
      .then((data) => setAnimes(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/episode", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard/episodes");
      router.refresh();
    } else {
      alert("Ошибка");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Добавить Эпизод</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-800 p-8 rounded-xl border border-gray-700"
      >
        <div>
          <label className="block text-sm font-medium mb-2">
            Выберите Аниме
          </label>
          <select
            name="animeId"
            required
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 focus:border-blue-500 outline-none"
          >
            <option value="">-- Выбрать --</option>
            {animes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Номер серии
            </label>
            <input
              name="number"
              type="number"
              required
              className="w-full bg-gray-900 border border-gray-700 rounded p-3 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Название серии
            </label>
            <input
              name="title"
              required
              className="w-full bg-gray-900 border border-gray-700 rounded p-3 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Ссылка на видео (mp4/m3u8)
          </label>
          <input
            name="videoUrl"
            type="url"
            required
            placeholder="https://..."
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 focus:border-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold transition disabled:opacity-50"
        >
          {loading ? "Сохранение..." : "Добавить Эпизод"}
        </button>
      </form>
    </div>
  );
}
