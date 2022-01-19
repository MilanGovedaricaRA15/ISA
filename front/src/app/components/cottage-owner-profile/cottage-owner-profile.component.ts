import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountDeleteRequest } from 'src/app/model/account-delete-request';
import { Cottage, Services } from 'src/app/model/cottage';
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
  type:String;
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
      if(this.owner.type.toString() == 'Regular')
        this.type = '0%'
      else if(this.owner.type.toString() == 'Silver')
        this.type = '10%'
      else
        this.type = '20%'
     
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

  SearchCottages(){
    this.cottageService.getAllCottagesOfOwner().subscribe(ret => {
      let elementName = <HTMLInputElement> document.getElementById("searchCottagesName");
      let name = ""
      let rooms = -1
      let beds = -1
      let address = ""
      let cost = -1
      let description = ""
      let rules = ""
      let services = new Array<String>()
      if(elementName.value != ""){
       name = elementName.value
      }
      let elementRooms = <HTMLInputElement> document.getElementById("searchCottagesRooms");
      if(elementRooms.value != ""){
       rooms = Number(elementRooms.value)
      }
      let elementBeds = <HTMLInputElement> document.getElementById("searchCottagesBeds");
      if(elementBeds.value != ""){
       beds = Number(elementBeds.value)
      }
      let elementAddress = <HTMLInputElement> document.getElementById("searchCottagesAddress");
      if(elementAddress.value != ""){
       address = elementAddress.value
      }
      let elementCost = <HTMLInputElement> document.getElementById("searchCottagesCost");
      if(elementCost.value != ""){
       cost = Number(elementCost.value)
      }
      let elementDescription = <HTMLInputElement> document.getElementById("searchCottagesDescription");
      if(elementDescription.value != ""){
       description = elementDescription.value
      }
      let elementRules = <HTMLInputElement> document.getElementById("searchCottagesRules");
      if(elementRules.value != ""){
       rules = elementRules.value
      }
      let elementServices = <HTMLInputElement> document.getElementById("searchCottagesServices");
      if(elementServices.value != ""){
       services = elementServices.value.split(",")
      }
      this.cottages = new Array<Cottage>()
      for(let p of ret){
        let pripada = true;
        if(name != ""){
          if (!p.name.toLowerCase().includes(name.toLowerCase())){
            pripada = false;
          }
        }
        if(rooms != -1){
          if(p.numOfRooms != rooms){
            pripada = false;
          }
        }
        if(beds != -1){
          if(p.numOfBeds != beds){
            pripada = false;
          }
        }
        if(cost != -1){
          if(p.costPerNight != cost){
            pripada = false;
          }
        }
        if(address != ""){
          if (!p.address.toLowerCase().includes(address.toLowerCase())){
            pripada = false;
          }
        }
        if(description != ""){
          if (!p.description.toLowerCase().includes(description.toLowerCase())){
            pripada = false;
          }
        }
        if(rules != ""){
          if (!p.rules.toLowerCase().includes(rules.toLowerCase())){
            pripada = false;
          }
        }
        if(elementServices.value != ""){
          for (let ser of services){
            if(p.services == null||p.services == undefined){
              pripada = false;
              break;
            }
            if(ser.toLowerCase() === 'wifi'){
              if (!p.services.includes(Services.WiFi)){
                pripada = false;
              }
            }
            else if(ser.toLowerCase() === 'parking'){
              if (!p.services.includes(Services.Parking)){
                pripada = false;
              }
            }
            else if(ser.toLowerCase() === 'pool'){
              if (!p.services.includes(Services.Pool)){
                pripada = false;
              }
            }
            else{
              pripada = false;
            }
          }
          
        }
        if(pripada){
           this.cottages.push(p);
        }
      }
      
    })
    
  }

  searchCottages(){
    let nesto = this.nameForSearch;
    let a = 0;
  }

  requestDelete(){
    let accountDelete = new AccountDeleteRequest();
    accountDelete.seen = false;
    accountDelete.user = JSON.parse(JSON.stringify(this.owner));
    let elementReasonOfDelete = <HTMLInputElement> document.getElementById("reasonOfDelete");
    accountDelete.reason = elementReasonOfDelete.value;
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
