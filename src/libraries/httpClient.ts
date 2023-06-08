const request = async <T>(url: string, config: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, config);
  return await response.json();
};

const httpClient = {
  get: <T>(url: string) => request<T>(url),
  post: <TBody extends BodyInit, T>(url: string, body: TBody) => request<T>(url, { method: 'POST', body }),
};

export default httpClient;
