import { Injectable } from '@angular/core';
import { Subject, AsyncSubject, BehaviorSubject, ReplaySubject,Observable, throwError} from 'rxjs';
import { of } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/api/notification';
@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private http:HttpClient) { }

  notifications = [
    { id: 1, entreprise:{'id':1,'name':'INSAT'},poste:'Graphic Designer' },
    { id: 2,entreprise:{'id':1,'name':'Headit'},poste:'Gamer'},
    { id: 3,entreprise:{'id':1,'name':'Isamm'},poste:'Graphic Designer' },
    { id: 1,entreprise:{'id':1,'name':'Isamm'},poste:'Gamer'},
    { id: 1,entreprise:{'id':1,'name':'GOOGLE'},poste:'Graphic Designer'},
    { id: 1, entreprise:{'id':1,'name':'INSAT'},poste:'Gamer' },
    { id: 2,entreprise:{'id':1,'name':'Headit'},poste:'Gamer'},
    { id: 3,entreprise:{'id':1,'name':'Isamm'},poste:'Graphic Designer' },
    { id: 1,entreprise:{'id':1,'name':'Isamm'},poste:'Graphic Designer'},
    { id: 1,entreprise:{'id':1,'name':'GOOGLE'},poste:'Graphic Designer'},
    { id: 1, entreprise:{'id':1,'name':'INSAT'},poste:'Web dev' },
    { id: 2,entreprise:{'id':1,'name':'Headit'},poste:'Graphic Designer'},
    { id: 3,entreprise:{'id':1,'name':'Isamm'},poste:'Graphic Designer' },
    { id: 1,entreprise:{'id':1,'name':'Isamm'},poste:'Graphic Designer'},
    { id: 1,entreprise:{'id':1,'name':'GOOGLE'},poste:'Web dev'},
    { id: 1, entreprise:{'id':1,'name':'INSAT'},poste:'Web dev' },
    { id: 2,entreprise:{'id':1,'name':'Headit'},poste:'Web dev'},
    { id: 3,entreprise:{'id':1,'name':'Isamm'},poste:'Graphic Designer' },
    { id: 1,entreprise:{'id':1,'name':'Isamm'},poste:'Web dev'},
    { id: 1,entreprise:{'id':1,'name':'GOOGLE'},poste:'Graphic Designer'}
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

  getNotifications(userId): Observable<any> {
    const url = `${apiUrl}/${userId}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  //emit notification
  /*
  private eventCallback = new Subject<any>()
  eventCallback$ = this.eventCallback.asObservable();
  emitNotification(notification) {
      this.eventCallback.next(notification);
   }*/

    //emit notification

  private eventCallback = new BehaviorSubject<any>('')
  eventCallback$ = this.eventCallback.asObservable();
  emitNotification(notification){
      this.eventCallback.next(notification);
   }

   private profileCallback=new BehaviorSubject<any>('');
   profileCallback$=this.profileCallback.asObservable();
   emitProfileChange(notification){
     this.profileCallback.next(notification);
   }

  getNotification(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postNotification(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  makeSeen(id):Observable<any>{
    return this.http.get(`${apiUrl}/${id}/seen`).pipe(
      catchError(this.handleError)
    );
  }

  updateNotification(data, id): Observable<any> {
    return this.http.put(`${apiUrl}/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteNotification(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getUnreadNotificationCount(id):Observable<any>{
         return this.http.get(`${apiUrl}/${id}/unseen`)
        .pipe(
          catchError(this.handleError)
        );
  }
  
  getSentNotifications(id):Observable<any>{

    return this.http.get(`${apiUrl}/sender/${id}`)
     .pipe(
      catchError(this.handleError)
    );

  }
}
