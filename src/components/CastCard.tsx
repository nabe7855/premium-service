"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CastCardProps {
  id: number;
  customID: string; // ここも統一（camelCase or PascalCaseなど）
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
  reviewCount?: number;
}

const CastCard: React.FC<CastCardProps> = ({
  customID,
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
  reviewCount = 0,
}) => {
  return (
    <Link href={`/cast/${customID}`}>
      <motion.div
        className="relative bg-white rounded-2xl shadow-md overflow-hidden text-center p-4 max-w-[300px] w-full cursor-pointer"
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
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover rounded-t-2xl"
            priority={priority}
          />
        </div>

        {/* 名前とハート評価 */}
        <h2 className="text-lg font-bold text-gray-800 flex justify-center items-center gap-2 mb-1">
          {name}
          <span>
            {Array.from({ length: sexinessLevel }).map((_, i) => (
              <span key={i}>❤️</span>
            ))}
          </span>
        </h2>

        {/* キャッチコピー */}
        {catchCopy && <p className="text-sm text-gray-600 mb-2">{catchCopy}</p>}

        {/* 年齢・身長・体重 テーブル表示 */}
        <div className="w-full mb-2">
          <table className="w-full border border-gray-300 text-sm text-gray-800">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-1 border border-gray-300">年齢</th>
                <th className="py-1 border border-gray-300">身長</th>
                <th className="py-1 border border-gray-300">体重</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="py-1 border border-gray-300">{age ?? "-"}</td>
                <td className="py-1 border border-gray-300">{height ?? "-"}cm</td>
                <td className="py-1 border border-gray-300">{weight ?? "-"}kg</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 口コミリンク */}
        <div className="mt-2">
          <p className={`text-xs underline ${reviewCount ? "text-pink-600" : "text-pink-400"}`}>
            {reviewCount ? `${reviewCount}件の口コミがあります` : "口コミはまだありません"}
          </p>
        </div>

        {/* 詳細リンクボタン（見た目だけ） */}
        <div>
          <span className="inline-block bg-pink-500 text-white text-sm px-4 py-2 rounded-full hover:bg-pink-600 transition duration-300">
            詳細を見る
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default CastCard;
