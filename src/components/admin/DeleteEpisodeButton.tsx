"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteEpisodeButton({
  episodeId,
}: {
  episodeId: number;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Удалить эту серию?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/episodes/${episodeId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
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
