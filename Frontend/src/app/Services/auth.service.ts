import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, Subject, throwError} from 'rxjs';

import User from '../Models/user';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  authUrl = 'http://localhost:8080/api';

  private eventCallback = new Subject<any>();
  eventCallback$ = this.eventCallback.asObservable();

  login(user: User): Observable<any> {
    const authRequest = {
      usernameOrEmail : user.username,
      password: user.password
    };
    return this.http.post<any>(`${this.authUrl}/auth/signin`, authRequest);
  }

  register(user): Observable<any> {
     return this.http.post<User>(`${this.authUrl}/auth/register`, user);
    // return fake token to be able to connect
   // return of({token: 'michoumicha'});
  }
  registerEnterprise(user): Observable<any> {
    const enterprise = {
      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name,
      description: user.description,
      activity: user.activity,
      role: 'ROLE_ENTERPRISE'
    };
    console.log(enterprise);
    return this.http.post<User>(`${this.authUrl}/auth/signup`, enterprise);
  }
  registerJobSeeker(user, captchaResponse): Observable<any> {
    const jobSeeker = {
      username: user.username,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      age: user.age,
      captchaResponse,
      town: user.town,
      role: 'ROLE_USER'
    };
    console.log(jobSeeker);
    return this.http.post<User>(`${this.authUrl}/auth/signup`, jobSeeker);
  }

  logout() {
    this.updateUserNotificationToken(JSON.parse(localStorage.getItem('currentUser')).id, '').subscribe(res => {
    console.log('notification token deleted');
    });
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !! this.getToken();
  }

 setToken(token) {
     localStorage.setItem('token', token);
  }

  setCurrentUser(user) {// save it in localstorage
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      JSON.parse(localStorage.getItem('currentUser'));
    } else {
      localStorage.setItem('currentUser', null);
      JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/user/me`);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(`${this.authUrl}/user/${id}`);
  }

  informUserAuthentication(flag) {
    this.eventCallback.next(flag);
  }


  isAuthorized(allowedRoles: string[]): boolean {
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }
    let currentUserRoles = [];
    let user;
    user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.authorities) { currentUserRoles = user.authorities.map(a => a.authority); }
    return currentUserRoles.every(value => (allowedRoles.indexOf(value) >= 0));
  }

  updateUser(id, updatedUser): Observable<User> {
    return this.http.put<User>(`${this.authUrl}/ApplicationUsers/${id}`, updatedUser);
  }

  updateEnterprise(id, updatedEnterprise): Observable<User> {
    const enterprise = {

      email: updatedEnterprise.email,
      name: updatedEnterprise.name,
      description: updatedEnterprise.description,
      activity: updatedEnterprise.activity,
    };
    console.log(enterprise);
    return this.http.put<User>(`${this.authUrl}/ApplicationUsers/${id}`, updatedEnterprise);
  }

  updateUserNotificationToken(id, newToken): Observable<any> {
    const notificationToken = {
      token: newToken
    };
    return this.http.put(`${this.authUrl}/users/${id}/notificationToken`, notificationToken).pipe(
      catchError(this.handleError)
    );
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
}
