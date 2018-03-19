import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


@Injectable()
export class DataProvider {
  url:string;
  query:string;

  constructor(public http: HttpClient) {
    this.url = "http://sgx.crispy-code.com/data";
  }

  getData(contract:string, trade_session:string, contract_month:string) {
    this.query = `?where={"contract":"${ contract }", "trade_session":"${ trade_session }", "contract_month":"${ contract_month }"}`;
    console.log(this.url + this.query);
    return this.http.get(this.url + this.query)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

}
