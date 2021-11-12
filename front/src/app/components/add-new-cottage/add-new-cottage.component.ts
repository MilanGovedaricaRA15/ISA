import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cottage } from 'src/app/model/cottage';
import { CottageService } from 'src/app/service/cottage-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-new-cottage',
  templateUrl: './add-new-cottage.component.html',
  styleUrls: ['./add-new-cottage.component.css']
})
export class AddNewCottageComponent implements OnInit {

  constructor(private cottageService: CottageService,private userService: UserService) { }
  addNewCottageForm:any;
  cottage: Cottage;
  @Output() cottageToShow = new EventEmitter<Cottage>();
  

  ngOnInit(): void {
    this.cottage = new Cottage;
    this.addNewCottageForm = new FormGroup({
      "name": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "numOfBeds": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "numOfRooms": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "costPerNight": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "description": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "rules": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "address": new FormControl(null,[Validators.required,Validators.pattern('([A-ZŠĐČĆŽ]{1}[a-zšđčćž]+ )+[0-9]+')])    
    });
  }

  submitData(){
    this.cottage.availableTill = null;
    this.cottage.availableFrom = null;
    this.cottage.hotOffers = null;
    this.cottage.images = null;
    this.cottage.services = null;
    this.userService.getLoggedUser().subscribe(rer => {
      this.cottage.owner = rer;
      this.cottageService.addCottage(this.cottage).subscribe(ret=>{
        this.cottageToShow.emit(ret);
      });
    })
    

  }

  get name() {
    return this.addNewCottageForm.get('name');
  }
  get numOfBeds() {
    return this.addNewCottageForm.get('numOfBeds');
  }
  get numOfRooms(){
    return this.addNewCottageForm.get('numOfRooms');
  }
  get costPerNight() {
    return this.addNewCottageForm.get('costPerNight');
  }
  get description() {
    return this.addNewCottageForm.get('description');
  }
  get rules() {
    return this.addNewCottageForm.get('rules');
  }
  get address() {
    return this.addNewCottageForm.get('address');
  }

}
