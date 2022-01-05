import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  wrongPassword1: Boolean = false;
  wrongPassword2: Boolean = false;
  wrongPassword: Boolean = false;
  alreadySent: Boolean = false;
  allFavorReservations: Array<FavorReservation> = new Array<FavorReservation>();
  instructorReservations: Array<FavorReservation> = new Array<FavorReservation>();
  allFavors: Array<InstructorsFavor> = new Array<InstructorsFavor>();
  instructorFavors: Array<InstructorsFavor> = new Array<InstructorsFavor>();
  errorMessage: Boolean = false;
  newReservation1: FavorReservation;
  addReservationForm1:any;
  pickedUserError:boolean;
  isReserved1:boolean;
  availableTillError:boolean;
  pickedUser:boolean;
  @Output() seeUser = new EventEmitter<User>();
  @Input() reservationForApp: InstructorsFavor;

  constructor(private userService: UserService, private favorReservationService: FavorReservationService, private instructorsFavorService: InstructorsFavorService) { }

  ngOnInit(): void {
        this.newReservation1 = new FavorReservation();
        this.newReservation1.favor = new InstructorsFavor();
        this.availableTillError = false;
        this.pickedUser = false;
        this.pickedUserError = false;
        this.isReserved1 = false;
        this.addReservationForm1 = new FormGroup({
          "availableFrom1": new FormControl(null,[Validators.required]),
          "availableTill1": new FormControl(null,[Validators.required]),
          "cost1": new FormControl(null,[Validators.required,Validators.pattern('[1-9][0-9]*')])
        });

    this.userService.getLoggedUser().subscribe(ret => {
      this.instructor = ret;
      this.instructorChange = JSON.parse(JSON.stringify(this.instructor));
      this.instructorChange.password = "";
      this.passwordChange = JSON.parse(JSON.stringify(this.instructor));
      this.passwordChange.password = "";
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

  submitForm(){
    if(this.newReservation1.availableTill < this.newReservation1.availableFrom){
      this.availableTillError = true;
    } else {
      if(this.pickedUser){
        
        this.pickedUserError = false;
        this.availableTillError = false;

        this.favorReservationService.addReservationByOwner(this.newReservation1).subscribe(ret => {
          if(ret){
            this.allFavorReservations.push(JSON.parse(JSON.stringify(this.newReservation1)));
            this.instructorReservations.push(JSON.parse(JSON.stringify(this.newReservation1)));
            this.isReserved1 = false;
          }
          else{
            this.isReserved1 = true;
          }
          });
      }
    }
  }

  getClient(email:string,from:Date,till:Date,id:number){
    let today = new Date();
    let from1 = new Date(from);
    let till1 = new Date(till);
    if(today > from1 && today < till1){
      this.favorReservationService.getById(id).subscribe(ret => {
        this.newReservation1 = ret;
        this.newReservation1.id = 0;
      });
      this.userService.getUserByEmail(email).subscribe(ret =>{
        this.newReservation1.client = ret;
        this.pickedUser = true;
        this.pickedUserError = false;
      }); 
    }
    
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

  get availableFrom1(){
    return this.addReservationForm1.get('availableFrom1');
  }
  get availableTill1() {
    return this.addReservationForm1.get('availableTill1');
  }
  get cost1() {
    return this.addReservationForm1.get('cost1');
  }
}
