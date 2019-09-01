import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import User from '../Models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:8080/api';


  constructor(private http: HttpClient) { }

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
      role: 'ROLE_ENTREPRISE'
    };
    console.log(enterprise);
    return this.http.post<User>(`${this.authUrl}/auth/signup`, enterprise);
  }
  registerJobSeeker(user): Observable<any> {
    const jobSeeker = {
      username: user.username,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      age: user.age,
      role: 'ROLE_USER'
    };
    console.log(jobSeeker);
    return this.http.post<User>(`${this.authUrl}/auth/signup`, jobSeeker);
  }

  logout() {
    localStorage.removeItem('token');
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

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.authUrl}/user/me`);
  }
  
  getUser(id): Observable<User>{
    return this.http.get<User>(`${this.authUrl}/users/${id}`);
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
