import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './task-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import ITask from '../models/task';
import {TaskStatusesEnum} from '../enums/TaskStatuses.enum';
import {TaskPrioritiesEnum} from '../enums/TaskPriorities.enum';
import {TasksService} from '../tasks.service';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let service: TasksService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
    service = TestBed.inject(TasksService);
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return task by ID', () => {
    const task1: ITask = {
      id: 0,
      title: 'Create to-do app',
      description: 'Task for recruitment process for a job.',
      status: TaskStatusesEnum.InProgress,
      priority: TaskPrioritiesEnum.High,
      deadline: '06.07.2020'
    };

    const task2: ITask = {
      id: 1,
      title: 'Write tests',
      description: 'Task for recruitment process for a job.',
      status: TaskStatusesEnum.InProgress,
      priority: TaskPrioritiesEnum.High,
      deadline: '06.07.2020'
    };

    spyOn(service, 'getAllTasks').and.returnValue([task1, task2]);

    expect(service.getTaskById(0)).toEqual(task1);
  });
});
