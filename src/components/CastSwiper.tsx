// src/components/CastSwiper.tsx
'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CastSwiperProps {
  images: {
    url: string;
    alternativeText?: string;
    formats?: {
      medium?: { url: string };
    };
  }[];
  baseUrl: string;
}

const CastSwiper = ({ images, baseUrl }: CastSwiperProps) => {
  if (!images || images.length === 0) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      loop={images.length > 1}
      spaceBetween={20}
      slidesPerView={1}
    >
      {images.map((image, index) => {
        const imageUrl = `${baseUrl}${image.formats?.medium?.url || image.url}`;
        return (
          <SwiperSlide key={index}>
            <div className="relative w-full h-96">
              <Image
                src={imageUrl}
                alt={image.alternativeText || 'cast-image'}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover rounded-xl shadow-lg"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CastSwiper;
