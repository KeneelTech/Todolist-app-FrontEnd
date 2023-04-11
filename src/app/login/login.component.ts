import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Api }
import { Component } from "@angular/core";

@Component({
    selector: 'app-login',
    templateUrl: './login.Component.html',
    styleUrls: ['./login.Component.scss'],
})

export class LoginComponent {
    form = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
    });

    constructor(private apiService: ApiService, private router: Router){}

    submitform(){
        if (this.form.invalid){
            return;
        }

        this.apiService
            .login(this.form.get('username')?.value, this.form.get('password')?.value)
            .subscribe((response) => {
                this.router.navigate(['http://localhost:9000/tasks']);
            });



    }

    






}