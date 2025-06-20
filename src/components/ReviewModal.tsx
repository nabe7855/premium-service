"use client";

import React, { useState } from "react";
import { postReview } from "@/lib/postReview"; // 追加

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  castCustomID: string;
  onSuccess?: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, castCustomID }) => {
  const [nickname, setNickname] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) {
      alert("ニックネームは必須です。");
      return;
    }
    if (!comment.trim()) {
      alert("コメントは必須です。");
      return;
    }

    setIsSubmitting(true);
    try {
      await postReview({
        postedBy: nickname,
        postedAt: new Date().toISOString(),
        rating,
        comment,
        castCustomID,
        isVisible: true,
      });
      onClose();
    } catch (error) {
      alert("口コミの投稿に失敗しました。");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">口コミを投稿する</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ニックネーム */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ニックネーム（必須）</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="例）さくら"
              required
            />
          </div>

          {/* 評価 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">評価（1〜5）</label>
            <div className="flex space-x-1 text-2xl justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer ${
                    (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* コメント */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">コメント</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-md p-2"
              rows={4}
              placeholder="体験した内容や感想などをご記入ください。"
              required
            />
          </div>

          {/* ボタン */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              disabled={isSubmitting}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "送信中..." : "投稿する"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
