import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@/db";

const episodeSchema = z.object({
  title: z.string().min(1),
  number: z.coerce.number(),
  videoUrl: z.string().url(),
  animeId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = episodeSchema.parse(body);

    const episode = await db.episode.create({
      data: {
        title: data.title,
        number: data.number,
        videoUrl: data.videoUrl,
        animeId: data.animeId,
      },
    });

    return NextResponse.json(episode, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
