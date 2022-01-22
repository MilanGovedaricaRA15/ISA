import { Component, OnInit, Output, EventEmitter, Input, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cottage } from 'src/app/model/cottage';
import { InstructorsFavor } from 'src/app/model/instructors-favor';
import { Report } from 'src/app/model/report';
import { Ship } from 'src/app/model/ship';
import { User } from 'src/app/model/user';
import { AccountDeleteRequestService } from 'src/app/service/account-delete-request-service.service';
import { BookingRevenueService } from 'src/app/service/booking-revenue.service';
import { ComplaintServiceService } from 'src/app/service/complaint-service.service';
import { CottageReservationService } from 'src/app/service/cottage-reservation-service.service';
import { CottageService } from 'src/app/service/cottage-service.service';
import { FavorReservationService } from 'src/app/service/favor-reservation.service';
import { GradeService } from 'src/app/service/grade-service.service';
import { InstructorsFavorService } from 'src/app/service/instructors-favor.service';
import { ReportServiceService } from 'src/app/service/report-service.service';
import { ShipReservationService } from 'src/app/service/ship-reservation-service.service';
import { ShipService } from 'src/app/service/ship-service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-superior-administrator-profile',
  templateUrl: './superior-administrator-profile.component.html',
  styleUrls: ['./superior-administrator-profile.component.css']
})
export class SuperiorAdministratorProfileComponent implements OnInit {

  constructor(private userService: UserService, private cottageService: CottageService, private shipService: ShipService, 
              private accountDeleteRequestsService: AccountDeleteRequestService, private gradeService: GradeService, 
              private complaintService : ComplaintServiceService, private bookingRevenueService: BookingRevenueService, 
              private cottageReservationService: CottageReservationService, private shipReservationService: ShipReservationService, 
              private favorReservationService: FavorReservationService, private instructorsFavorService: InstructorsFavorService,
              private reportService: ReportServiceService) { }

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
  allShips: any;
  allRequests: any;
  allGrades: any;
  allComplaints: any;
  allFavors: any;
  allReports: any;
  deletingUser: User;
  acceptingUser: User;
  deletingCottage: Cottage;
  deletingShip: Ship;
  regularRevenue: number;
  silverRevenue: number;
  goldRevenue: number;
  errorRevenue: Boolean = false;
  totalBookingRevenues: number = 0;
  datumTo: Date
  datumFrom: Date
  datumToString: String = new Date().toISOString().split('T')[0];
  datumFromString: String = new Date().toISOString().split('T')[0];
  @Output() addAdmin = new EventEmitter<string>();
  @Output() addAnswer = new EventEmitter<string>();
  @Output() addReason = new EventEmitter<string>();
  @Output() decliningReason = new EventEmitter<string>();

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.bookingRevenueService.getRevenues().subscribe(revenuesFromBack => {
      this.regularRevenue = revenuesFromBack.numOfRevenueRegular;
      this.silverRevenue = revenuesFromBack.numOfRevenueSilver;
      this.goldRevenue = revenuesFromBack.numOfRevenueGold;
    });

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
    this.reportService.getAllReports().subscribe(reportsFromBack => {
      this.allReports = reportsFromBack;
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
    this.complaintService.getAllComplaints().subscribe(complaintsFromBack => {
      this.allComplaints = complaintsFromBack;
    });
    this.instructorsFavorService.getAllFavors().subscribe(favorsFromBack => {
      this.allFavors = favorsFromBack;
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

  addNewAdmin() {
    this.addAdmin.emit('addAdmin');
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
        this.complaintService.getAllComplaints().subscribe(complaintsFromBack => {
          this.allComplaints = complaintsFromBack;
        });
        this.reportService.getAllReports().subscribe(reportsFromBack => {
          this.allReports = reportsFromBack;
        });
      }
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

  acceptUser(index: number) {
    this.acceptingUser = this.allUsers[index]
    this.userService.acceptUser(this.acceptingUser.id).subscribe(ret => {
      if(ret)
        this.allUsers[index].verified = true;
    });
  }

  userDeclined(index:number) {
    this.decliningReason.emit(index.toString());
  }

  acceptRequest(index: number) {
    let acceptingRequest = this.allRequests[index];
    this.accountDeleteRequestsService.acceptRequest(acceptingRequest).subscribe(ret => {
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
    this.addReason.emit(index.toString());
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

  sendAnswer(index: number) {
    this.addAnswer.emit(index.toString());
  }

  changeRevenues() {
    this.errorRevenue = false;
    let regularRev = document.getElementById("regularRevenueId") as HTMLInputElement;
    let silverRev = document.getElementById("silverRevenueId") as HTMLInputElement;
    let goldRev = document.getElementById("goldRevenueId") as HTMLInputElement;
    if(parseInt(regularRev.value) > 100 || parseInt(regularRev.value) < 0 || 
        parseInt(silverRev.value) > 100 || parseInt(silverRev.value) < 0 ||
        parseInt(goldRev.value) > 100 || parseInt(goldRev.value) < 0) {
      this.errorRevenue = true;
      return;
    }
      
    this.bookingRevenueService.changeRevenues(parseInt(regularRev.value), parseInt(silverRev.value), parseInt(goldRev.value)).subscribe(ret => {
      if(ret) {
        this.bookingRevenueService.getRevenues().subscribe(revenuesFromBack => {
          this.regularRevenue = revenuesFromBack.numOfRevenueRegular;
          this.silverRevenue = revenuesFromBack.numOfRevenueSilver;
          this.goldRevenue = revenuesFromBack.numOfRevenueGold;
          alert('Successfully changed!')
        });
      }
    })
  }

  showReport() {
    let elementFrom = <HTMLInputElement> document.getElementById("from");
    let elementTo = <HTMLInputElement> document.getElementById("to");
    this.totalBookingRevenues = 0;
    this.cottageReservationService.getAllReservationsFromBaseFromTill(elementFrom.valueAsDate, elementTo.valueAsDate).subscribe(ret => {
      for(let cr of ret){
        if(cr.cottage.owner.type.toString() == 'Regular')
          this.totalBookingRevenues += (cr.cost * this.regularRevenue / 100);
        else if (cr.cottage.owner.type.toString() == 'Silver')
          this.totalBookingRevenues += (cr.cost * this.silverRevenue / 100);
        else
          this.totalBookingRevenues += (cr.cost * this.goldRevenue / 100);
      }
      this.shipReservationService.getAllReservationsFromBaseFromTill(elementFrom.valueAsDate, elementTo.valueAsDate).subscribe(ret => {
        for(let sr of ret){
          if(sr.ship.owner.type.toString() == 'Regular')
            this.totalBookingRevenues += (sr.cost * this.regularRevenue / 100);
          else if (sr.ship.owner.type.toString() == 'Silver')
            this.totalBookingRevenues += (sr.cost * this.silverRevenue / 100);
          else
            this.totalBookingRevenues += (sr.cost * this.goldRevenue / 100);
        }
        this.favorReservationService.getAllReservationsFromBaseFromTill(elementFrom.valueAsDate, elementTo.valueAsDate).subscribe(ret => {
          for(let fr of ret){
            if(fr.favor.instructor.type.toString() == 'Regular')
              this.totalBookingRevenues += (fr.cost * this.regularRevenue / 100);
            else if (fr.favor.instructor.type.toString() == 'Silver')
              this.totalBookingRevenues += (fr.cost * this.silverRevenue / 100);
            else
              this.totalBookingRevenues += (fr.cost * this.goldRevenue / 100);
          }
          this.checkHotOffers();
        })
      })
    })
  }

  checkHotOffers() {
    for(let cottage of this.allCottages) {
      this.checkCottageHotOffers(cottage)
    }

    for(let ship of this.allShips) {
      this.checkShipHotOffers(ship);
    }

    for(let favor of this.allFavors) {
      this.checkFavorHotOffers(favor);
    }
  }

  checkCottageHotOffers(cottage: Cottage) {
    let elementFrom = <HTMLInputElement> document.getElementById("from");
    let elementTo = <HTMLInputElement> document.getElementById("to");
    for(let offer of cottage.hotOffers) {
      if(elementFrom.valueAsDate <= new Date(offer.availableFrom.toString()) && elementTo.valueAsDate >= new Date(offer.availableTill)) {
        if(cottage.owner.type.toString() == 'Regular')
          this.totalBookingRevenues += (offer.cost * this.regularRevenue / 100);
        else if (cottage.owner.type.toString() == 'Silver')
          this.totalBookingRevenues += (offer.cost * this.silverRevenue / 100);
        else
          this.totalBookingRevenues += (offer.cost * this.goldRevenue / 100);
      }
    }
  }

  checkShipHotOffers(ship: Ship) {
    let elementFrom = <HTMLInputElement> document.getElementById("from");
    let elementTo = <HTMLInputElement> document.getElementById("to");
    for(let offer of ship.hotOffers) {
      if(elementFrom.valueAsDate <= new Date(offer.availableFrom.toString()) && elementTo.valueAsDate >= new Date(offer.availableTill)) {
        if(ship.owner.type.toString() == 'Regular')
          this.totalBookingRevenues += (offer.cost * this.regularRevenue / 100);
        else if (ship.owner.type.toString() == 'Silver')
          this.totalBookingRevenues += (offer.cost * this.silverRevenue / 100);
        else
          this.totalBookingRevenues += (offer.cost * this.goldRevenue / 100);
      }
    }
  }

  checkFavorHotOffers(favor: InstructorsFavor) {
    let elementFrom = <HTMLInputElement> document.getElementById("from");
    let elementTo = <HTMLInputElement> document.getElementById("to");
    for(let offer of favor.hotOffers) {
      if(elementFrom.valueAsDate <= new Date(offer.availableFrom.toString()) && elementTo.valueAsDate >= new Date(offer.availableTill)) {
        if(favor.instructor.type.toString() == 'Regular')
          this.totalBookingRevenues += (offer.cost * this.regularRevenue / 100);
        else if (favor.instructor.type.toString() == 'Silver')
          this.totalBookingRevenues += (offer.cost * this.silverRevenue / 100);
        else
          this.totalBookingRevenues += (offer.cost * this.goldRevenue / 100);
      }
    }
  }
  
  acceptReport(index: number) {
    let report = this.allReports[index]
    this.reportService.changeVerified(report.id).subscribe(ret => {
      if(ret)
        this.allReports.splice(index, 1);
    })
  }

  declineReport(index: number) {
    let report = this.allReports[index]
    this.reportService.removeReport(report.id).subscribe(ret => {
      if(ret)
        this.allReports.splice(index, 1);
    });
  }
}
