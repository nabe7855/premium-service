import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { Cast } from '@/app/_data/castData'; // ★★★ 創世の石版から、Castの定義を、読み込む ★★★

interface CastCardProps extends Cast { // ★★★ Castの全てを、受け継ぐ ★★★
  priority?: boolean;
}

const CastCard: React.FC<CastCardProps> = ({ id, name, age, description, image, priority = false }) => {
  return (
    <Link href={`/cast/${id}`} className="block w-full max-w-sm rounded-2xl bg-white shadow-lg overflow-hidden border border-strawberry-secondary/50 transition-transform hover:scale-105">
      <div className="relative h-80 w-full">
        <Image
          src={image} // ★★★ imageUrlではなく、image ★★★
          alt={`${name}の写真`}
          fill
          style={{ objectFit: 'cover' }}
          priority={priority}
        />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold text-strawberry-primary">{name} ({age})</h3>
        <p className="mt-2 text-strawberry-text/80">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default CastCard;