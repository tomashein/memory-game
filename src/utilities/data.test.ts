import { Mock, afterEach, describe, expect, test } from 'vitest';
import { fetchData, parseData } from './data';

global.fetch = vi.fn();

const createFetchResponse = (data: Api.PaginatedResponse) => {
  return { ok: true, json: () => new Promise((resolve) => resolve(data)) };
};

const dataMock: Api.PaginatedResponse = {
  entries: [
    {
      meta: {
        name: 'bear',
        slug: 'bear',
        tags: [],
        type: 'game',
        uuid: 'a4452fe5-ca10-4b35-ad7a-62fc44c60d27',
        space: 'animals',
        author: {},
        locale: 'es',
        excerpt: '',
        private: false,
        targets: [],
        category: null,
        created_at: '2023-03-24T14:43:03.000-03:00',
        updated_at: '2023-03-24T14:43:24.000-03:00',
        published_at: '2023-03-24T14:43:24.000-03:00',
        unpublish_at: null,
        version_type: 'current',
        category_name: null,
        category_slug: null,
        available_locales: ['es'],
      },
      fields: {
        image: {
          url: 'https://cloud.modyocdn.com/uploads/4a1b66ba-ba4e-438d-be40-d9960818e06a/original/bear.jpg',
          tags: [],
          uuid: '4a1b66ba-ba4e-438d-be40-d9960818e06a',
          title: 'Bear',
          alt_text: null,
          description: null,
          content_type: 'image/jpeg',
        },
      },
    },
    {
      meta: {
        name: 'bird',
        slug: 'bird',
        tags: [],
        type: 'game',
        uuid: 'e5a7f1c5-c8dd-43f5-a87b-12bf01b684ba',
        space: 'animals',
        author: {},
        locale: 'es',
        excerpt: '',
        private: false,
        targets: [],
        category: null,
        created_at: '2023-03-24T14:43:42.000-03:00',
        updated_at: '2023-03-24T14:51:50.000-03:00',
        published_at: '2023-03-24T14:51:50.000-03:00',
        unpublish_at: null,
        version_type: 'current',
        category_name: null,
        category_slug: null,
        available_locales: ['es'],
      },
      fields: {},
    },
  ],
  meta: {
    total_entries: 2,
    per_page: 10,
    current_page: 1,
    total_pages: 1,
  },
};

const parsedDataMock = [
  {
    id: 'a4452fe5-ca10-4b35-ad7a-62fc44c60d27',
    image: 'https://cloud.modyocdn.com/uploads/4a1b66ba-ba4e-438d-be40-d9960818e06a/original/bear.jpg',
    title: 'Bear',
  },
];

describe('fetchData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should fetch data and return expected result', async () => {
    (fetch as Mock).mockResolvedValue(createFetchResponse(dataMock));

    const response = await fetchData();

    expect(fetch).toHaveBeenCalledWith(
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20'
    );
    expect(response).toStrictEqual(dataMock);
  });
});

describe('parseData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should parse data and return expected result', () => {
    const response = parseData(dataMock);
    expect(response).toStrictEqual(parsedDataMock);
  });
});
