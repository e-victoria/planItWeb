import {Component, OnInit} from '@angular/core';
import {TaskStatusesEnum} from './enums/TaskStatuses.enum';
import {TaskPrioritiesEnum} from './enums/TaskPriorities.enum';
import ITask from './models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasksList: ITask[] = [];
  constructor() { }

  ngOnInit(): void {
    this.tasksList.push(this.createDefaultTask());
  }

  createDefaultTask(): ITask {
    const newTask: ITask = {
      id: '0',
      title: 'Create to-do app',
      description: 'Task for recruitment process for a job.',
      status: TaskStatusesEnum.InProgress,
      priority: TaskPrioritiesEnum.High,
      deadline: '06.07.2020'
    };

    return newTask;
  }

}
