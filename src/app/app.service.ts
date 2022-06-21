
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  appData : any = []
  loadData(): void {
   this.http.get("assets/app-data/data.json").subscribe(data =>{
    console.log("data is loaded.");
    this.appData = data;
    console.log(this.appData);
  })
 }

 

  /*
  pingServer(ip: String): Observable<ServerModel>{
    return this.http.get<ServerModel>(`${this.BACKEND_BASE_URL}/pingserver/${ip}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    if (errorRes.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred in client side:', errorRes.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
        console.error('Server Side Error: ', errorRes);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error("'There is a problem with the service. We are notified & working on it. Please try again later.'"));
  }

  */
}
