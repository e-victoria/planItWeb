import {Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TasksService} from '../tasks.service';
import INewTask from '../models/newTask';
import ITask from '../models/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {

  isSaved = false;
  isSubmitted = false;
  newTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl(''),
    status: new FormControl(''),
    deadline: new FormControl(null),
    priority: new FormControl('')
  });

  constructor(private router: Router, private tasksService: TasksService) { }

  get title() {
    return this.newTaskForm.get('title');
  }

  ngOnInit(): void {
    this.setDefaultValues();
  }

  setDefaultValues() {
    this.newTaskForm.get('status').setValue(0);
    this.newTaskForm.get('priority').setValue(1);
  }

  setValue(inputName: string, status: number) {
    this.newTaskForm.get(inputName).setValue(status);
  }

  close(event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  saveTask(event) {
    event.preventDefault();
    this.isSubmitted = true;
    const newTask: ITask = this.newTaskForm.value;
    if (this.newTaskForm.valid)  {
      this.tasksService.saveTask(newTask);
      this.isSaved = true;
      console.log(newTask);
    }
  }

  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a title';
    }

    return this.title.hasError('required') ? 'Title is required' : '';
  }

}
