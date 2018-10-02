import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Todo} from '../models/todo.model';

@Injectable()
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('/api/todos');
  }

  getTask(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>('/api/todos/' + id);
  }

  addTask(task: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>('/api/todos', task);
  }

  completeTask(task: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>('/api/todos', task);
  }
}
