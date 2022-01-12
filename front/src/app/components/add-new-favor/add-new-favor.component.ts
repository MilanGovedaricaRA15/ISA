import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstructorsFavor } from 'src/app/model/instructors-favor';
import { InstructorsFavorService } from 'src/app/service/instructors-favor.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-new-favor',
  templateUrl: './add-new-favor.component.html',
  styleUrls: ['./add-new-favor.component.css']
})
export class AddNewFavorComponent implements OnInit {
  addNewFavorForm:any;
  favor: InstructorsFavor;
  @Output() favorToShow = new EventEmitter<InstructorsFavor>();

  constructor(private userService: UserService, private instructorsFavorService: InstructorsFavorService) { }

  ngOnInit(): void {
    this.favor = new InstructorsFavor();
    this.addNewFavorForm = new FormGroup({
      "name": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "numOfPersons": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "cost": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')]),
      "description": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "rules": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "address": new FormControl(null,[Validators.required,Validators.pattern('([A-ZŠĐČĆŽ]{1}[a-zšđčćž]+ *)+[0-9]*')])    
    });
  }

  submitData(){
    this.favor.availableTill = null;
    this.favor.availableFrom = null;
    this.favor.hotOffers = null;
    this.favor.images = null;
    this.favor.services = null;
    this.favor.priceList = null;
    this.favor.grades = null;
    this.userService.getLoggedUser().subscribe(ret => {
      this.favor.instructor = ret;
      this.instructorsFavorService.addFavor(this.favor).subscribe(ret=>{
        this.favorToShow.emit(ret);
      });
    })
    

  }

  get name() {
    return this.addNewFavorForm.get('name');
  }
  get numOfPersons() {
    return this.addNewFavorForm.get('numOfPersons');
  }
  get cost() {
    return this.addNewFavorForm.get('cost');
  }
  get description() {
    return this.addNewFavorForm.get('description');
  }
  get rules() {
    return this.addNewFavorForm.get('rules');
  }
  get address() {
    return this.addNewFavorForm.get('address');
  }

}
