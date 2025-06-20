"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { getReviewsByCustomID, Review } from '@/lib/getReviews';
import ReviewModal from '@/components/ReviewModal';

interface ReviewsTabProps {
  cast: { customID: string; name?: string };
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => {
  const date = new Date(review.postedAt);
  const isDateValid = !isNaN(date.getTime());

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="mb-3">
        <p className="font-semibold text-gray-800 text-base text-left">
          {review.postedBy || '名無し'}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <StarRating rating={review.rating} />
          <span className="text-sm text-gray-500">
            ・{isDateValid ? formatDate(date) : '日付不明'}
          </span>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed text-left">
        {review.comment || 'コメントはありません。'}
      </p>
    </div>
  );
};

const ReviewsTab: React.FC<ReviewsTabProps> = ({ cast }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useCallbackでメモ化し、依存に入れて安全にuseEffectを使う
  const loadReviews = useCallback(async (): Promise<void> => {
    if (!cast.customID) return;
    setIsLoading(true);
    setError(null);
    try {
      const fetchedReviews = await getReviewsByCustomID(cast.customID);
      setReviews(fetchedReviews);
    } catch (err: unknown) {
      console.error('Failed to load reviews:', err);
      setError('口コミの取得に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  }, [cast.customID]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  return (
    <div>
      {/* 投稿ボタン */}
      <div className="sticky top-[215px] z-30 bg-transparent py-4">
        <div className="flex justify-center">
          <button
            className="
              bg-pink-500 
              text-white 
              text-lg 
              font-bold 
              px-10 
              py-3 
              rounded-full 
              shadow-md 
              transition 
              transform 
              hover:scale-105 
              hover:-translate-y-0.5 
              hover:bg-pink-600 
              duration-200
            "
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            口コミを投稿する
          </button>
        </div>
      </div>

      {/* 口コミ一覧 */}
      <div className="space-y-4">
        {isLoading && <p>読み込み中...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* モーダル */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        castCustomID={cast.customID}
        onSuccess={() => {
          setIsModalOpen(false);
          loadReviews(); // 投稿後に再取得
        }}
      />
    </div>
  );
};

export default ReviewsTab;
