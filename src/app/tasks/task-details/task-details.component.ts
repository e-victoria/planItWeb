import {Component, OnInit} from '@angular/core';
import ITask from '../models/task';
import {Router} from '@angular/router';
import {TasksService} from '../tasks.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskStatusesEnum} from '../enums/TaskStatuses.enum';
import {TaskPrioritiesEnum} from '../enums/TaskPriorities.enum';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  private id: number;
  task: ITask;
  isSubmitted = false;
  editTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl(''),
    status: new FormControl(''),
    deadline: new FormControl((new Date()).toISOString()),
    priority: new FormControl('')
  });

  constructor(private router: Router, private tasksService: TasksService) { }

  ngOnInit(): void {
    this.id = Number.parseInt(this.router.url.split('/').pop());
    this.task = this.tasksService.getTaskById(this.id);
    this.setDefaultInputValues();
  }

  getTaskStatus(): string {
    if (this.task.status === TaskStatusesEnum.ToDo) {
      return 'To do';
    } else if (this.task.status === TaskStatusesEnum.InProgress) {
      return 'In progress';
    } else {
      return 'Done';
    }
  }

  getTaskPriority(): string {
    if (this.task.priority === TaskPrioritiesEnum.Low) {
      return 'Low';
    } else if (this.task.priority === TaskPrioritiesEnum.Moderate) {
      return 'Moderate';
    } else {
      return 'Low';
    }
  }

  get title() {
    return this.editTaskForm.get('title');
  }

  setDefaultInputValues() {
    for (const key of Object.keys(this.task)) {
      this.editTaskForm.get(key)?.setValue(this.task[key]);
    }
  }

  close(event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  setValue(inputName: string, value: any) {
    this.editTaskForm.get(inputName).setValue(value);
  }

  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a title';
    }

    return this.title.hasError('required') ? 'Title is required' : '';
  }

  saveTaskChanges(event) {
    event.preventDefault();

    const changedTask: ITask = this.editTaskForm.value;
    if (this.editTaskForm.valid)  {
      changedTask.id = this.id;
      this.tasksService.saveChangedTask(changedTask);
    }
  }

  deleteTask(event) {
    event.preventDefault();
    this.tasksService.deleteTask(this.id);
  }

}
