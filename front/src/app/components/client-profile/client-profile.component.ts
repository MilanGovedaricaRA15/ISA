import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  @Input() clientAuthenticated: User;
  client: User;
  viewInformation: boolean = true;
  editInformation: boolean = false;
  passwordChange: boolean = false;
  oldPasswordMatch: boolean = false;
  passwordTheSame: boolean = false;

  registerForm: any;
  changePasswordForm: any;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    if(this.clientAuthenticated == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("clientToShowAuthenticated")).subscribe(ret =>{
        this.client = ret;
      })
    } else {
      this.userService.getUserByEmail(this.clientAuthenticated.email).subscribe(ret =>{
        this.client = ret;
      })
    }
    this.registerForm = new FormGroup({
      "firstName": new FormControl(null, [Validators.required,Validators.pattern('[A-ZŠĐČĆŽ]{1}[a-zšđčćž]+')]),
      "lastName": new FormControl(null, [Validators.required,Validators.pattern('[A-ZŠĐČĆŽ]{1}[a-zšđčćž]+')]),
      "mobileNumber": new FormControl(null, [Validators.required,Validators.pattern('[0-9]{6,14}')]),
      "country": new FormControl(null, [Validators.required,Validators.pattern('[A-ZŠĐČĆŽ]{1}[a-zšđčćž]+( [A-ZŠĐČĆŽa-zšđčćž]{1}[a-zšđčćž]*)*')]),
      "city": new FormControl(null, [Validators.required,Validators.pattern('[A-ZŠĐČĆŽ]{1}[a-zšđčćž]+( [A-ZŠĐČĆŽa-zšđčćž]{1}[a-zšđčćž]*)*')]),
      "address": new FormControl(null, [Validators.required,Validators.pattern('([A-ZŠĐČĆŽ]{1}[a-zšđčćž]+ )+[0-9]+')]),
    });

    this.changePasswordForm = new FormGroup({
      "oldPassword": new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]),
      "newPassword": new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]),
      "newPassword2": new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]),
    });
  }
  
  editInformations() : void {
    this.viewInformation = false;
    this.editInformation = true;
  }

  editPassword() : void {
    this.viewInformation = false;
    this.passwordChange = true;
  }

  validatePass(){
    if (this.changePasswordForm.get('newPassword').value === this.changePasswordForm.get('newPassword2').value) {
       this.passwordTheSame = true;
    }
    else {
      this.passwordTheSame = false;
    }
  }

  validateOldPassword(){
    let passwordEl = <HTMLInputElement> document.getElementById('oldPassword');
    let password = passwordEl.value;
    if (password === this.client.password) {
      this.oldPasswordMatch = true;
    } else {
      this.oldPasswordMatch = false;
      alert('Wrong password!');
    }
  }

  changePassword() : void {
    if (!this.oldPasswordMatch) {
      alert('You wrote the wrong old password!');
    }
    if (!this.passwordTheSame) {
      alert('Your repeated new password is not the same as the new password!');
    }
    if (this.oldPasswordMatch && this.passwordTheSame) {
      let oldPassword = this.client.password;
      this.client.password = this.newPassword.value;
      this.userService.changePassword(this.client, oldPassword).subscribe(ret => {
        if (ret) {
          this.passwordChange = false;
          this.viewInformation = true;
          this.oldPassword.value = "";
          this.newPassword.value = "";
          this.newPassword2.value = "";
        }
      })
    }
    
  }

  changeInformations() : void {
    let passwordEl = <HTMLInputElement> document.getElementById('password');
    let password = passwordEl.value;
    if (password === this.client.password) {
      this.userService.change(this.client).subscribe(ret => {
        if (ret) {
          alert('Informations successfully changed!')
        }
      })
      this.viewInformation = true;
      this.editInformation = false;
    } else {
      alert('Wrong password!');
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

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get newPassword2() {
    return this.changePasswordForm.get('newPassword2');
  }

}
