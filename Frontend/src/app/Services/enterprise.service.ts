import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EnterpriseService {

  apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getEnterprises(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/enterprises`);
  }

}
