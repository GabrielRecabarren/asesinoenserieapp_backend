import { IError } from './error.interface';
//Solid Principle Interfaces Segregation:Each interface should be focused and separated by responsibility, avoiding monolithic or overloaded interfaces.
export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}
