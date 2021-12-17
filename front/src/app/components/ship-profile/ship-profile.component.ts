import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FishingEquipment, NavigationEquipment, Ship, ShipServices } from 'src/app/model/ship';
import { ShipServicePrice } from 'src/app/model/ship-service-price';
import { ShipService } from 'src/app/service/ship-service';

@Component({
  selector: 'app-ship-profile',
  templateUrl: './ship-profile.component.html',
  styleUrls: ['./ship-profile.component.css']
})
export class ShipProfileComponent implements OnInit {

  shipChange: Ship;
  shipImg: String;
  changeForm:any;
  cantRemove:Boolean;
  cantAdd:Boolean;
  cantChange:Boolean;
  @Output() shipHotOffersForHotOffer = new EventEmitter<Ship>();
  file: File = null;
  invalidFile:boolean = false;
  @Input() ship: Ship;

  services = [
   'PetFriendly','Minibar','HairDryer'
  ];

  fishingEquipment = [
    'Lures',
    'Nets',
    'Rodes'
  ];

  navigationEquipment = [
    'GPS',
    'Radar',
    'VHFRadio',
    'FishFinder'
  ];

  servicesClass: Array<ShipServicePrice>;

  constructor(private shipService: ShipService) { }

  public ngOnInit() {
    
    this.onIni();

    
    this.changeForm = new FormGroup({
      "name": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "type": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "length": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "engineNumber": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z1-9 ]*')]),
      "enginePower": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "topSpeed": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]), 
      "capacity": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]), 
      "availableFrom": new FormControl(null,[Validators.required]),
      "availableTill": new FormControl(null,[Validators.required]),
      "costPerNight": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "description": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "rules": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "address": new FormControl(null,[Validators.required,Validators.pattern('([A-ZŠĐČĆŽ]{1}[a-zšđčćž]+ )+[0-9]+')])
      
    });


  }

  public onIni(){
    this.cantRemove = false;
    this.cantAdd = false;
    this.cantChange = false;
    this.servicesClass = new Array<ShipServicePrice>();
    if(this.ship == undefined){
      this.shipService.getShipById(Number(sessionStorage.getItem("shipToShow"))).subscribe(ret =>{
        this.ship = ret;
        this.shipChange = JSON.parse(JSON.stringify(this.ship));
        this.servicesToShow();
        if(this?.shipChange?.images != null){
          this.shipImg = this?.shipChange?.images[0];
        }
        this.shipHotOffersForHotOffer.emit(this.shipChange);
        
      })

    }
    else{
      this.shipChange = JSON.parse(JSON.stringify(this.ship));
      this.servicesToShow();
      
      if(this?.shipChange?.images != null){
        this.shipImg = this?.shipChange?.images[0];
      }
      this.shipHotOffersForHotOffer.emit(this.shipChange);
    }
  }

  public servicesToShow(){
    if(this.shipChange.services!=undefined){
      for (let s of this.shipChange.services){
        let found = false;
        for (let ss of this.shipChange.priceList){      
          if(s == ss.service){
            if(ss.cost != undefined || ss.cost != null){
              this.servicesClass.push(ss);
              found = true;
            }
            else{
              ss.cost = 0;
              this.servicesClass.push(ss);
              found = true;
            }
          }
        }
        if (!found){
          let da = new ShipServicePrice();
          da.cost = 0;
          da.service = s;
          this.servicesClass.push(da);
        }
      }
    }
  }

  public select(image: String) {
    this.shipImg = image;
    this.shipChange.images.forEach((element, index) => {
      if (element === image) this.shipChange.images.splice(index, 1);
    });
    this.shipChange.images.unshift(image);

  }

  public removeImg() {
    this.shipService.checkIsReserved(this.shipChange).subscribe(ret =>{
      if(ret){
        this.shipChange.images.forEach((element, index) => {
          if (element === this.shipImg) {
            this.shipChange.images.splice(index, 1);
          }
        });
        this.shipService.removeShipImg(this.shipChange).subscribe(() => {
          this.cantRemove = false;
          this.ship.images.forEach((element, index) => {
            if (element === this.shipImg) {
              this.ship.images.splice(index, 1);
            }
          });
          this.shipImg = this.shipChange.images[0];
          this.onIni();
        });
      }
      else{
        this.cantRemove = true;
      }
    })
    
  }

  public saveImg(){
    this.shipService.checkIsReserved(this.shipChange).subscribe(ret =>{
      if(ret){
        this.cantAdd = false;
        if(this.file?.name.match(/.(jpg)$/i)){
          this.invalidFile = false;
          this.shipService.upload(this.file).subscribe(ret=>{
            if(ret){
              if(this?.shipChange?.images == null){
                this.shipChange.images = new Array<String>();
              }
              this.shipChange.images.push(this.file.name);
              this.shipService.changeShip(this.shipChange).subscribe(()=>{
                this.onIni();
              }
              )
              
            }
            else {
              this.invalidFile = true;
            }
          });
        }
        else {
          this.invalidFile = true;
        }
      }
      else{
        this.cantAdd = true;
      }
    })
    

  }

  onChange(event) {
    this.file = event.target.files[0];
}

public isCheckedFishingEquipment(stri:string): boolean{
  if(this?.shipChange !== undefined){
    if(this?.shipChange?.fishingEquipment != null){
      for (let x of this.shipChange?.fishingEquipment){
        if(x.toString() === stri){
          return true;
        }
      }
      return false;
    }
    else {
      return false;
    }
  }
  return false
}

public isCheckedNavigationEquipment(stri:string): boolean{
  if(this?.shipChange !== undefined){
    if(this?.shipChange?.navigationEquipment != null){
      for (let x of this.shipChange?.navigationEquipment){
        if(x.toString() === stri){
          return true;
        }
      }
      return false;
    }
    else {
      return false;
    }
  }
  return false
}

  public isChecked(stri:string): boolean{
    if(this?.shipChange !== undefined){
      if(this?.shipChange?.services != null){
        for (let x of this.shipChange?.services){
          if(x.toString() === stri){
            return true;
          }
        }
        return false;
      }
      else {
        return false;
      }
    }
    return false
  }
  submitData(){
    this.shipService.checkIsReserved(this.ship).subscribe(ret => {
      if(ret){
        this.cantChange = false;
        this.ship.services = new Array<ShipServices>();
        this.ship.navigationEquipment = new Array<NavigationEquipment>();
        this.ship.fishingEquipment = new Array<FishingEquipment>();
            for(let x of this.services){
              let element = <HTMLInputElement> document.getElementById(x);
              if(element.checked){
                if(x === 'PetFriendly'){
                  this.ship.services.push(ShipServices.PetFriendly);
                }
                else if(x === 'Minibar'){
                  this.ship.services.push(ShipServices.Minibar);
                }
                else if(x === 'HairDryer'){
                  this.ship.services.push(ShipServices.HairDryer);
                }
              }

            }
            for(let x of this.fishingEquipment){
              let element = <HTMLInputElement> document.getElementById(x);
              if(element.checked){
                if(x === 'Lures'){
                  this.ship.fishingEquipment.push(FishingEquipment.Lures);
                }
                else if(x === 'Nets'){
                  this.ship.fishingEquipment.push(FishingEquipment.Nets);
                }
                else if(x === 'Rodes'){
                  this.ship.fishingEquipment.push(FishingEquipment.Rodes);
                }
              }

            }

            for(let x of this.navigationEquipment){
              let element = <HTMLInputElement> document.getElementById(x);
              if(element.checked){
                if(x === 'GPS'){
                  this.ship.navigationEquipment.push(NavigationEquipment.GPS);
                }
                else if(x === 'Radar'){
                  this.ship.navigationEquipment.push(NavigationEquipment.Radar);
                }
                else if(x === 'VHFRadio'){
                  this.ship.navigationEquipment.push(NavigationEquipment.VHFRadio);
                }
                else if(x === 'FishFinder'){
                  this.ship.navigationEquipment.push(NavigationEquipment.FishFinder);
                }
              }

            }

            for(let o of this.servicesClass){
              let element1 = <HTMLInputElement> document.getElementById(o.service.toString()+"serviceKlasa");
              let found = false;
              for (let n of this.ship.priceList){
                if (o.service == n.service){
                  let cost = Number(element1.value);
                  if(cost > 0){
                     n.cost = cost;
                  }
                  found = true;
                }
              }
              if(!found){
                let cost = Number(element1.value);
                o.cost = cost;
                this.ship.priceList.push(o);
              }
            }
            this.shipService.changeShip(this.ship).subscribe(() => {
              this.onIni();
            });
              }
      else{
        this.cantChange = true;
      }
    })
  }
  get name() {
    return this.changeForm.get('name');
  }
  get type() {
    return this.changeForm.get('type');
  }
  get length(){
    return this.changeForm.get('length');
  }
  get engineNumber() {
    return this.changeForm.get('engineNumber');
  }
  get enginePower(){
    return this.changeForm.get('enginePower');
  }
  get topSpeed() {
    return this.changeForm.get('topSpeed');
  }
  get capacity(){
    return this.changeForm.get('capacity');
  }
  get availableFrom(){
    return this.changeForm.get('availableFrom');
  }
  get availableTill() {
    return this.changeForm.get('availableTill');
  }
  get costPerNight() {
    return this.changeForm.get('costPerNight');
  }
  get description() {
    return this.changeForm.get('description');
  }
  get rules() {
    return this.changeForm.get('rules');
  }
  get address() {
    return this.changeForm.get('address');
  }

}
