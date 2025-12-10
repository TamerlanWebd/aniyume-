"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface AnimeCardProps {
  id: string;
  title: string;
  coverImage: string;
  year: number;
}

export default function AnimeCard({
  id,
  title,
  coverImage,
  year,
}: AnimeCardProps) {
  return (
    <Link href={`/anime/${id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer rounded-xl overflow-hidden bg-gray-900"
      >
        <div className="relative aspect-[2/3] w-full">
          <Image src={coverImage} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
        </div>
        <div className="p-3">
          <h3 className="text-white font-bold truncate">{title}</h3>
          <p className="text-gray-400 text-sm">{year}</p>
        </div>
      </motion.div>
    </Link>
  );
}
