import EditAnimeForm from "@/components/admin/EditAnimeForm";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditAnimePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const anime = await prisma.anime.findUnique({
    where: { id: Number(id) },
  });

  if (!anime) notFound();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Редактировать аниме: {anime.title}
          </h1>
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
          <EditAnimeForm
            id={anime.id}
            initial={{
              title: anime.title,
              description: anime.description,
              year: anime.year,
              genres: anime.genres.join(", "),
              posterUrl: anime.posterUrl ?? "",
            }}
          />
        </div>
      </main>
    </div>
  );
}
