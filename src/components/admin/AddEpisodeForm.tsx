"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEpisodeForm({ animeId }: { animeId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    episodeNumber: 1,
    videoUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          animeId,
          ...formData,
        }),
      });

      if (res.ok) {
        setFormData({
          episodeNumber: formData.episodeNumber + 1,
          videoUrl: "",
        });
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Ошибка при добавлении серии");
      }
    } catch (error) {
      alert("Ошибка при добавлении серии");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Номер серии
        </label>
        <input
          type="number"
          min="1"
          required
          value={formData.episodeNumber}
          onChange={(e) =>
            setFormData({
              ...formData,
              episodeNumber: parseInt(e.target.value),
            })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          URL видео
        </label>
        <input
          type="url"
          required
          value={formData.videoUrl}
          onChange={(e) =>
            setFormData({ ...formData, videoUrl: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="https://example.com/video.mp4"
        />
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Добавление..." : "Добавить серию"}
        </button>
      </div>
    </form>
  );
}
