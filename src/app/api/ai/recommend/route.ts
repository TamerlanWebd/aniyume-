import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/utils/jwt";
import { getRecommendations } from "@/lib/recommendations";

export async function GET(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.split("accessToken=")[1]
    ?.split(";")[0];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyAccessToken(token) as { userId: string } | null;

  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const recommendations = await getRecommendations(payload.userId);

  return NextResponse.json(recommendations);
}
