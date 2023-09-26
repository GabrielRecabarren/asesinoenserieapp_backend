import HTTP_STATUS, { SERVICE_UNAVAILABLE } from 'http-status-codes';
import { CustomError } from './customError';

export class ServerError extends CustomError {
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}
