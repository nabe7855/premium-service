const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";

const castData = [
  {
    id: 1,
    name: '美咲',
    age: 24,
    description:
      '丁寧な対応と最高の笑顔で、特別な時間をお届けします。お話するのが大好きです。',
    imageUrl: `${API_URL}/uploads/cast-sample-1.png`,
  },
  {
    id: 2,
    name: '由香里',
    age: 28,
    description:
      '物静かな空間で、心から癒されるひと時を。聞き上手なので、何でもお話しください。',
    imageUrl: `${API_URL}/uploads/cast-sample-2.png`,
  },
];

export default castData;
