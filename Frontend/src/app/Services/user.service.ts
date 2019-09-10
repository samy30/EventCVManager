import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject,of } from 'rxjs';
import User from '../Models/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class UserService {
  authUrl = 'http://localhost:49320/api';
  userUrl  = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

 

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/user/me`);
  }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/user/users`);
  }
  addUser(newUser): Observable<User>{
    return this.http.post<User>(`${this.userUrl}/ApplicationUsers/register`,newUser);
  }
  deleteUser(id): Observable<User>{
    return this.http.delete<User>(`${this.userUrl}/ApplicationUsers/${id}`);
  }
  updateUser(id,updatedUser): Observable<User>{
    return this.http.put<User>(`${this.userUrl}/user/${id}`,updatedUser);
  }
  getUser(id): Observable<User>{
    return this.http.get<User>(`${this.userUrl}/ApplicationUsers/${id}`);
  }
}
