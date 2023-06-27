export class HttpError extends Error {
  constructor(public code: number, message: string, public name: string) {
    super(message);
  }
}
