import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Administrator } from 'src/app/model/administrator';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user: User;
  administrator: Administrator;
  userDoesntExists: boolean = false;
  @Output() login = new EventEmitter<string>();
  @Output() profileAdministrator = new EventEmitter<string>();

  constructor(private userService:UserService) {
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
        this.userService.login(this.user).subscribe( result =>  {
          if(result === 'user_not_found'){
            this.userDoesntExists = true;
          }
          else if(result === 'user_found'){
            this.userDoesntExists = false;
            this.userService.authenticate(this.user.email);
            this.userService.isCottageAdvertiserLoggedIn().subscribe(res =>{
              if(res){
                this.login.emit('cottageAdvertiser');
              }
            });
            this.userService.isAdministratorLoggedIn().subscribe(res =>{
              if(res){
                this.profileAdministrator.emit('administrator');
              }
            });
            this.userService.isSuperiorAdministratorLoggedIn().subscribe(res =>{
              if(res){
                //this.login.emit('administratorSuperior');
              }
            });
            this.userService.isNewAdministratorLoggedIn().subscribe(res =>{
              if(res){
                //this.login.emit('administratorFirstLogged');
              }
            });
          
              
            
      //      this.userService.isBoatAdvertiserLoggedIn()
      //       this.login.emit('boatAdvertiser');
            
          }
        
        });
        this.userDoesntExists = true;
    }

  get password() {
      return this.loginForm.get('password');
  }
  get email(){
      return this.loginForm.get('email');
  }

}
