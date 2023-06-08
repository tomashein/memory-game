import httpClient from '@libraries/httpClient';
import { shuffleArray } from './utils';

export const fetchCards = async () => {
  const { entries } = await httpClient.get<Api.PaginatedResponse>(
    'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20'
  );
  const data = shuffleArray(entries).slice(0, 9);
  const reduced = data.reduce((acc, cur) => {
    if (cur.fields.image)
      return acc.concat([
        {
          id: cur.fields.image.uuid,
          image: cur.fields.image.url,
          title: cur.fields.image.title,
          active: false,
          matched: false,
        },
        {
          id: `-${cur.fields.image.uuid}`,
          image: cur.fields.image.url,
          title: cur.fields.image.title,
          active: false,
          matched: false,
        },
      ]);
    return [...acc];
  }, [] as Game.Card[]);
  reduced.forEach((card) => {
    const imagePreload = new Image();
    imagePreload.src = card.image;
  });
  await new Promise((res) => setTimeout(() => res(true), 1000));
  return reduced;
};
