import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ship, ShipServices } from 'src/app/model/ship';
import { ShipReservation } from 'src/app/model/ship-reservation';
import { User } from 'src/app/model/user';
import { ShipReservationService } from 'src/app/service/ship-reservation-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-ship-reservations',
  templateUrl: './ship-reservations.component.html',
  styleUrls: ['./ship-reservations.component.css']
})
export class ShipReservationsComponent implements OnInit {

  @Input() shipForApp: Ship;
  constructor(private shipReservationService: ShipReservationService,private userService: UserService) { }
  shipReservations: Array<ShipReservation>;
  newReservation1: ShipReservation
  addReservationForm1:any;
  services = [
    'PetFriendly','Minibar','HairDryer'
   ];
  availableTillError:boolean;
  pickedUser:boolean;
  pickedUserError:boolean;
  isReserved1:boolean;
  doesntHaveAllServices: boolean;
  doesntExistService: boolean;
  @Output() seeUser = new EventEmitter<User>();
  @Output() sendShipReservation = new EventEmitter<ShipReservation>();
  ngOnInit(): void {
    if(this?.shipForApp != null){
      this.shipReservationService.getAllReservationsOfShip(this.shipForApp).subscribe(ret => {
        this.doesntExistService = false;
        this.doesntHaveAllServices = false;
        this.services = this.shipForApp.services;
        this.shipReservations = ret;
        this.newReservation1 = new ShipReservation();
        this.availableTillError = false;
        this.pickedUser = false;
        this.pickedUserError = false;
        this.isReserved1 = false;
        this.addReservationForm1 = new FormGroup({
          "availableFrom1": new FormControl(null,[Validators.required]),
          "availableTill1": new FormControl(null,[Validators.required]),
          "cost1": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')])
        });
        
      })
    }
  }

  getClient(email:string,from:Date,till:Date){
    let today = new Date();
    let from1 = new Date(from);
    let till1 = new Date(till);
    if(today > from1 && today < till1){
    this.userService.getUserByEmail(email).subscribe(ret =>{
      this.newReservation1.client = ret;
      this.newReservation1.ship = JSON.parse(JSON.stringify(this.shipForApp));
      this.pickedUser = true;
      this.pickedUserError = false;
    })
    }
  }

  submitData(){
    this.newReservation1.services = new Array<ShipServices>();
    let element = <HTMLInputElement> document.getElementById("zaDobijanjeServisa");
    let servic = element.value.split(",");
    this.doesntExistService = false;
    for(let x of servic){
      if(x != ""){
        if(x === 'HairDryer'){
          this.newReservation1.services.push(ShipServices.HairDryer);
        }
        else if(x === 'Minibar'){
          this.newReservation1.services.push(ShipServices.Minibar);
        }
        else if(x === 'PetFriendly'){
          this.newReservation1.services.push(ShipServices.PetFriendly);
        }
        else{
          this.doesntExistService = true;
        }
      }
      

    }
    if(!this.doesntExistService){
    if(this.newReservation1.availableTill < this.newReservation1.availableFrom){
      this.availableTillError = true;
    }
    else {
      if(this.pickedUser){
        this.doesntHaveAllServices = false;
        if (this.newReservation1.ship.services == null){
          if(this.newReservation1.services.length != 0){
            this.doesntHaveAllServices = true;
          }
        }
        else{
          for(let ser of this.newReservation1.services){
            if(!this.newReservation1.ship.services.includes(ser)){
              this.doesntHaveAllServices = true;
            }
          }
        }
        if(!this.doesntHaveAllServices){
        this.pickedUserError = false;
      this.availableTillError = false;
     
    
      this.shipReservationService.addReservationByOwner(this.newReservation1).subscribe(ret => {
        if(ret){
          this.shipReservationService.getAllReservationsOfShip(this.shipForApp).subscribe(ret => {
            this.shipReservations = ret;
          })
          this.isReserved1 = false;
        }
        else{
          this.isReserved1 = true;
        }
        });
      }
    }
      else{
        this.pickedUserError = true;
      }
    }
  }

   
    
    
    
  }

  seeUserProfile(email:string){
    this.userService.getUserByEmail(email).subscribe(ret => {
      this.seeUser.emit(ret);
    })
  }

  addReport(shipReservationToSend: ShipReservation){
    this.sendShipReservation.emit(shipReservationToSend);
  }

  isOwerAndWithoutReport(shipReservationForCheck: ShipReservation): boolean{
    let datum = new Date();
    if (new Date(Date.parse(shipReservationForCheck.availableTill.toString())).getTime() < datum.getTime()){
      if(shipReservationForCheck.report == null || shipReservationForCheck.report == undefined){
        return true;
      }
      else{
        return false;
      }
    }
    return false;
  }

  get availableFrom1(){
    return this.addReservationForm1.get('availableFrom1');
  }
  get availableTill1() {
    return this.addReservationForm1.get('availableTill1');
  }
  get cost1() {
    return this.addReservationForm1.get('cost1');
  }

}
