import { Injectable } from '@angular/core';
import { Subject, AsyncSubject, BehaviorSubject, ReplaySubject,Observable, throwError} from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/api/jobDemande';
@Injectable({
  providedIn: 'root'
})

export class JobDemandeService {

  constructor(private http:HttpClient) { }
  
  jobDemandes = [
    { id: 1, sender:{'id':1,'name':'Tawfik'},poste:'Graphic Designer',addresse:'sfax',description:'description' },
    { id: 2,sender:{'id':1,'name':'Mahmoud'},poste:'Gamer',addresse:'tunis',description:'description' },
    { id: 3,sender:{'id':1,'name':'Issam'},poste:'Web dev',addresse:'sfax',description:'description' },
    { id: 1,sender:{'id':1,'name':'Sami'},poste:'engineer',addresse:'sfax' ,description:'description'},
    { id: 1,sender:{'id':1,'name':'Khairi'},poste:'Graphic Designer',addresse:'sfax',description:'description' },
  ];
 

   
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

  private eventCallback = new BehaviorSubject<any>('')
  eventCallback$ = this.eventCallback.asObservable();
  emitJobDemande(jobDemande){
      this.eventCallback.next(jobDemande);
   }
 
   getJobDemandes(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
     // return of(this.jobDemandes);
  }
// get job demandes sended to current entrep
  getMyJobDemandes(): Observable<any>{
    return this.http.get("http://localhost:8080/api/enterprise/me/jobDemandes", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getMyConfirmedJobDemandes():Observable<any>{
    return this.http.get("http://localhost:8080/api/enterprise/me/jobDemandes", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getJobDemande(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postJobDemande(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateJobDemande(data, id): Observable<any> {
    return this.http.put(`${apiUrl}/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteJobDemande(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
