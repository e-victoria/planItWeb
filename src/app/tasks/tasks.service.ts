import { Injectable } from '@angular/core';
import INewTask from './models/newTask';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  saveTask(newTask: INewTask) {
    console.log(newTask);
  }
}
