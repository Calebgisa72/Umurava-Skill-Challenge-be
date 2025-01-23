export enum ErrorCodes {
  DATA_CONFLICT = 'ERR_CONFLICT',
  INVALID_INPUT = 'ERR_INVALID_INPUT',
  RESOURCE_NOT_FOUND = 'ERR_RESOURCE_NOT_FOUND',
  UNAUTHORIZED = 'ERR_UNAUTHORIZED',
  DATABASE = 'ERR_DATABASE',
  INTERNAL_ERROR = 'ERR_INTERNAL_SERVER_ERROR',
  INVALID_TOKEN = 'ERR_INVALID_TOKEN',
  EXPIRED_TOKEN = 'ERR_EXPIRED_TOKEN',
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: ErrorCodes;
  public readonly details: unknown;

  constructor(
    message: string,
    statusCode: number,
    errorCode: ErrorCodes,
    details?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
export class AppFailure {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly details: unknown;

  constructor(message: string, statusCode: number, details?: unknown) {
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;
  }
}
