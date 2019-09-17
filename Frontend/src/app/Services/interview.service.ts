import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import InterviewCalendar from "../Models/InterviewCalendar";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/api/interviews/';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private http: HttpClient) { }

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
    // return an observable with a Category-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  postInterviewCalendar(interviewCalendar: InterviewCalendar): Observable<any> {
    return this.http.post(apiUrl, interviewCalendar, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getInterviewCalendar(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getInterviewSessionsByEnterpriseUsername(username: string): Observable<any> {
    return this.http.get(apiUrl + 'enterprise/' + username, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getInterviewSessionsByCandidateUsername(username: string): Observable<any> {
    return this.http.get(apiUrl + 'candidate/' + username, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


}
