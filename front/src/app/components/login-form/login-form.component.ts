import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user: User;
  userDoesntExists: boolean = false;

  constructor(private userService: UserService) {
    this.user = new User();
  }

  loginForm:any;

  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl(null,[Validators.required,Validators.email]),
      "password": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')])
    });
  }


  submitData()
    {
        this.userService.login(this.user).subscribe(result => {
          if(result === 'user_not_found'){
            this.userDoesntExists = true;
          }
          else if(result === 'user_found'){
            this.userDoesntExists = false;
          }
        });
    }

  get password() {
      return this.loginForm.get('password');
  }
  get email(){
      return this.loginForm.get('email');
  }

}
