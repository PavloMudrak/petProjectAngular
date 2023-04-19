import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  handleError(error: any) {
    if (error instanceof HttpErrorResponse && error.status === 400) {
        console.log("Error: something went wrong, try again");
    } else {
        console.log('Unexpected error grom SERVER. Try again.', error);
    }
  }
}
