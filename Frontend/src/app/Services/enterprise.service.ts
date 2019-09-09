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
    return this.http.get<any>(`${this.apiUrl}/enterprise`);
  }

  updateEnterprise(id,updatedEnterprise): Observable<any>{
    const enterprise = {
      email: updatedEnterprise.email,
      name: updatedEnterprise.name,
      description: updatedEnterprise.description,
      activity: updatedEnterprise.activity,
    };
    console.log(enterprise);
    return this.http.put<any>(`${this.apiUrl}/enterprise/${id}`,updatedEnterprise);
  }
  getEnterprise(id){
    return this.http.get<any>(`${this.apiUrl}/enterprise/${id}`);
  }
  
  deleteEnterprise(id): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/enterprise/${id}`);
  }
 

}
