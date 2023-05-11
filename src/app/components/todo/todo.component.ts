import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth-guard.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [AuthGuard]
})
export class TodoComponent implements OnInit{

  Task!:any;
  todos!: any;
  inputTodo: any;
  constructor(private http: HttpClient, private router: Router) { }


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
    location.reload();
    return this.http.post('http://localhost:9000/tasks/addTask', { task: this.inputTodo }).subscribe({
      error: err => console.error(err),
    });
  }
  
  showTask(){
    return this.http.get('http://localhost:9000/tasks/:id');
  }
  
  edit(todo: any){
    location.reload();
    const id = todo.id
    this.http.put(`http://localhost:9000/tasks/edit/${id}`, {task: this.inputTodo}).subscribe({
      error: err => console.error(err)
    });
  }
  
  deleteTask(todo: any){
    location.reload();
    const id = todo.id;
    this.http.delete(`http://localhost:9000/tasks/deleteTask/${id}`).subscribe({
      error: err => console.error(err)
    });
  }


  signOut() {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.clear();
    this.router.navigate(['/login']);
    
  }




}
