import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {TodoService} from '../../../shared/services/todo.service';
import {Todo} from '../../../shared/models/todo.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  completeTaskSubscription: Subscription;

  @Input() todo: Todo;
  @Input() task: string;
  @Input() completed: boolean;
  @Input() completedBy: string;
  @Input() _id: string;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  onCompleteTask() {
    this.completed = true;

    this.completeTaskSubscription = this.todoService.completeTask(this._id, {completed: this.completed})
      .subscribe(res => console.log(res),
        error => console.log(error));
  }

  ngOnDestroy() {
    if (this.completeTaskSubscription !== undefined) {
      this.completeTaskSubscription.unsubscribe();
    }
  }
}
