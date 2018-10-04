import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {TodoService} from '../../shared/services/todo.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../../shared/models/todo.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit, OnDestroy {
  addTaskSubscription: Subscription;
  addTaskForm: FormGroup;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
     this.addTaskForm = new FormGroup({
       'task': new FormControl(null, Validators.required)
     });
  }

  onSubmit() {
    const task = this.addTaskForm.get('task').value;
    const completed = false;

    const todo = new Todo(task, completed, null);

    this.addTaskSubscription = this.todoService.addTask(todo)
      .subscribe(res => console.log(res),
        error => console.log(error));
  }

  ngOnDestroy() {

  }
}
