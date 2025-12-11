import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

export async function GET(req: NextRequest) {
  const animes = await db.anime.findMany();
  return NextResponse.json(animes);
}
