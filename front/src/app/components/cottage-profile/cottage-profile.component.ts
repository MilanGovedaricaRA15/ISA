import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Cottage, Services } from 'src/app/model/cottage';
import { HotOffer } from 'src/app/model/hot-offer';
import { ServicePrice } from 'src/app/model/service-price';
import { CottageService } from 'src/app/service/cottage-service.service';

@Component({
  selector: 'app-cottage-profile',
  templateUrl: './cottage-profile.component.html',
  styleUrls: ['./cottage-profile.component.css']
})
export class CottageProfileComponent implements OnInit {

  cottageChange: Cottage;
  cottageImg: String;
  changeForm:any;
  cantRemove:Boolean;
  cantAdd:Boolean;
  cantChange:Boolean;
  @Output() cottageHotOffersForHotOffer = new EventEmitter<Cottage>();
  file: File = null;
  invalidFile:boolean = false;
  @Input() cottage: Cottage;

  services = [
   'WiFi','Parking','Pool'
  ];
  servicesClass: Array<ServicePrice>;

  constructor(private cottageService: CottageService) { }

  public ngOnInit() {
    
    this.onIni();

    
    this.changeForm = new FormGroup({
      "name": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "numOfBeds": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "numOfRooms": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
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
    this.servicesClass = new Array<ServicePrice>();
    if(this.cottage == undefined){
      this.cottageService.getCottageById(Number(sessionStorage.getItem("cottageToShow"))).subscribe(ret =>{
        this.cottage = ret;
        this.cottageChange = JSON.parse(JSON.stringify(this.cottage));
        this.servicesToShow();
        if(this?.cottageChange?.images != null){
          this.cottageImg = this?.cottageChange?.images[0];
        }
        this.cottageHotOffersForHotOffer.emit(this.cottageChange);
        
      })

    }
    else{
      this.cottageChange = JSON.parse(JSON.stringify(this.cottage));
      this.servicesToShow();
      
      if(this?.cottageChange?.images != null){
        this.cottageImg = this?.cottageChange?.images[0];
      }
      this.cottageHotOffersForHotOffer.emit(this.cottageChange);
    }
  }

  public servicesToShow(){
    if(this.cottageChange.services!=undefined){
      for (let s of this.cottageChange.services){
        let found = false;
        for (let ss of this.cottageChange.priceList){      
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
          let da = new ServicePrice();
          da.cost = 0;
          da.service = s;
          this.servicesClass.push(da);
        }
      }
    }
  }

  public select(image: String) {
    this.cottageImg = image;
    this.cottageChange.images.forEach((element, index) => {
      if (element === image) this.cottageChange.images.splice(index, 1);
    });
    this.cottageChange.images.unshift(image);

  }

  public removeImg() {
    this.cottageService.checkIsReserved(this.cottageChange).subscribe(ret =>{
      if(ret){
        this.cottageChange.images.forEach((element, index) => {
          if (element === this.cottageImg) {
            this.cottageChange.images.splice(index, 1);
          }
        });
        this.cottageService.removeCottageImg(this.cottageChange).subscribe(() => {
          this.cantRemove = false;
          this.cottage.images.forEach((element, index) => {
            if (element === this.cottageImg) {
              this.cottage.images.splice(index, 1);
            }
          });
          this.cottageImg = this.cottageChange.images[0];
          this.onIni();
        });
      }
      else{
        this.cantRemove = true;
      }
    })
    
  }

  public saveImg(){
    this.cottageService.checkIsReserved(this.cottageChange).subscribe(ret =>{
      if(ret){
        this.cantAdd = false;
        if(this.file?.name.match(/.(jpg)$/i)){
          this.invalidFile = false;
          this.cottageService.upload(this.file).subscribe(ret=>{
            if(ret){
              if(this?.cottageChange?.images == null){
                this.cottageChange.images = new Array<String>();
              }
              this.cottageChange.images.push(this.file.name);
              this.cottageService.changeCottage(this.cottageChange).subscribe(()=>{
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

  public isChecked(stri:string): boolean{
    if(this?.cottageChange !== undefined){
      if(this?.cottageChange?.services != null){
        for (let x of this.cottageChange?.services){
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
    this.cottageService.checkIsReserved(this.cottage).subscribe(ret => {
      if(ret){
        this.cantChange = false;
        this.cottage.services = new Array<Services>();
            for(let x of this.services){
              let element = <HTMLInputElement> document.getElementById(x);
              if(element.checked){
                if(x === 'WiFi'){
                  this.cottage.services.push(Services.WiFi);
                }
                else if(x === 'Parking'){
                  this.cottage.services.push(Services.Parking);
                }
                else if(x === 'Pool'){
                  this.cottage.services.push(Services.Pool);
                }
              }

            }
            for(let o of this.servicesClass){
              let element1 = <HTMLInputElement> document.getElementById(o.service.toString()+"serviceKlasa");
              let found = false;
              for (let n of this.cottage.priceList){
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
                this.cottage.priceList.push(o);
              }
            }
            this.cottageService.changeCottage(this.cottage).subscribe(() => {
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
  get numOfBeds() {
    return this.changeForm.get('numOfBeds');
  }
  get numOfRooms(){
    return this.changeForm.get('numOfRooms');
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
