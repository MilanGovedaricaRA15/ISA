import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service.service'
import { Role, User } from '../../model/user';

@Component({
  selector: 'app-register-form-client',
  templateUrl: './register-form-client.component.html',
  styleUrls: ['./register-form-client.component.css']
})
export class RegisterFormClientComponent implements OnInit {

  registerForm:any;
  user: User;
  passwordTheSame: boolean = false;
  userExists: boolean = false;

  @Output() registerClient = new EventEmitter<string>();

  constructor(private userService: UserService) {
    this.user = new User();
    this.user.role = Role.client;
  }
  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "firstName": new FormControl(null, [Validators.required,Validators.pattern('[A-ZŠĐČĆŽ]{1}[a-zšđčćž]+')]),
      "lastName": new FormControl(null, [Validators.required,Validators.pattern('[A-ZŠĐČĆŽ]{1}[a-zšđčćž]+')]),
      "email": new FormControl(null, [Validators.required,Validators.email]),
      "mobileNumber": new FormControl(null, [Validators.required,Validators.pattern('[0-9]{6,14}')]),
      "country": new FormControl(null, [Validators.required,Validators.pattern('[A-ZŠĐČĆŽ]{1}[a-zšđčćž]+( [A-ZŠĐČĆŽa-zšđčćž]{1}[a-zšđčćž]*)*')]),
      "city": new FormControl(null, [Validators.required,Validators.pattern('[A-ZŠĐČĆŽ]{1}[a-zšđčćž]+( [A-ZŠĐČĆŽa-zšđčćž]{1}[a-zšđčćž]*)*')]),
      "address": new FormControl(null, [Validators.required,Validators.pattern('([A-ZŠĐČĆŽ]{1}[a-zšđčćž]+ )+[0-9]+')]),
      "password": new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]),
      "password2": new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]),
    });
  }

  validatePass(){
    if (this.registerForm.get('password').value === this.registerForm.get('password2').value) {
       this.passwordTheSame = true;
    }
    else {
      this.passwordTheSame = false;
    }
  }
  

  submitData()
  {
    if(this.passwordTheSame){
      this.userService.registerClient(this.user).subscribe(result => {
        if(result === 'user_already_registered'){
          this.userExists = true;
        }
        else if(result === 'user_registered'){
          this.userExists = false;
          this.registerClient.emit('user_registered');
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
  get password() {
    return this.registerForm.get('password');
  }
  get password2() {
    return this.registerForm.get('password2');
  }

}
