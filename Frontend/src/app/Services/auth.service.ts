import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject,of } from 'rxjs';
import User from '../Models/user';
import { error } from 'util';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:8080/api';


  constructor(private http: HttpClient) { }

  login(user:User): Observable<any> {
    console.log("authservice");
    console.log(user);
    let test = {
      usernameOrEmail : user.username,
      password : user.password
    }
    // return this.http.post<User>(`${this.authUrl}/auth/signin`, user);
    if(user.username=="admin"&&user.password=="admin")return of({token:"michoumicha"});
    return this.http.post<any>(`${this.authUrl}/auth/signin`, test, httpOptions);

  }

  register(user): Observable<any> {
    //return this.http.post<User>(`${this.authUrl}/auth/register`, user);
    //return fake token to be able to connect
    return of({token:"michoumicha"});
  }

  logout(){
    localStorage.removeItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  loggedIn(){
    return !! this.getToken();
  }

 setToken(token){
     localStorage.setItem('token',token);
  }




/*
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.userUrl}/ApplicationUsers/current`);
  }

  get checkUser(): boolean {
    console.log("ttttttttttt"+localStorage.getItem('jwtToken'));
    return localStorage.getItem('jwtToken') !== null;
  }

  get loggedInUser(): User {
    return this._loggedInUser;
  }
  getUsers(criteria): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/ApplicationUsers`);
  }
  addUser(newUser): Observable<User>{
    return this.http.post<User>(`${this.userUrl}/ApplicationUsers/register`,newUser);
  }
  deleteUser(id): Observable<User>{
    return this.http.delete<User>(`${this.userUrl}/ApplicationUsers/${id}`);
  }
  updateUser(id,updatedUser): Observable<User>{
    return this.http.put<User>(`${this.userUrl}/ApplicationUsers/${id}`,updatedUser);
  }
  getUser(id): Observable<User>{
    return this.http.get<User>(`${this.userUrl}/ApplicationUsers/${id}`);
  }*/

}
