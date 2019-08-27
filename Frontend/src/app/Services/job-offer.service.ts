import { Injectable } from '@angular/core';
import { Subject, AsyncSubject, BehaviorSubject, ReplaySubject,Observable, throwError} from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/api/offers';
@Injectable({
  providedIn: 'root'
})

export class JobOfferService {

  constructor(private http:HttpClient) { }
  
  offers = [
    { id: 1, entreprise:{'id':1,'name':'INSAT'},poste:'Graphic Designer',addresse:'sfax',description:'description' },
    { id: 2,entreprise:{'id':1,'name':'Headit'},poste:'Graphic Designer',addresse:'tunis',description:'description' },
    { id: 3,entreprise:{'id':1,'name':'Isamm'},poste:'Graphic Designer',addresse:'sfax',description:'description' },
    { id: 1,entreprise:{'id':1,'name':'Isamm'},poste:'Graphic Designer',addresse:'sfax' ,description:'description'},
    { id: 1,entreprise:{'id':1,'name':'GOOGLE'},poste:'Graphic Designer',addresse:'sfax',description:'description' },
  ];
  // search offers based on selected postes
  getOffers(postes):Observable<any[]>{
      return of(this.offers);
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

  getoffers(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getOffer(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postOffer(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateOffer(data, id): Observable<any> {
    return this.http.put(`${apiUrl}/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteOffer(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
