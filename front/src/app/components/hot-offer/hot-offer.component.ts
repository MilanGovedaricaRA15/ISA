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

  ngOnInit(): void {
    this.newHotOffer = new HotOffer();
    this.addForm = new FormGroup({
      "numOfPeople": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "availableFrom": new FormControl(null,[Validators.required]),
      "availableTill": new FormControl(null,[Validators.required]),
      "costPerNight": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')])
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
  get costPerNight() {
    return this.addForm.get('costPerNight');
  }

  submitData(){
    this.newHotOffer.services = new Array<Services>();
    for(let x of this.services){
      let element = <HTMLInputElement> document.getElementById(x);
      if(element.checked){
        if(x === 'WiFi'){
          this.newHotOffer.services.push(Services.WiFi);
        }
        else if(x === 'Parking'){
          this.newHotOffer.services.push(Services.Parking);
        }
        else if(x === 'Pool'){
          this.newHotOffer.services.push(Services.Pool);
        }
      }

    }
    this.cottageForApp.hotOffers.push(this.newHotOffer);
    this.hotOfferService.saveHotOffer(this.newHotOffer).subscribe(() => {});
    this.cottageService.changeCottage(this.cottageForApp).subscribe(() => {
    });
    
  }
  
}
