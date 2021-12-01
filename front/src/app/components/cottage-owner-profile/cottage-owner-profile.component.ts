import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountDeleteRequest } from 'src/app/model/account-delete-request';
import { Cottage } from 'src/app/model/cottage';
import { User } from 'src/app/model/user';
import { AccountDeleteRequestService } from 'src/app/service/account-delete-request-service.service';
import { CottageService } from 'src/app/service/cottage-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-cottage-owner-profile',
  templateUrl: './cottage-owner-profile.component.html',
  styleUrls: ['./cottage-owner-profile.component.css']
})
export class CottageOwnerProfileComponent implements OnInit {

  constructor(private userService: UserService,private cottageService: CottageService, private accountDeleteRequestService:AccountDeleteRequestService) { }

  owner: User;
  ownerChange: User;
  passwordChange:User;
  editOwnerForm:any;
  editPasswordForm:any;
  wrongPassword1: Boolean;
  wrongPassword2: Boolean;
  wrongPassword: Boolean;
  alreadySent: Boolean;
  nameForSearch: String;
  cottages: Array<Cottage>;
  @Output() cottageToShow = new EventEmitter<Cottage>();
  @Output() addNewCottageEmiter = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.init();
   
  }

  init(){
    this.userService.getLoggedUser().subscribe(ret => {
      this.owner = ret;
      this.ownerChange = JSON.parse(JSON.stringify(this.owner));
      this.ownerChange.password = "";
      this.passwordChange = JSON.parse(JSON.stringify(this.owner));
      this.passwordChange.password = "";
      this.wrongPassword1 = false;
      this.wrongPassword2 = false;
      this.wrongPassword = false;
      this.alreadySent = false;
      this.cottageService.getAllCottagesOfOwner().subscribe(ret => {
        this.cottages = ret;
        
      })
    })
    this.editOwnerForm = new FormGroup({
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
    this.userService.change(this.ownerChange).subscribe(ret =>{
      if(ret){
        this.wrongPassword1 = false;
        
      }
      else{
        
      }
    })

  }

  submitPassword(){
    this.wrongPassword = true;
    if(this.owner.password == this.editPasswordForm.get('currentPassword').value){
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

  deleteCottage(id:number){
    this.cottageService.removeCottage(id).subscribe(() => {
      this.cottageService.getAllCottagesOfOwner().subscribe(ret => {
        this.cottages = ret;
        
      })
    })
  }

  validatePass(){
    if(this.editPasswordForm.get('newPassword').value === this.editPasswordForm.get('newPassword1').value) {
       this.wrongPassword2 = false;
    }
    else{
      this.wrongPassword2 = true;
    }
  }

  goToCottageProfile(id:number){

    this.cottageService.getCottageById(id).subscribe(ret => {
      this.cottageToShow.emit(ret);
    })
  }

  addNewCottage(){
    this.addNewCottageEmiter.emit(true);
  }

  searchCottages(){
    let nesto = this.nameForSearch;
    let a = 0;
  }

  requestDelete(){
    let accountDelete = new AccountDeleteRequest();
    accountDelete.seen = false;
    accountDelete.user = JSON.parse(JSON.stringify(this.owner));
    this.accountDeleteRequestService.addAccountDeleteRequest(accountDelete).subscribe(ret => {
      if(ret){
        this.alreadySent = false;
      }
      else{
        this.alreadySent = true;
      }
    })
  }

 
  get firstName() {
    return this.editOwnerForm.get('firstName');
  }
  get lastName() {
    return this.editOwnerForm.get('lastName');
  }
  get mobileNumber(){
    return this.editOwnerForm.get('mobileNumber');
  }
  get city() {
    return this.editOwnerForm.get('city');
  }
  get country() {
    return this.editOwnerForm.get('country');
  }
  get address() {
    return this.editOwnerForm.get('address');
  }
  get password() {
    return this.editOwnerForm.get('password');
  }
  get reason() {
    return this.editOwnerForm.get('reason');
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
