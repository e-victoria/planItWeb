import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TasksService} from '../tasks.service';
import INewTask from '../models/newTask';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {

  newTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl(''),
    status: new FormControl(''),
    deadline: new FormControl(''),
    priority: new FormControl('')
  });

  constructor(private router: Router, private tasksService: TasksService) { }

  get title() {
    return this.newTaskForm.get('title');
  }

  ngOnInit(): void {
  }

  close(event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  saveTask(event) {
    event.preventDefault();
    const newTask: INewTask = this.newTaskForm.value;
    if (this.newTaskForm.valid)  {
      this.tasksService.saveTask(newTask);
    }
  }

  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a title';
    }

    return this.title.hasError('required') ? 'Title is required' : '';
  }

}
