interface IHttpError {
  message: string;
  httpCode: number;
}

export class HttpError extends Error {
  public readonly message: string;

  public readonly httpCode: number;

  constructor(args: IHttpError) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = args.httpCode;

    Error.captureStackTrace(this);
  }
}
