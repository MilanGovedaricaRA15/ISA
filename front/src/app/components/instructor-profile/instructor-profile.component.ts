import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FavorReservation } from 'src/app/model/favor-reservation';
import { InstructorsFavor } from 'src/app/model/instructors-favor';
import { User } from 'src/app/model/user';
import { FavorReservationService } from 'src/app/service/favor-reservation.service';
import { InstructorsFavorService } from 'src/app/service/instructors-favor.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {

  editInstructorForm:any;
  editPasswordForm:any;
  instructor: User;
  passwordChange:User;
  instructorChange: User = new User();
  wrongPassword1: Boolean;
  wrongPassword2: Boolean;
  wrongPassword: Boolean;
  alreadySent: Boolean;
  allFavorReservations: Array<FavorReservation> = new Array<FavorReservation>();
  instructorReservations: Array<FavorReservation> = new Array<FavorReservation>();
  allFavors: Array<InstructorsFavor> = new Array<InstructorsFavor>();
  instructorFavors: Array<InstructorsFavor> = new Array<InstructorsFavor>();
  errorMessage: Boolean = false;
  @Output() seeUser = new EventEmitter<User>();

  constructor(private userService: UserService, private favorReservationService: FavorReservationService, private instructorsFavorService: InstructorsFavorService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.instructor = ret;
      this.instructorChange = JSON.parse(JSON.stringify(this.instructor));
      this.instructorChange.password = "";
      this.passwordChange = JSON.parse(JSON.stringify(this.instructor));
      this.passwordChange.password = "";
      this.wrongPassword1 = false;
      this.wrongPassword2 = false;
      this.wrongPassword = false;
      this.alreadySent = false;
    });

    this.instructorsFavorService.getAllFavors().subscribe(ret => {
      this.allFavors = ret;
      for(let f of this.allFavors){
        if(f.instructor.id == this.instructor.id)
          this.instructorFavors.push(f);
      }
    });
    
    this.favorReservationService.getAllReservations().subscribe(ret => {
      this.allFavorReservations = ret;
      for(let fr of this.allFavorReservations){
        if(this.checkFavor(fr.id))
          this.instructorReservations.push(fr);
      }
    });

    this.editInstructorForm = new FormGroup({
      "firstName": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "lastName": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "mobileNumber": new FormControl(null,[Validators.required,Validators.pattern('[0-9]{9}')]),
      "country": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "city": new FormControl(null,[Validators.required,Validators.pattern('[A-Z]{1}[a-z]+')]),
      "address": new FormControl(null,[Validators.required,Validators.pattern('([A-ZŠĐČĆŽ]{1}[a-zšđčćž]+ )+[0-9]+')]),
      "password": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "reason": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')])
    });
    this.editPasswordForm = new FormGroup({
      "currentPassword": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "newPassword": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "newPassword1": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')])
    });
  }

  checkFavor(favorId: number): Boolean {
    for(let f of this.allFavors) {
      if(f.id == favorId && f.instructor.id == this.instructor.id)
        return true;
    }

    return false;
  }

  isFavorReserved(instructorFavor: InstructorsFavor): Boolean {
    for(let r of this.allFavorReservations){
      if(r.id == instructorFavor.id)
        return false;
    }

    return true;
  }

  submitData(){
    this.wrongPassword1 = true;
    this.userService.change(this.instructorChange).subscribe(ret =>{
      if(ret){
        this.wrongPassword1 = false;
        
      }
      else{
        
      }
    })
  }

  submitPassword(){
    this.wrongPassword = true;
    if(this.instructor.password == this.editPasswordForm.get('currentPassword').value){
      this.userService.changePassword(this.passwordChange,this.editPasswordForm.get('currentPassword').value).subscribe(ret =>{
        if(ret){
          this.wrongPassword = false;
          this.passwordChange.password = "";
          this.wrongPassword2 = false;
          this.editPasswordForm = new FormGroup({
            "currentPassword": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
            "newPassword": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
            "newPassword1": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')])
          });
        }
      })
    }
    else {
      this.wrongPassword = true;
    }
  }

  addNewFavor(): void {

  }

  requestDelete(): void {}

  validatePass(){
    if(this.editPasswordForm.get('newPassword').value === this.editPasswordForm.get('newPassword1').value) {
       this.wrongPassword2 = false;
    }
    else{
      this.wrongPassword2 = true;
    }
  }


  get firstName() {
    return this.editInstructorForm.get('firstName');
  }
  get lastName() {
    return this.editInstructorForm.get('lastName');
  }
  get mobileNumber(){
    return this.editInstructorForm.get('mobileNumber');
  }
  get city() {
    return this.editInstructorForm.get('city');
  }
  get country() {
    return this.editInstructorForm.get('country');
  }
  get address() {
    return this.editInstructorForm.get('address');
  }
  get password() {
    return this.editInstructorForm.get('password');
  }
  get reason() {
    return this.editInstructorForm.get('reason');
  }
  get currentPassword() {
    return this.editPasswordForm.get('currentPassword');
  }
  get newPassword() {
    return this.editPasswordForm.get('newPassword');
  }
  get newPassword1() {
    return this.editPasswordForm.get('newPassword1');
  }

  seeUserProfile(email:string){
    this.userService.getUserByEmail(email).subscribe(ret => {
      this.seeUser.emit(ret);
    })
  }

  removeFavor(index: number): void{
    var favor = this.instructorFavors[index]
    if(this.isFavorReserved(favor)){
      this.errorMessage = false;
      this.instructorsFavorService.deleteFavor(favor.id).subscribe(ret => {
        if(ret)
          this.instructorFavors.splice(index, 1);
      });
    } else
      this.errorMessage = true;
  }
}
