import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet, Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {



  

  title = 'TodoList-app';

}

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoComponent }
];