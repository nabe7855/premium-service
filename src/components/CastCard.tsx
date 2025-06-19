"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


interface CastCardProps {
  id: number;
  name: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  imageUrl: string;
  catchCopy?: string;
  snsUrl?: string; 
  isNewcomer?: boolean;
  sexinessLevel?: number; // 1〜5
  priority?: boolean;
}

const CastCard: React.FC<CastCardProps> = ({
  name,
  age,
  height,
  weight,
  imageUrl,
  catchCopy,
  snsUrl,
  isNewcomer = false,
  sexinessLevel = 0,
  priority = false,
}) => {
  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-md overflow-hidden text-center p-4 max-w-[300px] w-full"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* 🆕 新人ラベル */}
{isNewcomer && (
  <motion.span
    className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-red-400 text-white text-sm font-extrabold px-3 py-1 rounded-full border border-white shadow-lg z-10"
    style={{
      textShadow:
        "0 0 6px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 192, 203, 0.7)",
    }}
    animate={{
      scale: [1, 1.1, 1],
      opacity: [1, 0.9, 1],
      boxShadow: [
        "0 0 6px rgba(255,255,255,0.7)",
        "0 0 12px rgba(255,192,203,1)",
        "0 0 6px rgba(255,255,255,0.7)",
      ],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    🍓 新いちご
  </motion.span>
)}

      {/* キャスト画像 */}
      <div className="relative w-full h-[300px] mb-2">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded-t-2xl"
          priority={priority}
        />
      </div>

      {/* 名前とハート評価 */}
      <h2 className="text-lg font-bold text-gray-800 flex justify-center items-center gap-2 mb-1">
        {name}
        <span>
        {Array.from({ length: sexinessLevel ?? 0 }).map((_, i) => (
        <span key={i}>❤️</span>
        ))}
        </span>
      </h2>

      {/* キャッチコピー */}
      {catchCopy && (
        <p className="text-sm text-gray-600 mb-2">{catchCopy}</p>
      )}

      {/* 年齢・身長・体重 */}
      <div className="text-sm text-gray-700 space-y-1 mb-4">
        {age !== null && <p>年齢: {age}歳</p>}
        {height !== null && <p>身長: {height}cm</p>}
        {weight !== null && <p>体重: {weight}kg</p>}
      </div>

      {/* SNSリンクボタン */}
      <button className="bg-pink-500 text-white text-sm px-4 py-2 rounded-full hover:bg-pink-600 transition duration-300">
        SNSリンク
      </button>
    </motion.div>
  );
};

export default CastCard;
