
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
}
