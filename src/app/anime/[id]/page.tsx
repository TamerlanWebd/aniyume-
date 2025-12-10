import db from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
  params: { id: string };
}

export default async function AnimePage({ params }: Props) {
  const anime = await db.anime.findUnique({
    where: { id: params.id },
    include: { episodes: { orderBy: { number: "asc" } } },
  });

  if (!anime) return notFound();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="relative h-[40vh] w-full">
        <Image
          src={anime.coverImage}
          alt={anime.title}
          fill
          className="object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 container mx-auto">
          <h1 className="text-5xl font-bold mb-2">{anime.title}</h1>
          <div className="flex gap-2 text-sm text-gray-300">
            <span>{anime.year}</span>
            <span>•</span>
            <span>{anime.genres.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Сюжет</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            {anime.description}
          </p>

          <h2 className="text-2xl font-bold mb-4">Эпизоды</h2>
          <div className="space-y-2">
            {anime.episodes.length === 0 ? (
              <p className="text-gray-600">Эпизоды еще не загружены.</p>
            ) : (
              anime.episodes.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/watch/${ep.id}`}
                  className="block p-4 bg-gray-900 rounded hover:bg-gray-800 transition flex justify-between items-center"
                >
                  <span className="font-medium">
                    Эпизод {ep.number}: {ep.title}
                  </span>
                  <span className="text-purple-400 text-sm">Смотреть ►</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
