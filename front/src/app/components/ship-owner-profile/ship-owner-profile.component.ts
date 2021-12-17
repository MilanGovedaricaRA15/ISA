import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountDeleteRequest } from 'src/app/model/account-delete-request';
import { Services } from 'src/app/model/cottage';
import { FishingEquipment, NavigationEquipment, Ship, ShipServices } from 'src/app/model/ship';
import { User } from 'src/app/model/user';
import { AccountDeleteRequestService } from 'src/app/service/account-delete-request-service.service';
import { ShipService } from 'src/app/service/ship-service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-ship-owner-profile',
  templateUrl: './ship-owner-profile.component.html',
  styleUrls: ['./ship-owner-profile.component.css']
})
export class ShipOwnerProfileComponent implements OnInit {

  constructor(private userService: UserService,private shipService: ShipService, private accountDeleteRequestService:AccountDeleteRequestService) { }

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
  ships: Array<Ship>;
  @Output() shipToShow = new EventEmitter<Ship>();
  @Output() addNewShipEmiter = new EventEmitter<boolean>();

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
      this.shipService.getAllShipsOfOwner().subscribe(ret => {
        this.ships = ret;
        
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

  deleteShip(id:number){
    this.shipService.removeShip(id).subscribe(() => {
      this.shipService.getAllShipsOfOwner().subscribe(ret => {
        this.ships = ret;
        
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

  goToShipProfile(id:number){

    this.shipService.getShipById(id).subscribe(ret => {
      this.shipToShow.emit(ret);
    })
  }

  addNewShip(){
    this.addNewShipEmiter.emit(true);
  }

  SearchShips(){
    this.shipService.getAllShipsOfOwner().subscribe(ret => {
      let elementName = <HTMLInputElement> document.getElementById("searchShipName");
      let name = ""
      let type = ""
      let engineNumber = ""
      let length = -1
      let enginePower = -1
      let topSpeed = -1 
      let capacity = -1 
      let cancelReq = ""
      let address = ""
      let cost = -1
      let description = ""
      let rules = ""
      let services = new Array<String>()
      let navigationEquipment = new Array<String>()
      let fishingEquipment = new Array<String>()
      if(elementName.value != ""){
        name = elementName.value
      }
      let elementType = <HTMLInputElement> document.getElementById("searchShipType");
      if(elementType.value != ""){
        type = elementType.value
      }
      let elementEngineNumber = <HTMLInputElement> document.getElementById("searchShipEngineNumber");
      if(elementEngineNumber.value != ""){
        engineNumber = elementEngineNumber.value
      }
      let elementLength = <HTMLInputElement> document.getElementById("searchShipLength");
      if(elementLength.value != ""){
        length = Number(elementLength.value)
      }
      let elementEnginePower = <HTMLInputElement> document.getElementById("searchShipEnginePower");
      if(elementEnginePower.value != ""){
        enginePower = Number(elementEnginePower.value)
      }
      let elementTopSpeed = <HTMLInputElement> document.getElementById("searchShipTopSpeed");
      if(elementTopSpeed.value != ""){
        topSpeed = Number(elementTopSpeed.value)
      }
      let elementCancelReq = <HTMLInputElement> document.getElementById("searchShipCancelRequirements");
      if(elementCancelReq.value != ""){
        cancelReq = elementCancelReq.value
      }
      let elementCapacity = <HTMLInputElement> document.getElementById("searchShipCapacity");
      if(elementCapacity.value != ""){
        capacity = Number(elementCapacity.value)
      }
      let elementAddress = <HTMLInputElement> document.getElementById("searchShipAddress");
      if(elementAddress.value != ""){
       address = elementAddress.value
      }
      let elementCost = <HTMLInputElement> document.getElementById("searchShipCost");
      if(elementCost.value != ""){
       cost = Number(elementCost.value)
      }
      let elementDescription = <HTMLInputElement> document.getElementById("searchShipDescription");
      if(elementDescription.value != ""){
       description = elementDescription.value
      }
      let elementRules = <HTMLInputElement> document.getElementById("searchShipRules");
      if(elementRules.value != ""){
       rules = elementRules.value
      }
      let elementServices = <HTMLInputElement> document.getElementById("searchShipServices");
      if(elementServices.value != ""){
       services = elementServices.value.split(",")
      }
      let elementNavigationalEquipment = <HTMLInputElement> document.getElementById("searchShipNavigationEquipment");
      if(elementNavigationalEquipment.value != ""){
       navigationEquipment = elementNavigationalEquipment.value.split(",")
      }
      let elementFishingEquipment = <HTMLInputElement> document.getElementById("searchShipFishingEquipment");
      if(elementFishingEquipment.value != ""){
       fishingEquipment = elementFishingEquipment.value.split(",")
      }
      this.ships = new Array<Ship>()
      for(let p of ret){
        let pripada = true;
        if(name != ""){
          if (!p.name.toLowerCase().includes(name.toLowerCase())){
            pripada = false;
          }
        }
        if(type != ""){
          if (!p.type.toLowerCase().includes(type.toLowerCase())){
            pripada = false;
          }
        }
        if(cancelReq != ""){
          if (!p.cancelRequirements.toLowerCase().includes(cancelReq.toLowerCase())){
            pripada = false;
          }
        }
        if(engineNumber != ""){
          if (!p.engineNumber.toLowerCase().includes(engineNumber.toLowerCase())){
            pripada = false;
          }
        }
        if(length != -1){
          if(p.length != length){
            pripada = false;
          }
        }
        if(enginePower != -1){
          if(p.enginePower != enginePower){
            pripada = false;
          }
        }
        if(topSpeed != -1){
          if(p.topSpeed != topSpeed){
            pripada = false;
          }
        }
        if(capacity != -1){
          if(p.capacity != capacity){
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
            if(ser.toLowerCase() === 'petfriendly'){
              if (!p.services.includes(ShipServices.PetFriendly)){
                pripada = false;
              }
            }
            else if(ser.toLowerCase() === 'minibar'){
              if (!p.services.includes(ShipServices.Minibar)){
                pripada = false;
              }
            }
            else if(ser.toLowerCase() === 'hairdryer'){
              if (!p.services.includes(ShipServices.HairDryer)){
                pripada = false;
              }
            }
            else{
              pripada = false;
            }
          }
          
        }
        if(elementNavigationalEquipment.value != ""){
          for (let ser of navigationEquipment){
            if(p.navigationEquipment == null||p.navigationEquipment == undefined){
              pripada = false;
              break;
            }
            if(ser.toLowerCase() === 'fishfinder'){
              if (!p.navigationEquipment.includes(NavigationEquipment.FishFinder)){
                pripada = false;
              }
            }
            else if(ser.toLowerCase() === 'gps'){
              if (!p.navigationEquipment.includes(NavigationEquipment.GPS)){
                pripada = false;
              }
            }
            else if(ser.toLowerCase() === 'radar'){
              if (!p.navigationEquipment.includes(NavigationEquipment.Radar)){
                pripada = false;
              }
            }
            else if(ser.toLowerCase() === 'vhfradio'){
              if (!p.navigationEquipment.includes(NavigationEquipment.VHFRadio)){
                pripada = false;
              }
            }
            else{
              pripada = false;
            }
          }
          
        }
        if(elementFishingEquipment.value != ""){
          for (let ser of fishingEquipment){
            if(p.fishingEquipment == null||p.fishingEquipment == undefined){
              pripada = false;
              break;
            }
            if(ser.toLowerCase() === 'lures'){
              if (!p.fishingEquipment.includes(FishingEquipment.Lures)){
                pripada = false;
              }
            }
            else if(ser.toLowerCase() === 'nets'){
              if (!p.fishingEquipment.includes(FishingEquipment.Nets)){
                pripada = false;
              }
            }
            else if(ser.toLowerCase() === 'rodes'){
              if (!p.fishingEquipment.includes(FishingEquipment.Rodes)){
                pripada = false;
              }
            }
            else{
              pripada = false;
            }
          }
          
        }
        if(pripada){
           this.ships.push(p);
        }
      }
      
    })
    
  }

  searchShips(){
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
