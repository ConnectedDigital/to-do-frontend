import { Component, OnInit } from '@angular/core';
import {Todo} from '../../shared/models/todo.model';
import {TodoService} from '../../shared/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  todos: Todo[];
  completedTodos: Todo[] = [];
  pendingTodos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTasks().subscribe(todos => {
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

}
