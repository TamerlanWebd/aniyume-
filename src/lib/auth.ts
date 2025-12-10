import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 12;
const PEPPER = process.env.PEPPER_SECRET!;
const JWT_SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string): Promise<string> {
  const peppered = password + PEPPER;
  return await bcrypt.hash(peppered, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const peppered = password + PEPPER;
  return await bcrypt.compare(peppered, hash);
}

export function generateAccessToken(userId: number, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
}
