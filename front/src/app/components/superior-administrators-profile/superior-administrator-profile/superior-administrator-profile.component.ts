import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { CottageService } from 'src/app/service/cottage-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-superior-administrator-profile',
  templateUrl: './superior-administrator-profile.component.html',
  styleUrls: ['./superior-administrator-profile.component.css']
})
export class SuperiorAdministratorProfileComponent implements OnInit {

  constructor(private userService: UserService, private cottageService: CottageService) { }

  editAdministratorForm:any;
  editPasswordForm:any;
  administrator: User;
  administratorChange: User;
  passwordChange:User;
  wrongPassword1: Boolean;
  wrongPassword2: Boolean;
  wrongPassword: Boolean;
  alreadySent: Boolean;
  allUsers: Array<User>;
  allCottages: any;
  allBoats: any;

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.userService.getLoggedUser().subscribe(ret => {
      this.administrator = ret;
      this.administratorChange = JSON.parse(JSON.stringify(this.administrator));
      this.administratorChange.password = "";
      this.passwordChange = JSON.parse(JSON.stringify(this.administrator));
      this.passwordChange.password = "";
      this.wrongPassword1 = false;
      this.wrongPassword2 = false;
      this.wrongPassword = false;
      this.alreadySent = false;
    });
    this.userService.getAllUsers().subscribe(usersFromBack =>{
      this.allUsers = usersFromBack;
    }); 
    this.cottageService.getAllCottages().subscribe(cottagesFromBack => {
      this.allCottages = cottagesFromBack;
    });

    this.editAdministratorForm = new FormGroup({
      "firstName": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "lastName": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "mobileNumber": new FormControl(null,[Validators.required,Validators.pattern('[0-9]{9}')]),
      "country": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "city": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "address": new FormControl(null,[Validators.required,Validators.pattern('([A-ZŠĐČĆŽ]{1}[a-zšđčćž]+ )+[0-9]+')]),
      "password": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "reason": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')])
    });
    this.editPasswordForm = new FormGroup({
      "currentPassword": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "newPassword": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "newPassword1": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')])
    });
  }

  submitData(){
    this.wrongPassword1 = true;
    this.userService.change(this.administratorChange).subscribe(ret =>{
      if(ret){
        this.wrongPassword1 = false;
        
      }
      else{
        
      }
    })
  }

  submitPassword(){
    this.wrongPassword = true;
    if(this.administrator.password == this.editPasswordForm.get('currentPassword').value){
      this.userService.changePassword(this.passwordChange,this.editPasswordForm.get('currentPassword').value).subscribe(ret =>{
        if(ret){
          this.wrongPassword = false;
          this.passwordChange.password = "";
          this.wrongPassword2 = false;
          this.editPasswordForm = new FormGroup({
            "currentPassword": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
            "newPassword": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
            "newPassword1": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')])
          });
        }
      })
    }
    else {
      this.wrongPassword = true;
    }
  }

  validatePass(){
    if(this.editPasswordForm.get('newPassword').value === this.editPasswordForm.get('newPassword1').value) {
       this.wrongPassword2 = false;
    }
    else{
      this.wrongPassword2 = true;
    }
  }


  get firstName() {
    return this.editAdministratorForm.get('firstName');
  }
  get lastName() {
    return this.editAdministratorForm.get('lastName');
  }
  get mobileNumber(){
    return this.editAdministratorForm.get('mobileNumber');
  }
  get city() {
    return this.editAdministratorForm.get('city');
  }
  get country() {
    return this.editAdministratorForm.get('country');
  }
  get address() {
    return this.editAdministratorForm.get('address');
  }
  get password() {
    return this.editAdministratorForm.get('password');
  }
  get reason() {
    return this.editAdministratorForm.get('reason');
  }
  get currentPassword() {
    return this.editPasswordForm.get('currentPassword');
  }
  get newPassword() {
    return this.editPasswordForm.get('newPassword');
  }
  get newPassword1() {
    return this.editPasswordForm.get('newPassword1');
  }
}
