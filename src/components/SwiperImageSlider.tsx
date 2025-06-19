'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SwiperImageSliderProps {
  images: { url: string }[];
  baseUrl: string;
}

export default function SwiperImageSlider({ images, baseUrl }: SwiperImageSliderProps) {
  const hasImages = images.length > 0;

  return (
    <div className="w-72 h-96 mb-6 shadow-md bg-white flex items-center justify-center">
      {hasImages ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={images.length > 1}
          modules={[Navigation, Pagination]}
          className="w-full h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={`${baseUrl}${img.url}`}
                  alt={`cast-image-${index}`}
                  fill
                  className="object-contain"
                  sizes="100%"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-gray-400 text-sm">
          画像がありません
        </div>
      )}
    </div>
  );
}
