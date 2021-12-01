import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cottage, Services } from 'src/app/model/cottage';
import { CottageReservation } from 'src/app/model/cottage-reservation';
import { CottageReservationService } from 'src/app/service/cottage-reservation-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-cottage-reservations',
  templateUrl: './cottage-reservations.component.html',
  styleUrls: ['./cottage-reservations.component.css']
})
export class CottageReservationsComponent implements OnInit {

  @Input() cottageForApp: Cottage;
  constructor(private cottageReservationService: CottageReservationService,private userService: UserService) { }
  cottageReservations: Array<CottageReservation>;
  newReservation1: CottageReservation
  addReservationForm1:any;
  services = [
    'WiFi','Parking','Pool'
   ];
  availableTillError:boolean;
  pickedUser:boolean;
  pickedUserError:boolean;
  isReserved1:boolean;
  ngOnInit(): void {
    if(this?.cottageForApp != null){
      this.cottageReservationService.getAllReservationsOfCottage(this.cottageForApp).subscribe(ret => {
        this.cottageReservations = ret;
        this.newReservation1 = new CottageReservation();
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
      this.newReservation1.cottage = JSON.parse(JSON.stringify(this.cottageForApp));
      this.pickedUser = true;
      this.pickedUserError = false;
    })
    }
  }

  submitData(){
    this.newReservation1.services = new Array<Services>();
    for(let x of this.services){
      let element = <HTMLInputElement> document.getElementsByName(x)[0];
      if(element.checked){
        if(x === 'WiFi'){
          this.newReservation1.services.push(Services.WiFi);
        }
        else if(x === 'Parking'){
          this.newReservation1.services.push(Services.Parking);
        }
        else if(x === 'Pool'){
          this.newReservation1.services.push(Services.Pool);
        }
      }

    }
    if(this.newReservation1.availableTill < this.newReservation1.availableFrom){
      this.availableTillError = true;
    }
    else {
      if(this.pickedUser){
        this.pickedUserError = false;
      this.availableTillError = false;
     
    
      this.cottageReservationService.addReservationByOwner(this.newReservation1).subscribe(ret => {
        if(ret){
          this.cottageReservations.push(JSON.parse(JSON.stringify(this.newReservation1)));
          this.isReserved1 = false;
        }
        else{
          this.isReserved1 = true;
        }
        });
      }
      else{
        this.pickedUserError = true;
      }
    }

   
    
    
    
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
