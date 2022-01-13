import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cottage } from 'src/app/model/cottage';
import { Ship } from 'src/app/model/ship';
import { User } from 'src/app/model/user';
import { AccountDeleteRequestService } from 'src/app/service/account-delete-request-service.service';
import { CottageService } from 'src/app/service/cottage-service.service';
import { GradeService } from 'src/app/service/grade-service.service';
import { ShipService } from 'src/app/service/ship-service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-administrator-profile',
  templateUrl: './administrator-profile.component.html',
  styleUrls: ['./administrator-profile.component.css']
})
export class AdministratorProfileComponent implements OnInit {

  constructor(private userService: UserService, private cottageService: CottageService, private shipService: ShipService, 
              private accountDeleteRequestsService: AccountDeleteRequestService, private gradeService: GradeService) { }

  editAdministratorForm:any;
  editPasswordForm:any;
  administrator: User;
  administratorChange: User;
  passwordChange:User;
  wrongPassword1: Boolean;
  wrongPassword2: Boolean;
  wrongPassword: Boolean;
  alreadySent: Boolean;
  allUsers: Array<User>;
  allCottages: any;
  allBoats: any;
  allShips: any;
  allRequests: any;
  allGrades: any;
  deletingUser: User;
  acceptingUser: User;
  deletingCottage: Cottage;
  deletingShip: Ship;

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.userService.getLoggedUser().subscribe(ret => {
      this.administrator = ret;
      this.administratorChange = JSON.parse(JSON.stringify(this.administrator));
      this.administratorChange.password = "";
      this.passwordChange = JSON.parse(JSON.stringify(this.administrator));
      this.passwordChange.password = "";
      this.wrongPassword1 = false;
      this.wrongPassword2 = false;
      this.wrongPassword = false;
      this.alreadySent = false;
    });
    this.userService.getAllUsers().subscribe(usersFromBack =>{
      this.allUsers = usersFromBack;
    }); 
    this.cottageService.getAllCottages().subscribe(cottagesFromBack => {
      this.allCottages = cottagesFromBack;
    });
    this.shipService.getAllShips().subscribe(shipsFromBack => {
      this.allShips = shipsFromBack;
    });
    this.accountDeleteRequestsService.getAllRequests().subscribe(requestsFromBack => {
      this.allRequests = requestsFromBack;
    });
    this.gradeService.getAllGrades().subscribe(gradesFromBack => {
      this.allGrades = gradesFromBack;
    });

    this.acceptingUser = new User()
    this.deletingUser = new User()
    this.editAdministratorForm = new FormGroup({
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

  submitData(){
    this.wrongPassword1 = true;
    this.userService.change(this.administratorChange).subscribe(ret =>{
      if(ret){
        this.wrongPassword1 = false;
        
      }
      else{
        
      }
    })
  }

  submitPassword(){
    this.wrongPassword = true;
    if(this.administrator.password == this.editPasswordForm.get('currentPassword').value){
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

  validatePass(){
    if(this.editPasswordForm.get('newPassword').value === this.editPasswordForm.get('newPassword1').value) {
       this.wrongPassword2 = false;
    }
    else{
      this.wrongPassword2 = true;
    }
  }


  get firstName() {
    return this.editAdministratorForm.get('firstName');
  }
  get lastName() {
    return this.editAdministratorForm.get('lastName');
  }
  get mobileNumber(){
    return this.editAdministratorForm.get('mobileNumber');
  }
  get city() {
    return this.editAdministratorForm.get('city');
  }
  get country() {
    return this.editAdministratorForm.get('country');
  }
  get address() {
    return this.editAdministratorForm.get('address');
  }
  get password() {
    return this.editAdministratorForm.get('password');
  }
  get reason() {
    return this.editAdministratorForm.get('reason');
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

  userDeleted(index: number) {
    this.deletingUser = this.allUsers[index]
    this.userService.removeUser(this.deletingUser.id).subscribe(ret => {
      if(ret) {
        this.allUsers.splice(index, 1);
        this.cottageService.getAllCottages().subscribe(cottagesFromBack => {
          this.allCottages = cottagesFromBack;
        });
        this.shipService.getAllShips().subscribe(shipsFromBack => {
          this.allShips = shipsFromBack;
        });
      }
    });
  }

  userDeclined(index:number) {
    let declineUser = this.allUsers[index]
    this.userService.declineUser(declineUser.id).subscribe(ret => {
      if(ret)
        this.userService.getAllUsers().subscribe(ret => {
          this.allUsers = ret;
        });
    });
  }

  acceptUser(index: number) {
    this.acceptingUser = this.allUsers[index]
    this.userService.acceptUser(this.acceptingUser.id).subscribe(ret => {
      if(ret)
        this.allUsers[index].verified = true;
    });
  }

  deleteCottage(index: number) {
    this.deletingCottage = this.allCottages[index];
    this.cottageService.removeCottageByAdministrator(this.deletingCottage.id).subscribe(ret => {
      if(ret)
        this.allCottages.splice(index, 1);
    })
  }

  deleteShip(index: number) {
    this.deletingShip = this.allShips[index];
    this.shipService.removeShipByAdministrator(this.deletingShip.id).subscribe(ret => {
      if(ret)
        this.allShips.splice(index, 1);
    })
  }

  acceptRequest(index: number) {
    let acceptingRequest = this.allRequests[index];
    this.accountDeleteRequestsService.deleteRequest(acceptingRequest.id).subscribe(ret => {
      if(ret)
        this.userService.removeUser(acceptingRequest.user.id).subscribe(ret => {
          if(ret) {
            this.userService.getAllUsers().subscribe(ret => {
              this.allUsers = ret;
              this.allRequests[index].seen = true;
            });
            this.cottageService.getAllCottages().subscribe(cottagesFromBack => {
              this.allCottages = cottagesFromBack;
            });
            this.shipService.getAllShips().subscribe(shipsFromBack => {
              this.allShips = shipsFromBack;
            });
          }
        });
    });
  }

  declineRequest(index: number) {
    let deletingRequest = this.allRequests[index];
    this.accountDeleteRequestsService.deleteRequest(deletingRequest.id).subscribe(ret => {
      if(ret)
        this.allRequests[index].seen = true;
    });
  }

  acceptGrade(index: number) {
    let acceptingGrade = this.allGrades[index];
    this.gradeService.acceptGrade(acceptingGrade.id).subscribe(ret => {
      if(ret)
        this.gradeService.getAllGrades().subscribe(ret => {
          this.allGrades = ret;
        });
    });
  }

  declineGrade(index: number) {
    let deletingGrade = this.allGrades[index];
    this.gradeService.removeGrade(deletingGrade.id).subscribe(ret => {
      if(ret)
        this.gradeService.getAllGrades().subscribe(ret => {
          this.allGrades = ret;
        });
    });
  }
}
