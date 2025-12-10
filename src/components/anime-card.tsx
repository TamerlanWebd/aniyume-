"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  id: string;
  title: string;
  posterUrl: string;
  year: number;
  genres: string[];
  onLikeChange?: (id: string, liked: boolean) => void;
  initialLiked?: boolean;
}

export function AnimeCard({
  id,
  title,
  posterUrl,
  year,
  genres,
  onLikeChange,
  initialLiked = false,
}: AnimeCardProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    onLikeChange?.(id, newLiked);
  };

  return (
    <div className="group relative h-full overflow-hidden rounded-lg bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30">
      <div className="relative h-64 w-full overflow-hidden sm:h-72 md:h-80">
        <img
          src={posterUrl || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        <button
          onClick={handleLike}
          className={cn(
            "absolute right-3 top-3 rounded-full p-2.5 transition-all duration-200",
            isLiked
              ? "bg-primary text-primary-foreground"
              : "bg-black/40 text-white hover:bg-primary/80"
          )}
          aria-label={isLiked ? "Unlike anime" : "Like anime"}
        >
          <Heart size={20} className={isLiked ? "fill-current" : ""} />
        </button>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div className="space-y-1">
          <h3 className="line-clamp-2 text-lg font-bold leading-tight text-card-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{year}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-primary/30"
            >
              {genre}
            </span>
          ))}
          {genres.length > 3 && (
            <span className="inline-block rounded-full bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              +{genres.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
