
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
   this.http.get("assets/app-data/FAIR_DSM_ASSESS_v1.1.json").subscribe(data =>{
    console.log("data is loaded.");
    this.appData = data;
    // console.log(this.appData);
  })
 }
}
