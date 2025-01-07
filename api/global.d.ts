import { HttpStatus } from '@nestjs/common';

declare global {
  type ResponseObject = {
    statusCode: HttpStatus;
    [key: string]: any;
  };

  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}
