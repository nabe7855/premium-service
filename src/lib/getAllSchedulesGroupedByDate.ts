// lib/getAllSchedulesGroupedByDate.ts

import qs from 'qs';
import { Schedule } from '@/types/schedule';

export const getAllSchedulesGroupedByDate = async (): Promise<Record<string, Schedule[]>> => {
  const query = qs.stringify({
    populate: {
      cast: {
        fields: ['name', 'customID'],
      },
    },
    sort: ['date:asc'],
    pagination: {
      limit: 100,
    },
  }, {
    encodeValuesOnly: true,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/schedules?${query}`);

  if (!res.ok) {
    throw new Error('スケジュール取得失敗');
  }

  const data = await res.json();

  const grouped: Record<string, Schedule[]> = {};

  data.data.forEach((item: any) => {
    const date = item.date;
    const cast = item.cast;

    if (!date || !cast) return;

    const schedule: Schedule = {
      id: item.id,
      date,
      rawText: item.rawText,
      isFullyBooked: item.isFullyBooked,
      cast: {
        id: cast.id,
        name: cast.name,
        customID: cast.customID,
      },
    };

    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(schedule);
  });

  return grouped;
};
