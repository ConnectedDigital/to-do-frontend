import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../../shared/models/todo.model';
import {TodoService} from '../../shared/services/todo.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, DoCheck, OnDestroy {
  getTasksSubscription: Subscription;
  todos: Todo[];
  completedTodos: Todo[] = [];
  pendingTodos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTasksSubscription = this.todoService.getTasks().subscribe(todos => {
      this.todos = todos;

      for (const todo of this.todos) {
        if (todo.completed) {
          this.completedTodos.push(todo);
        } else {
          this.pendingTodos.push(todo);
        }
      }
    });
  }

  ngDoCheck() {
    if (this.todos) {
      for (const todo of this.pendingTodos) {
        if (todo.completed) {
          this.completedTodos.push(todo);
          this.pendingTodos.slice(this.pendingTodos.indexOf(todo), 1);
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.getTasksSubscription !== undefined) {
      this.getTasksSubscription.unsubscribe();
    }
  }
}
