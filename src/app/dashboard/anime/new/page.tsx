"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAnimePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/anime", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard/anime");
      router.refresh();
    } else {
      alert("Ошибка при создании");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Добавить Аниме</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-800 p-8 rounded-xl border border-gray-700"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Название</label>
          <input
            name="title"
            required
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 focus:border-purple-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Описание</label>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 focus:border-purple-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Год выпуска
            </label>
            <input
              name="year"
              type="number"
              required
              className="w-full bg-gray-900 border border-gray-700 rounded p-3 focus:border-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Жанры (через запятую)
            </label>
            <input
              name="genres"
              placeholder="Action, Fantasy"
              required
              className="w-full bg-gray-900 border border-gray-700 rounded p-3 focus:border-purple-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Ссылка на обложку (URL)
          </label>
          <input
            name="coverImage"
            type="url"
            required
            placeholder="https://..."
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 focus:border-purple-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold transition disabled:opacity-50"
        >
          {loading ? "Сохранение..." : "Создать Аниме"}
        </button>
      </form>
    </div>
  );
}
