import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, year, genres } = body;

    const updated = await db.anime.update({
      where: { id },
      data: {
        title,
        description,
        year: Number(year),
        genres,
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
