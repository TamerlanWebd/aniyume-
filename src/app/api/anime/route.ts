import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@/db";
import { verifyAccessToken } from "@/utils/jwt";
const animeSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  year: z.coerce.number(),
  genres: z.string().transform((str) => str.split(",").map((s) => s.trim())),
  coverImage: z.string().url(),
});

export async function POST(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.split("accessToken=")[1]
    ?.split(";")[0];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = animeSchema.parse(body);

    const anime = await db.anime.create({
      data: {
        title: data.title,
        description: data.description,
        year: data.year,
        genres: data.genres,
        coverImage: data.coverImage,
      },
    });

    return NextResponse.json(anime, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
