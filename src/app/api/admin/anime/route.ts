import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, year, genres, posterUrl } = body;

    const anime = await prisma.anime.create({
      data: {
        title,
        description,
        year: parseInt(year),
        genres,
        posterUrl: posterUrl || null,
      },
    });

    return NextResponse.json(anime, { status: 201 });
  } catch (error) {
    console.error("Error creating anime:", error);
    return NextResponse.json(
      { error: "Failed to create anime" },
      { status: 500 }
    );
  }
}
