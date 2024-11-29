export class ExceptionBody extends Error {
  httpStatus: number;
  error: string;
  request: string;
  timeStamp: string;

  constructor({
    error,
    httpStatus,
    message,
    request,
    timeStamp,
  }: ExceptionBody) {
    super(message);
    this.httpStatus = httpStatus;
    this.error = error;
    this.request = request;
    this.timeStamp = timeStamp;

    Object.setPrototypeOf(this, ExceptionBody.prototype);
  }
}
