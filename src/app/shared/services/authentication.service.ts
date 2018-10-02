import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(email: string, password: string): Observable<string> {
    const data = {
      email: email,
      password: password
    };

    return this.httpClient.post<string>('/api/auth', data);
  }
}
