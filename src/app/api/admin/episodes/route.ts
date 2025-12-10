import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { animeId, episodeNumber, videoUrl } = body;

    console.log("Creating episode:", { animeId, episodeNumber, videoUrl });

    // Проверка на дубликат
    const existing = await prisma.episode.findUnique({
      where: {
        animeId_episodeNumber: {
          animeId: parseInt(animeId),
          episodeNumber: parseInt(episodeNumber),
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Серия с таким номером уже существует" },
        { status: 400 }
      );
    }

    const episode = await prisma.episode.create({
      data: {
        animeId: parseInt(animeId),
        episodeNumber: parseInt(episodeNumber),
        videoUrl,
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
