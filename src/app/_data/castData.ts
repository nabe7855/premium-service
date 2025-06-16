// app/_data/castData.ts

export interface Cast {
  id: number;
  name: string;
  age: number;
  description: string;
  image: string; // ← imageUrl ではなく image
}

const castData: Cast[] = [
  {
    id: 1,
    name: "美咲",
    age: 24,
    description: "丁寧な対応と最高の笑顔で、特別な時間をお届けします。お話するのが大好きです。",
    image: "/cast-sample-1.png",
  },
  {
    id: 2,
    name: "由香里",
    age: 28,
    description: "物静かな空間で、心から癒されるひと時を。聞き上手なので、何でもお話しください。",
    image: "/cast-sample-2.png",
  },
];

// IDを元に、一人だけのキャストを探し出す、新しい、魔法の関数
export const getCastById = (id: number) => {
  // castDataの中から、idが一致するものを、探し出す
  return castData.find((cast) => cast.id === id);
};

export default castData;
