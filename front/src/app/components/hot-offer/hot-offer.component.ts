import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cottage, Services } from 'src/app/model/cottage';
import { HotOffer } from 'src/app/model/hot-offer';
import { CottageService } from 'src/app/service/cottage-service.service';
import { HotOfferService } from 'src/app/service/hot-offer-service.service';

@Component({
  selector: 'app-hot-offer',
  templateUrl: './hot-offer.component.html',
  styleUrls: ['./hot-offer.component.css']
})
export class HotOfferComponent implements OnInit {

  constructor(private cottageService:CottageService,private hotOfferService:HotOfferService) { }

  @Input() cottageForApp: Cottage;
  newHotOffer: HotOffer
  addForm:any;
  services = [
    'WiFi','Parking','Pool'
   ];
  availableTillError:boolean;
  alreadyExistsHotOffer:boolean;
  doesntExistService2:boolean;
  doesntHaveAllServices2:boolean;

  ngOnInit(): void {
    this.services = this.cottageForApp.services;
    this.newHotOffer = new HotOffer();
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
    this.newHotOffer.services = new Array<Services>();
    let element = <HTMLInputElement> document.getElementById("zaDobijanjeServisa2");
    let servic = element.value.split(",");
    this.doesntExistService2 = false;
    for(let x of servic){
        if(x === 'WiFi'){
          this.newHotOffer.services.push(Services.WiFi);
        }
        else if(x === 'Parking'){
          this.newHotOffer.services.push(Services.Parking);
        }
        else if(x === 'Pool'){
          this.newHotOffer.services.push(Services.Pool);
        }
        else{
          this.doesntExistService2 = true;
        }
      

    }
    if(!this.doesntExistService2){
      this.doesntHaveAllServices2 = false;
        if (this.cottageForApp.services == null){
          if(this.newHotOffer.services.length != 0){
            this.doesntHaveAllServices2 = true;
          }
        }
        else{
          for(let ser of this.newHotOffer.services){
            if(!this.cottageForApp.services.includes(ser)){
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
      let changeWithThisCottage = JSON.parse(JSON.stringify(this.cottageForApp))
      changeWithThisCottage.hotOffers.push(JSON.parse(JSON.stringify(this.newHotOffer)));
      this.cottageService.addHotOfferToCottage(changeWithThisCottage).subscribe(ret => {
          if(ret){
            this.alreadyExistsHotOffer = false;
            this.cottageForApp.hotOffers.push(JSON.parse(JSON.stringify(this.newHotOffer)));
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
    for(let hotOffer of this.cottageForApp.hotOffers){
      if (hotOffer.id == id){
        const index = this.cottageForApp.hotOffers.indexOf(hotOffer);
        if (index > -1) {
          this.cottageForApp.hotOffers.splice(index, 1);
        }
      }
    }
    
    this.cottageService.removeHotOffer(this.cottageForApp).subscribe(() => {
      
      });
    
  }
  
}
