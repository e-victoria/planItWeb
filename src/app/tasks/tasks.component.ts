import {Component, OnInit} from '@angular/core';
import {TaskStatusesEnum} from './enums/TaskStatuses.enum';
import {TaskPrioritiesEnum} from './enums/TaskPriorities.enum';
import ITask from './models/task';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TasksService} from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasksList: ITask[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksList = this.tasksService.getAllTasks();
    this.tasksList.push(this.createDefaultTask());
  }

  createDefaultTask(): ITask {
    const newTask: ITask = {
      id: 0,
      title: 'Create to-do app',
      description: 'Task for recruitment process for a job.',
      status: TaskStatusesEnum.InProgress,
      priority: TaskPrioritiesEnum.High,
      deadline: '06.07.2020'
    };

    return newTask;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasksList, event.previousIndex, event.currentIndex);
  }

}
