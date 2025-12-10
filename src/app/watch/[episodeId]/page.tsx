import db from "@/db";
import { notFound } from "next/navigation";
import WavePlayer from "@/components/WavePlayer";

interface Props {
  params: { episodeId: string };
}

export default async function WatchPage({ params }: Props) {
  const episode = await db.episode.findUnique({
    where: { id: params.episodeId },
    include: { anime: true },
  });

  if (!episode) return notFound();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <WavePlayer src={episode.videoUrl} />
        <div className="mt-6 text-white">
          <h1 className="text-2xl font-bold">{episode.anime.title}</h1>
          <h2 className="text-xl text-gray-400">
            Эпизод {episode.number}: {episode.title}
          </h2>
        </div>
      </div>
    </div>
  );
}
