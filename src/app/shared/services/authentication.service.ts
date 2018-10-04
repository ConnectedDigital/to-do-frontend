import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  jwt: JwtHelper = new JwtHelper();

  constructor(private httpClient: HttpClient) { }

  getToken(email: string, password: string): Observable<AuthResult> {
    const data = {
      email: email,
      password: password
    };

    return this.httpClient.post<AuthResult>('/api/auth', data);
  }

  logIn(token: string) {
    const decodedToken = this.jwt.decodeToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('id', decodedToken._id);
    localStorage.setItem('username', decodedToken.username);
  }

  signUp(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/users', user);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
  }
}

export interface AuthResult {
  token: string;
}
