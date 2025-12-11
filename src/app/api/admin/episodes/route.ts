import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { animeId, episodeNumber, videoUrl } = body;

    const animeIdStr = String(animeId);
    const episodeNumberInt = Number(episodeNumber);

    const existing = await db.episode.findFirst({
      where: {
        animeId: animeIdStr,
        number: episodeNumberInt,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Серия с таким номером уже существует" },
        { status: 400 }
      );
    }

    const episode = await db.episode.create({
      data: {
        animeId: animeIdStr,
        number: episodeNumberInt,
        videoUrl,
        title: `Серия ${episodeNumberInt}`,
      },
    });

    return NextResponse.json(episode, { status: 201 });
  } catch (error) {
    console.error("Error creating episode:", error);
    return NextResponse.json(
      { error: "Failed to create episode" },
      { status: 500 }
    );
  }
}
