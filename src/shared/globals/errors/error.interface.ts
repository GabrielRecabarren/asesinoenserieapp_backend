//Solid Principle Interfaces Segregation:Each interface should be focused and separated by responsibility, avoiding monolithic or overloaded interfaces.
export interface IError {
  message: string;
  statusCode: number;
  status: string;
}
