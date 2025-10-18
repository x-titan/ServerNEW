export interface IJSONResponse {
  success: boolean
  message?: string
  data?: any
}

export interface IErrorResponse extends IJSONResponse {
  success: false;
  message: string;
  error?: string;
  stack?: string;
  path?: string;
  timestamp?: string;
}

