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

  saveChangedTask(changedTask: ITask) {
    const savedTasks = this.getAllTasks();
    for (const task of savedTasks) {
      if (task.id === changedTask.id) {
        const taskIndex = savedTasks.indexOf(task);
        savedTasks[taskIndex] = changedTask;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        break;
      }
    }
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

  deleteTask(taskId: number): void {
    const tasks: ITask[] = this.getAllTasks();
    for (const task of tasks) {
      if (task.id === taskId) {
        const taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, taskIndex + 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        break;
      }
    }
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

  sort(tasksList: ITask[]) {
    tasksList.sort((a: ITask, b: ITask) => {
      return this.getTime(new Date(b.deadline)) - this.getTime(new Date(a.deadline));
    });
  }

}
