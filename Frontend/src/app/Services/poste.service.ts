import { Injectable } from '@angular/core';
import { Subject, AsyncSubject, BehaviorSubject, ReplaySubject, throwError, Observable, of } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/api/postes';
@Injectable({
  providedIn: 'root'
})
export class PosteService {

  constructor(private http:HttpClient) { }

  private eventCallback = new Subject< Array<any> >()
  eventCallback$ = this.eventCallback.asObservable();
  sendPosts(arr){
      this.eventCallback.next(arr);
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
    // return an observable with a Category-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
  
  postList=[ 
      { id: 1, poste: 'Graphic Designer' },
       { id: 2, poste: 'developpeur' },
      { id: 3, poste: 'Gamer' }
     ];
  // return list of postes in database
  getPostes(): Observable<any> {
     return of(this.postList);
   /* return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));*/
  }
  getPoste(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPoste(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updatePoste(data, id): Observable<any> {
    return this.http.put(`${apiUrl}/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePoste(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


}
