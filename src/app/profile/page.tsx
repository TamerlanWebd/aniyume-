import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/utils/jwt";
import db from "@/db";
import AchievementBadge from "@/components/AchievementBadge";

export default async function ProfilePage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) redirect("/");

  const payload = verifyAccessToken(token) as { userId: string } | null;
  if (!payload) redirect("/");

  const user = await db.user.findUnique({
    where: { id: payload.userId },
    include: { achievements: true },
  });

  if (!user) redirect("/");
  const allAchievements = [
    { id: "1", title: "Первый шаг", icon: "🥚" },
    { id: "2", title: "Марафонец", icon: "🔥" },
    { id: "3", title: "Критик", icon: "⭐" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl font-bold">
            {user.email[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.email}</h1>
            <p className="text-gray-400">
              Уровень {Math.floor(user.xp / 100) + 1} • {user.xp} XP
            </p>
            <div className="w-64 h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-purple-500"
                style={{ width: `${user.xp % 100}%` }}
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Достижения</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {allAchievements.map((ach) => {
            const isUnlocked = user.achievements.some(
              (ua) => ua.title === ach.title
            );
            return (
              <AchievementBadge
                key={ach.id}
                title={ach.title}
                icon={ach.icon}
                unlocked={isUnlocked}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
