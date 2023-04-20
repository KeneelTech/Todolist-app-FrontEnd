import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent {
    username: any;
    password: any;
    

    constructor(private http: HttpClient, private router: Router) { }


    ngOnInit() {
      if (localStorage.getItem("token")) {
        this.router.navigate(['tasks']);
      }
    }
    

    login(){
        const credentials = { username: this.username, password: this.password };
        this.http.post('http://localhost:9000/login', credentials)
          .subscribe({
          next: (response: any) => {
            localStorage.setItem('token', response.token); 
            this.router.navigate(['tasks']); 
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }



      signup() {
        const credentials = { username: this.username, password: this.password };
        this.http.post('http://localhost:9000/signup', credentials)
          .subscribe({
          next: (response: any) => {
            localStorage.setItem('token', response.token); 
            this.router.navigate(['http://localhost:9000/tasks']); 
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }
      

}





