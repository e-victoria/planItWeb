import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CreateTaskComponent} from './tasks/create-task/create-task.component';
import {TaskDetailsComponent} from './tasks/task-details/task-details.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create-task', component: CreateTaskComponent},
  {path: 'task-detail/:id', component: TaskDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
