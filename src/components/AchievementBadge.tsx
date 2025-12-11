import { motion } from "framer-motion";

interface Props {
  title: string;
  icon: string;
  unlocked: boolean;
}

export default function AchievementBadge({ title, icon, unlocked }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`flex flex-col items-center p-4 rounded-xl border ${
        unlocked
          ? "bg-purple-900/20 border-purple-500 text-white"
          : "bg-gray-900 border-gray-800 text-gray-600 grayscale"
      }`}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <span className="text-xs font-bold text-center">{title}</span>
    </motion.div>
  );
}
