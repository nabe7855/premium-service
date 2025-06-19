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
  return (
    <div className="w-72 h-96 mb-6 shadow-md bg-white">
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
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

