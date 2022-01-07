import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FavorServicePrice } from 'src/app/model/favor-service-price';
import { FavorServices, InstructorsFavor } from 'src/app/model/instructors-favor';
import { InstructorsFavorService } from 'src/app/service/instructors-favor.service';

@Component({
  selector: 'app-favor-profile',
  templateUrl: './favor-profile.component.html',
  styleUrls: ['./favor-profile.component.css']
})
export class FavorProfileComponent implements OnInit {
  favorChange: InstructorsFavor;
  changeForm:any;
  cantRemove:Boolean;
  cantAdd:Boolean;
  cantChange:Boolean;
  favorImg: String;
  @Output() favorHotOffersForHotOffer = new EventEmitter<InstructorsFavor>();
  file: File = null;
  invalidFile:boolean = false;
  @Input() favor: InstructorsFavor;

  favorServices = [
    'Boat', 'FishingRod'
  ];
  servicesClass: Array<FavorServicePrice>;

  constructor(private instructorsFavorService: InstructorsFavorService) { }

  ngOnInit(): void {
    this.onInit();
    this.changeForm = new FormGroup({
      "name": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z ]+')]),
      "numOfPersons": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "availableFrom": new FormControl(null,[Validators.required]),
      "availableTill": new FormControl(null,[Validators.required]),
      "cost": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "description": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "rules": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "address": new FormControl(null,[Validators.required,Validators.pattern('([A-ZŠĐČĆŽ]{1}[a-zšđčćž]+ *)+[0-9]*')])
    });
  }

  public onInit(){
    this.cantRemove = false;
    this.cantAdd = false;
    this.cantChange = false;
    this.servicesClass = new Array<FavorServicePrice>();
    if(this.favor == undefined){
      this.instructorsFavorService.getFavorById(Number(sessionStorage.getItem("favorToShow"))).subscribe(ret =>{
        this.favor = ret;
        this.favorChange = JSON.parse(JSON.stringify(this.favor));
        this.servicesToShow();
        if(this?.favorChange?.images != null){
          this.favorImg = this?.favorChange?.images[0];
        }
        this.favorHotOffersForHotOffer.emit(this.favorChange);

        var select = document.getElementById('select1') as HTMLSelectElement;
        if(this.favor.cancellationCondition === 'Free')
          select.value = '0';
        else if (this.favor.cancellationCondition === '5%')
          select.value = '1';
        else if (this.favor.cancellationCondition === '10%')
          select.value = '2';
        else if (this.favor.cancellationCondition === '15%')
          select.value = '3';
      })

    }
    else{
      this.favorChange = JSON.parse(JSON.stringify(this.favor));
      this.servicesToShow();
      
      if(this?.favorChange?.images != null){
        this.favorImg = this?.favorChange?.images[0];
      }
      this.favorHotOffersForHotOffer.emit(this.favorChange);
    }
  }

  public servicesToShow(){
    if(this.favorChange.services!=undefined){
      for (let s of this.favorChange.services){
        let found = false;
        for (let ss of this.favorChange.priceList){      
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
          let da = new FavorServicePrice();
          da.cost = 0;
          da.service = s;
          this.servicesClass.push(da);
        }
      }
    }
  }

  public isChecked(stri:string): boolean{
    if(this?.favorChange !== undefined){
      if(this?.favorChange?.services != null){
        for (let x of this.favorChange?.services){
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
    this.instructorsFavorService.checkIsReserved(this.favor).subscribe(ret => {
      if(ret){
        var select = document.getElementById('select1') as HTMLSelectElement;
        if(select.value === '0')
          this.favor.cancellationCondition = 'Free'
        else if (select.value === '1')
          this.favor.cancellationCondition = '5%'
        else if (select.value === '2')
          this.favor.cancellationCondition = '10%'
        else if (select.value === '3')
          this.favor.cancellationCondition = '15%'

        this.cantChange = false;
        this.favor.services = new Array<FavorServices>();
            for(let x of this.favorServices){
              let element = <HTMLInputElement> document.getElementById(x);
              if(element.checked){
                if(x === 'Boat'){
                  this.favor.services.push(FavorServices.Boat);
                }
                else if(x === 'FishingRod'){
                  this.favor.services.push(FavorServices.FishingRod);
                }
              }

            }
            for(let o of this.servicesClass){
              let element1 = <HTMLInputElement> document.getElementById(o.service.toString()+"serviceKlasa");
              let found = false;
              for (let n of this.favor.priceList){
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
                this.favor.priceList.push(o);
              }
            }
            this.instructorsFavorService.changeFavor(this.favor).subscribe(() => {
              this.onInit();
            });
              }
      else{
        this.cantChange = true;
      }
    })
  }

  public removeImg() {
    this.instructorsFavorService.checkIsReserved(this.favorChange).subscribe(ret =>{
      if(ret){
        this.favorChange.images.forEach((element, index) => {
          if (element === this.favorImg) {
            this.favorChange.images.splice(index, 1);
          }
        });
        this.instructorsFavorService.removeFavorImg(this.favorChange).subscribe(() => {
          this.cantRemove = false;
          this.favor.images.forEach((element, index) => {
            if (element === this.favorImg) {
              this.favor.images.splice(index, 1);
            }
          });
          this.favorImg = this.favorChange.images[0];
          this.onInit();
        });
      }
      else{
        this.cantRemove = true;
      }
    })
    
  }

  onChange(event) {
    this.file = event.target.files[0];
  }

  public select(image: String) {
    this.favorImg = image;
    this.favorChange.images.forEach((element, index) => {
      if (element === image) this.favorChange.images.splice(index, 1);
    });
    this.favorChange.images.unshift(image);

  }

  public saveImg(){
    this.instructorsFavorService.checkIsReserved(this.favorChange).subscribe(ret =>{
      if(ret){
        this.cantAdd = false;
        if(this.file?.name.match(/.(jpg)$/i)){
          this.invalidFile = false;
          this.instructorsFavorService.upload(this.file).subscribe(ret=>{
            if(ret){
              if(this?.favorChange?.images == null){
                this.favorChange.images = new Array<String>();
              }
              this.favorChange.images.push(this.file.name);
              this.instructorsFavorService.changeFavor(this.favorChange).subscribe(()=>{
                this.onInit();
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

  get name() {
    return this.changeForm.get('name');
  }
  get numOfBeds() {
    return this.changeForm.get('numOfBeds');
  }
  get numOfPersons(){
    return this.changeForm.get('numOfPersons');
  }
  get availableFrom(){
    return this.changeForm.get('availableFrom');
  }
  get availableTill() {
    return this.changeForm.get('availableTill');
  }
  get cost() {
    return this.changeForm.get('cost');
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
