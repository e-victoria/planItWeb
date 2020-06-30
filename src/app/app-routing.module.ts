import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CreateTaskComponent} from './tasks/create-task/create-task.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create-task', component: CreateTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
