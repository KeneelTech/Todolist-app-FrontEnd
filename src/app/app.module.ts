import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


export class TaskComponent {
  title = 'Todo Task List';


  
}

@Injectable()
export class Myrequest {

constructor(private http: HttpClient){}

index(){
  return this.http.get('/tasks');
}

addTask(data: any){
  return this.http.post('/tasks/addTask', data);
}

showTask(){
  return this.http.get('/tasks/:id');
}

edit(data: any){
  this.http.put('/tasks/edit/:id', data).subscribe(
  response => {
    console.log('Edit request successful:', response);
  },
  error => {
    console.error('Error making edit request:', error);
  }
);
}

deleteTask(){
  this.http.delete('/tasks/deleteTask/:id').subscribe(
  response => {
    console.log('DELETE request successful:', response);
  },
  error => {
    console.error('Error making DELETE request:', error);
  }
);
}

}