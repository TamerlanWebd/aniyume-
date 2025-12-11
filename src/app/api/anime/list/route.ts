import { NextResponse } from "next/server";
import db from "@/db";

export async function GET() {
  const animes = await db.anime.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });
  return NextResponse.json(animes);
}
