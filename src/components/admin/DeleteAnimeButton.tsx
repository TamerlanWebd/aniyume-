"use client";

import { useState } from "react";

export default function DeleteAnimeButton({ animeId }: { animeId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Вы уверены что хотите удалить это аниме?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/anime/${animeId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("Ошибка при удалении");
      }
    } catch (error) {
      alert("Ошибка при удалении");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {isDeleting ? "Удаление..." : "Удалить"}
    </button>
  );
}
