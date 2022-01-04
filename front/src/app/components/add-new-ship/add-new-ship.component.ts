import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ship } from 'src/app/model/ship';
import { ShipService } from 'src/app/service/ship-service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-new-ship',
  templateUrl: './add-new-ship.component.html',
  styleUrls: ['./add-new-ship.component.css']
})
export class AddNewShipComponent implements OnInit {

  constructor(private shipService: ShipService,private userService: UserService) { }
  addNewShipForm:any;
  ship: Ship;
  @Output() shipToShow = new EventEmitter<Ship>();
  

  ngOnInit(): void {
    this.ship = new Ship;
    this.addNewShipForm = new FormGroup({
      "name": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "type": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "length": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "engineNumber": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z1-9 ]*')]),
      "enginePower": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "topSpeed": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]), 
      "capacity": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]), 
      "costPerNight": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "description": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "rules": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "address": new FormControl(null,[Validators.required,Validators.pattern('([A-ZŠĐČĆŽ]{1}[a-zšđčćž]+ )+[0-9]+')])
    });
  }

  submitData(){
    this.ship.availableTill = null;
    this.ship.availableFrom = null;
    this.ship.hotOffers = null;
    this.ship.images = null;
    this.ship.services = null;
    this.ship.priceList = null;
    this.ship.grades = null;
    this.ship.cancelRequirements = 'free';
    this.ship.fishingEquipment = null;
    this.ship.navigationEquipment = null;
    this.userService.getLoggedUser().subscribe(rer => {
      this.ship.owner = rer;
      this.shipService.addShip(this.ship).subscribe(ret=>{
        this.shipToShow.emit(ret);
      });
    })
    

  }

  get name() {
    return this.addNewShipForm.get('name');
  }
  get type() {
    return this.addNewShipForm.get('type');
  }
  get length(){
    return this.addNewShipForm.get('length');
  }
  get engineNumber() {
    return this.addNewShipForm.get('engineNumber');
  }
  get enginePower(){
    return this.addNewShipForm.get('enginePower');
  }
  get topSpeed() {
    return this.addNewShipForm.get('topSpeed');
  }
  get capacity(){
    return this.addNewShipForm.get('capacity');
  }
  get costPerNight() {
    return this.addNewShipForm.get('costPerNight');
  }
  get description() {
    return this.addNewShipForm.get('description');
  }
  get rules() {
    return this.addNewShipForm.get('rules');
  }
  get address() {
    return this.addNewShipForm.get('address');
  }

}
