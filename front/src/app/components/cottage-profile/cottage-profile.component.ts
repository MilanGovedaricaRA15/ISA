import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Cottage, Services } from 'src/app/model/cottage';
import { HotOffer } from 'src/app/model/hot-offer';
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
  @Output() cottageHotOffersForHotOffer = new EventEmitter<Cottage>();
  file: File = null;
  invalidFile:boolean = false;
  @Input() cottage: Cottage;

  services = [
   'WiFi','Parking','Pool'
  ];

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
    if(this.cottage == undefined){
      this.cottageService.getCottageById(Number(sessionStorage.getItem("cottageToShow"))).subscribe(ret =>{
        this.cottage = ret;
        this.cottageChange = JSON.parse(JSON.stringify(this.cottage));
        if(this?.cottageChange?.images != null){
          this.cottageImg = this?.cottageChange?.images[0];
        }
        this.cottageHotOffersForHotOffer.emit(this.cottageChange);
      })

    }
    else{
      this.cottageChange = JSON.parse(JSON.stringify(this.cottage));
    
      
      if(this?.cottageChange?.images != null){
        this.cottageImg = this?.cottageChange?.images[0];
      }
      this.cottageHotOffersForHotOffer.emit(this.cottageChange);
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
    this.cottageChange.images.forEach((element, index) => {
      if (element === this.cottageImg) {
        this.cottageChange.images.splice(index, 1);
      }
    });
    this.cottageService.removeCottageImg(this.cottageChange).subscribe(() => {
      this.cottage.images.forEach((element, index) => {
        if (element === this.cottageImg) {
          this.cottage.images.splice(index, 1);
        }
      });
      this.cottageImg = this.cottageChange.images[0];
      this.onIni();
    });
  }

  public saveImg(){
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
    this.cottageService.changeCottage(this.cottage).subscribe(() => {
      this.onIni();
    });
    

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
