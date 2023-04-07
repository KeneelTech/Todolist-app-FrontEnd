import { Component, OnInit } from '@angular/core';
import { Task } from "./../../models/Task"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

  Task!:any;
  todos!: any;
  inputTodo: string = "";
  constructor(private http: HttpClient) { }


  ngOnInit(): void {
      this.index().subscribe(
        { next:resp => this.todos=resp,
          complete:()=> console.log(this.todos)
        }

      );
  }

  toggleDone (id:number) {
    this.todos.map((v: { completed: boolean; }, i: number) =>{
      if(i == id) v.completed = !v.completed;

      return v;
    })
  }

deleteTodo (id:number) {
  this.todos = this.todos.filter((v: any,i: number) => i !==id);
}

  addTodo () {
    this.todos.push({
      content:this.inputTodo,
      completed:false
    });

    this.inputTodo ="";
  }

  index(){
    return this.http.get('http://localhost:9000/tasks')
  }
  
  addTask(){
    return this.http.post('http://localhost:9000/tasks/addTask', {Task.title }).subscribe({
      error: err => console.error(err)
    });
  }
  
  showTask(){
    return this.http.get('http://localhost:9000/tasks/:id');
  }
  
  edit(data: any){
    this.http.put('http://localhost:9000/tasks/edit/:id', data).subscribe({
      error: err => console.error(err)
    });
  }
  
  deleteTask(data: any){
    this.http.delete('http://localhost:9000/tasks/deleteTask/' +data).subscribe({
      error: err => console.error(err)
    });
  }

}
