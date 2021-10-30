import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user-service.service'
import { User } from '../../model/user';




@Component({
  selector: 'app-registerForm',
  templateUrl: './registerForm.component.html',
  styleUrls: ['./registerForm.component.css']
})
export class RegisterFormComponent implements OnInit {

  user: User;
  passwordTheSame: boolean = false;
  userExists: boolean = false;
  @Output() register = new EventEmitter<string>();

  constructor(private userService: UserService) {
    this.user = new User();
  }

  registerForm:any;

  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "firstName": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "lastName": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "email": new FormControl(null,[Validators.required,Validators.email]),
      "mobileNumber": new FormControl(null,[Validators.required,Validators.pattern('[0-9]{9}')]),
      "country": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "city": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "address": new FormControl(null,[Validators.required,Validators.pattern('([A-ZŠĐČĆŽ]{1}[a-zšđčćž]+ )+[0-9]+')]),
      "role": new FormControl(null,[Validators.required]),
      "password": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "password2": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "reason": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')])
    });

    
   
  }

  validatePass(){
    if(this.registerForm.get('password').value === this.registerForm.get('password2').value) {
       this.passwordTheSame = true;
    }
    else{
      this.passwordTheSame = false;
    }
  }
  

  submitData()
  {
    if(this.passwordTheSame){
      this.userService.register(this.user).subscribe(result => {
        if(result === 'user_already_registered'){
          this.userExists = true;
        }
        else if(result === 'user_registered'){
          this.userExists = false;
          this.register.emit('user_registered');
        }
      });
   }
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get mobileNumber(){
    return this.registerForm.get('mobileNumber');
  }
  get city() {
    return this.registerForm.get('city');
  }
  get country() {
    return this.registerForm.get('country');
  }
  get address() {
    return this.registerForm.get('address');
  }
  get role() {
    return this.registerForm.get('role');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get password2() {
    return this.registerForm.get('password2');
  }
  get reason() {
    return this.registerForm.get('reason');
  }

  
 



}
