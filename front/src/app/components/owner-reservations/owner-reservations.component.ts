import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cottage, Services } from 'src/app/model/cottage';
import { CottageReservation } from 'src/app/model/cottage-reservation';
import { User } from 'src/app/model/user';
import { CottageReservationService } from 'src/app/service/cottage-reservation-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-owner-reservations',
  templateUrl: './owner-reservations.component.html',
  styleUrls: ['./owner-reservations.component.css']
})
export class OwnerReservationsComponent implements OnInit {

  constructor(private cottageReservationsService: CottageReservationService, private userService: UserService) { }

  ownerReservations: Array<CottageReservation>
  newReservation: CottageReservation
  addReservationForm:any;
  @Output() seeUser = new EventEmitter<User>();
  @Output() sendCottageReservation = new EventEmitter<CottageReservation>();
  services = [
    'WiFi','Parking','Pool'
   ];
  availableTillError:boolean;
  pickedUser:boolean;
  pickedUserError:boolean;
  isReserved: boolean;
  doesntHaveAllServices: boolean;
  doesntExistService: boolean;

  ngOnInit(): void {
    this.doesntHaveAllServices = false;
    this.doesntExistService = false;
    this.cottageReservationsService.getAllReservationsOfOwner().subscribe(ret => {
      this.ownerReservations = ret;
      this.newReservation = new CottageReservation();
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

  getClient(email:string,cottage:Cottage,from:Date,till:Date){
    let today = new Date();
    let from1 = new Date(from);
    let till1 = new Date(till);
    if(today > from1 && today < till1){
    this.userService.getUserByEmail(email).subscribe(ret =>{
      this.newReservation.client = ret;
      this.newReservation.cottage = JSON.parse(JSON.stringify(cottage));
      this.pickedUser = true;
      this.pickedUserError = false;
    })
  }
  }

  submitData(){
    this.newReservation.services = new Array<Services>();
    let element = <HTMLInputElement> document.getElementById("zaDobijanjeServisa1");
    let servic = element.value.split(",");
    this.doesntExistService = false; 
    for(let x of servic){
      if(x != ""){
        if(x === 'WiFi'){
          this.newReservation.services.push(Services.WiFi);
        }
        else if(x === 'Parking'){
          this.newReservation.services.push(Services.Parking);
        }
        else if(x === 'Pool'){
          this.newReservation.services.push(Services.Pool);
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
          if (this.newReservation.cottage.services == null){
            if(this.newReservation.services.length != 0){
              this.doesntHaveAllServices = true;
            }
          }
          else{
            for(let ser of this.newReservation.services){
              if(!this.newReservation.cottage.services.includes(ser)){
                this.doesntHaveAllServices = true;
              }
            }
          }
          if(!this.doesntHaveAllServices){
          this.pickedUserError = false;
          this.availableTillError = false;
              this.cottageReservationsService.addReservationByOwner(this.newReservation).subscribe(ret => {
                if(ret){
                  this.cottageReservationsService.getAllReservationsOfOwner().subscribe(ret => {
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

  addReport(cottageReservationToSend: CottageReservation){
    this.sendCottageReservation.emit(cottageReservationToSend);
  }

  isOwerAndWithoutReport(cottageReservationForCheck: CottageReservation): boolean{
    let datum = new Date();
    if (new Date(Date.parse(cottageReservationForCheck.availableTill.toString())).getTime() < datum.getTime()){
      if(cottageReservationForCheck.report == null || cottageReservationForCheck.report == undefined){
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
