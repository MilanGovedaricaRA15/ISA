import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ship, ShipServices } from 'src/app/model/ship';
import { ShipReservation } from 'src/app/model/ship-reservation';
import { User } from 'src/app/model/user';
import { ShipReservationService } from 'src/app/service/ship-reservation-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-ship-owner-reservations',
  templateUrl: './ship-owner-reservations.component.html',
  styleUrls: ['./ship-owner-reservations.component.css']
})
export class ShipOwnerReservationsComponent implements OnInit {

  constructor(private shipReservationsService: ShipReservationService, private userService: UserService) { }

  ownerReservations: Array<ShipReservation>
  newReservation: ShipReservation
  addReservationForm:any;
  @Output() seeUser = new EventEmitter<User>();
  services = [
    'PetFriendly','Minibar','HairDryer'
   ];
  availableTillError:boolean;
  pickedUser:boolean;
  pickedUserError:boolean;
  isReserved: boolean;
  doesntHaveAllServices: boolean;
  doesntExistService: boolean;
  @Output() sendShipReservation = new EventEmitter<ShipReservation>();

  ngOnInit(): void {
    this.doesntHaveAllServices = false;
    this.doesntExistService = false;
    this.shipReservationsService.getAllReservationsOfOwner().subscribe(ret => {
      this.ownerReservations = ret;
      this.newReservation = new ShipReservation();
      this.availableTillError = false;
      this.pickedUser = false;
      this.pickedUserError = false;
      this.isReserved = false;
      this.addReservationForm = new FormGroup({
          "availableFrom": new FormControl(null,[Validators.required]),
          "availableTill": new FormControl(null,[Validators.required]),
          "cost": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')])
    });

  });
}

  getClient(email:string,ship:Ship,from:Date,till:Date){
    let today = new Date();
    let from1 = new Date(from);
    let till1 = new Date(till);
    if(today > from1 && today < till1){
    this.userService.getUserByEmail(email).subscribe(ret =>{
      this.newReservation.client = ret;
      this.newReservation.ship = JSON.parse(JSON.stringify(ship));
      this.pickedUser = true;
      this.pickedUserError = false;
    })
  }
  }

  submitData(){
    this.newReservation.services = new Array<ShipServices>();
    let element = <HTMLInputElement> document.getElementById("zaDobijanjeServisa1");
    let servic = element.value.split(",");
    this.doesntExistService = false; 
    for(let x of servic){
      if(x != ""){
        if(x === 'Minibar'){
          this.newReservation.services.push(ShipServices.Minibar);
        }
        else if(x === 'PetFriendly'){
          this.newReservation.services.push(ShipServices.PetFriendly);
        }
        else if(x === 'HairDryer'){
          this.newReservation.services.push(ShipServices.HairDryer);
        }
        else{
          this.doesntExistService = true;
        }
      }
      

    }
    if(!this.doesntExistService){
    if(this.newReservation.availableTill < this.newReservation.availableFrom){
      this.availableTillError = true;
    }
    else {
      if(this.pickedUser){
          this.doesntHaveAllServices = false;
          if (this.newReservation.ship.services == null){
            if(this.newReservation.services.length != 0){
              this.doesntHaveAllServices = true;
            }
          }
          else{
            for(let ser of this.newReservation.services){
              if(!this.newReservation.ship.services.includes(ser)){
                this.doesntHaveAllServices = true;
              }
            }
          }
          if(!this.doesntHaveAllServices){
          this.pickedUserError = false;
          this.availableTillError = false;
              this.shipReservationsService.addReservationByOwner(this.newReservation).subscribe(ret => {
                if(ret){
                  this.shipReservationsService.getAllReservationsOfOwner().subscribe(ret => {
                    this.ownerReservations = ret;
                  });
                  this.isReserved = false;
                }
                else{
                  this.isReserved = true;
                }
                });
              } 
            
           }
      else {
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


  get availableFrom(){
    return this.addReservationForm.get('availableFrom');
  }
  get availableTill() {
    return this.addReservationForm.get('availableTill');
  }
  get cost() {
    return this.addReservationForm.get('cost');
  }

}
