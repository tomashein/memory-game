import { HttpError } from './error';

export const fetchData = async (): Promise<Api.PaginatedResponse> => {
  try {
    const response = await fetch(
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20'
    );
    const json = await response.json();
    if (!response.ok) {
      throw new HttpError(response.status, (json as unknown as { error: string }).error, 'Http Error');
    }
    return json;
  } catch (error) {
    throw new HttpError(503, 'The service is unreacheable.', 'Network Error');
  }
};

export const parseData = (data: Api.PaginatedResponse) => {
  return data.entries.reduce((acc, entry) => {
    if (entry.fields.image) {
      return [...acc, { id: entry.meta.uuid, image: entry.fields.image.url, title: entry.fields.image.title }];
    }
    return [...acc];
  }, [] as App.Content[]);
};
