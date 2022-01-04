import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ship, ShipServices } from 'src/app/model/ship';
import { ShipHotOffer } from 'src/app/model/ship-hot-offer';
import { ShipService } from 'src/app/service/ship-service';

@Component({
  selector: 'app-ship-hot-offer',
  templateUrl: './ship-hot-offer.component.html',
  styleUrls: ['./ship-hot-offer.component.css']
})
export class ShipHotOfferComponent implements OnInit {

  constructor(private shipService:ShipService) { }

  @Input() shipForApp: Ship;
  newHotOffer: ShipHotOffer
  addForm:any;
  services = [
    'PetFriendly','Minibar','HairDryer'
   ];
 
  availableTillError:boolean;
  alreadyExistsHotOffer:boolean;
  doesntExistService2:boolean;
  doesntHaveAllServices2:boolean;

  ngOnInit(): void {
    this.services = this.shipForApp.services;
    this.newHotOffer = new ShipHotOffer();
    this.availableTillError = false;
    this.alreadyExistsHotOffer = false;
    this.doesntExistService2 = false;
    this.doesntHaveAllServices2 = false;
    this.addForm = new FormGroup({
      "numOfPeople": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "availableFrom": new FormControl(null,[Validators.required]),
      "availableTill": new FormControl(null,[Validators.required]),
      "cost": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')])
    });
    
  }
  
  
  get numOfPeople() {
    return this.addForm.get('numOfPeople');
  }
  
  get availableFrom(){
    return this.addForm.get('availableFrom');
  }
  get availableTill() {
    return this.addForm.get('availableTill');
  }
  get cost() {
    return this.addForm.get('cost');
  }

  submitData(){
    this.newHotOffer.services = new Array<ShipServices>();
    let element = <HTMLInputElement> document.getElementById("zaDobijanjeServisa2");
    let servic = element.value.split(",");
    this.doesntExistService2 = false;
    
    for(let x of servic){
      if(x != ""){
        if(x === 'Minibar'){
          this.newHotOffer.services.push(ShipServices.Minibar);
        }
        else if(x === 'PetFriendly'){
          this.newHotOffer.services.push(ShipServices.PetFriendly);
        }
        else if(x === 'HairDryer'){
          this.newHotOffer.services.push(ShipServices.HairDryer);
        }
        else{
          this.doesntExistService2 = true;
        }
      }
      

    }
    if(!this.doesntExistService2){
      this.doesntHaveAllServices2 = false;
        if (this.shipForApp.services == null){
          if(this.newHotOffer.services.length != 0){
            this.doesntHaveAllServices2 = true;
          }
        }
        else{
          for(let ser of this.newHotOffer.services){
            if(!this.shipForApp.services.includes(ser)){
              this.doesntHaveAllServices2 = true;
            }
          }
        }
        if(!this.doesntHaveAllServices2){
    this.newHotOffer.free = true;
    if(this.newHotOffer.availableTill < this.newHotOffer.availableFrom){
      this.availableTillError = true;
    }
    else {
      this.availableTillError = false;
      let changeWithThisShip = JSON.parse(JSON.stringify(this.shipForApp))
      changeWithThisShip.hotOffers.push(JSON.parse(JSON.stringify(this.newHotOffer)));
      this.shipService.addShipHotOfferToShip(changeWithThisShip).subscribe(ret => {
          if(ret){
            this.alreadyExistsHotOffer = false;
            this.shipForApp.hotOffers.push(JSON.parse(JSON.stringify(this.newHotOffer)));
          }
          else{
            this.alreadyExistsHotOffer = true;
          }
        });
    }
  }
  }

   
    
    
    
  }

  removeHotOffer(id:number){
    for(let hotOffer of this.shipForApp.hotOffers){
      if (hotOffer.id == id){
        const index = this.shipForApp.hotOffers.indexOf(hotOffer);
        if (index > -1) {
          this.shipForApp.hotOffers.splice(index, 1);
        }
      }
    }
    
    this.shipService.removeShipHotOffer(this.shipForApp).subscribe(() => {
      
      });
    
  }

}
