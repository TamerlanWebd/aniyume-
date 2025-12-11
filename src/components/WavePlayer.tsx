"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  PlayIcon,
  PauseIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";

interface WavePlayerProps {
  src: string;
}

export default function WavePlayer({ src }: WavePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;

    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(percent);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const bars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex justify-center items-end h-8 gap-1 mb-4">
          {bars.map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-purple-500 rounded-t"
              animate={{
                height: isPlaying ? [5, 20, 10] : 5,
              }}
              transition={{
                duration: 0.5,
                repeat: isPlaying ? Infinity : 0,
                repeatType: "reverse",
                delay: i * 0.05,
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-purple-400"
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8" />
            ) : (
              <PlayIcon className="w-8 h-8" />
            )}
          </button>

          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-purple-400"
          >
            <ArrowsPointingOutIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
