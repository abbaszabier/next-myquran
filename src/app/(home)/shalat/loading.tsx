// components/Loading.tsx
"use client";
import Image from "next/image";
import React from "react";

interface LoadingProps {
  text?: string;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({
  text = "Memuat data shalat...",
  color,
}) => {
  return (
    <div className="flex flex-col bg-background min-h-[calc(100vh-12rem)] md:min-h-[calc(100vh-10rem)] justify-center items-center gap-4">
      <Image
        src="/logo-quranku.svg"
        priority
        className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] animate-text-pulse"
        width={0}
        height={0}
        alt="loading"
      />
      <div
        className={`${color} text-lg md:text-xl font-bold animate-text-pulse`}
      >
        {text}
      </div>
    </div>
  );
};

export default Loading;
