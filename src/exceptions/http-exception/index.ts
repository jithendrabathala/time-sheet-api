export default class HttpException extends Error {
  statusCode: number;
  message: string;
  error: unknown;

  constructor(statusCode: number, message: string, error: unknown = null) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
