import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
