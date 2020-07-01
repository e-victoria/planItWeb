import { Injectable } from '@angular/core';
import INewTask from './models/newTask';
import ITask from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  saveTask(newTask: INewTask) {
    let tasks: ITask[] = JSON.parse(localStorage.getItem('tasks'));
    const tasksIds: number[] = [];
    if (tasks) {
      for (const task of tasks) {
        tasksIds.push(task.id);
      }
      newTask['id'] = this.generateId(tasksIds);
      const taskToSave: ITask = newTask as ITask;
      tasks.push(taskToSave);
    } else {
      newTask['id'] = 0;
      const taskToSave: ITask = newTask as ITask;
      tasks = [taskToSave];
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  generateId(tasksIds: number[]): number {
    let newId = 0;
    for (const taskId of tasksIds) {
      if (newId === taskId) {
        newId++;
      } else {
        return newId;
      }
    }

    return newId;
  }

  getTaskById(id: number): ITask {
    const tasks: ITask[] = this.getAllTasks();
    for (const task of tasks) {
      if (task.id === id) {
        return task;
      }
    }
  }

  getAllTasks(): ITask[] {
    return JSON.parse(localStorage.getItem('tasks'));
  }

}
