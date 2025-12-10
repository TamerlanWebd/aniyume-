import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, year, genres, posterUrl } = body;

    const updated = await prisma.anime.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        year: Number(year),
        genres,
        posterUrl: posterUrl || null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating anime:", error);
    return NextResponse.json(
      { error: "Failed to update anime" },
      { status: 500 }
    );
  }
}
