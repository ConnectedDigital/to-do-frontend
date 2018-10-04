import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Todo} from '../models/todo.model';

@Injectable()
export class TodoService {
  token = localStorage.getItem('token');

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('/api/todos');
  }

  getTask(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>('/api/todos/' + id);
  }

  addTask(task: Todo): Observable<Todo> {
    const headers = new HttpHeaders()
      .append('x-auth', this.token);

    return this.httpClient.post<Todo>('/api/todos', task, {
      headers: headers
    });
  }

  completeTask(id: string, task: any): Observable<any> {
    const headers = new HttpHeaders()
      .append('x-auth', this.token);

    return this.httpClient.put<any>('/api/todos/' + id, task, {
      headers: headers
    });
  }
}
