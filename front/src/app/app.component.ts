import { Component } from '@angular/core';
import { Cottage } from './model/cottage';
import { User } from './model/user';
import { CottageReservation } from './model/cottage-reservation';
import { Ship } from './model/ship';
import { ShipReservation } from './model/ship-reservation';
import { UserService } from './service/user-service.service';
import { InstructorsFavor } from './model/instructors-favor';
import { FavorReservation } from './model/favor-reservation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'izdaj-me';
  cottageForHotOffers: Cottage;
  cottageToShow: Cottage;
  shipToShow: Ship;
  shipForHotOffers: Ship;
  cottageToShowUnauthenticated: Cottage;
  shipToShowUnauthenticated: Ship;
  instructorToShowUnauthenticated: User;
  cottageToShowClient: Cottage;
  shipToShowClient: Ship;
  instructorToShowClient: User;
  clientToShowAuthenticated: User;
  clientProfileAuthenticated: User;
  userForOwner: User;
  cottageReservationReceive:CottageReservation;
  shipReservationReceive:ShipReservation;
  reservationForHotOffers: InstructorsFavor;
  favorToShow: InstructorsFavor;
  favorReservation: FavorReservation;
  favorReservationReceive: FavorReservation;
  favorForHotOffers: InstructorsFavor;
  cottageToGradeClient: Cottage;
  shipToGradeClient: Ship;
  instructorToGradeClient: User;
  clientToDeleteAccount: User;

  /**
   *
   */
  showCompNumber: number = 0;
  constructor(private userService: UserService) {

  }

  public ngOnInit() {
    if(sessionStorage.getItem("page") != null){
      this.changeNumber(Number(sessionStorage.getItem("page")));
    }


  }
  onRegister(message: string) {
     if(message === 'user_registered'){
       this.changeNumber(2);
       sessionStorage.setItem("page",'2');
     }
    }

  adminAdded(message: string) {
    if(message === 'user_registered'){
      this.changeNumber(8);
      sessionStorage.setItem("page",'8');
    }
  }
    onRegisterClient(message: string) {
      if(message === 'user_registered'){
        this.changeNumber(2);
        sessionStorage.setItem("page", '2');
      }
     }

  onLogin(message: string){
    if(message === 'cottageAdvertiser'){
      this.changeNumber(3);
      sessionStorage.setItem("page",'3');
    }
    else if(message === 'boatAdvertiser'){
      this.changeNumber(4);
      sessionStorage.setItem("page",'4');
    } else if(message === 'administrator'){
      this.changeNumber(7);
      sessionStorage.setItem("page",'7');
    } else if(message === 'administratorSuperior'){
      this.changeNumber(8);
      sessionStorage.setItem("page",'8');
    } else if(message === 'administratorFirstLogged'){
      this.changeNumber(9);
      sessionStorage.setItem("page",'9');
    }
    else if (message === 'client') {
      this.changeNumber(31);
      sessionStorage.setItem("page", '31');
    }
    else if (message === 'instructor') {
      this.changeNumber(61);
      sessionStorage.setItem("page", '61');
    }

  }

  receiveCottageReservation(cottageReservation: CottageReservation){
    this.cottageReservationReceive = cottageReservation;
    this.changeNumber(210);
    sessionStorage.setItem("page",'210');
    sessionStorage.setItem('receiveCottageReservation',cottageReservation.id.toString());
  }

  receiveShipReservation(shipReservation: ShipReservation){
    this.shipReservationReceive = shipReservation;
    this.changeNumber(211);
    sessionStorage.setItem("page",'211');
    sessionStorage.setItem('receiveShipReservation',shipReservation.id.toString());
  }

  receiveFavorReservation(favorReservation: FavorReservation){
    this.favorReservation = favorReservation;
    this.changeNumber(64);
    sessionStorage.setItem("page",'64');
    sessionStorage.setItem('receiveFavorReservation',favorReservation.id.toString());
  }

  onClientLogin(client: User) {
    this.clientToShowAuthenticated = client;
    sessionStorage.setItem("clientToShowAuthenticated", this.clientToShowAuthenticated.email);
  }

  addNewCottage(b:Boolean){
    this.changeNumber(6);
    sessionStorage.setItem("page",'6');
  }

  addNewFavor(b:Boolean){
    this.changeNumber(63);
    sessionStorage.setItem("page", "63");
  }

  addNewShip(b:Boolean){
    this.changeNumber(206);
    sessionStorage.setItem("page",'206');
  }

  onCottageClick(cottage: Cottage){
    this.cottageToShow = cottage;
    this.changeNumber(5);
    sessionStorage.setItem("page", '5');
    sessionStorage.setItem("cottageToShow", this.cottageToShow.id.toString());
  }

  onFavorClick(favor: InstructorsFavor){
    this.favorToShow = favor;
    this.changeNumber(62);
    sessionStorage.setItem("page", '62');
    sessionStorage.setItem("favorToShow", this.favorToShow.id.toString());
  }

  onShipClick(ship: Ship){
    this.shipToShow = ship;
    this.changeNumber(205);
    sessionStorage.setItem("page", '205');
    sessionStorage.setItem("shipToShow", this.shipToShow.id.toString());
  }

  onCottageClientClick(cottage: Cottage){
    this.cottageToShowClient = cottage;
    this.changeNumber(35);
    sessionStorage.setItem("page", '35');
    sessionStorage.setItem("cottageToShowClient", cottage.id.toString());
  }

  onShipClientClick(ship: Ship){
    this.shipToShowClient = ship;
    this.changeNumber(36);
    sessionStorage.setItem("page", '36');
    sessionStorage.setItem("shipToShowClient", ship.id.toString());
  }

  onInstructorClientClick(instructor: User){
    this.instructorToShowClient = instructor;
    this.changeNumber(37);
    sessionStorage.setItem("page", '37');
    sessionStorage.setItem("instructorToShowClient", instructor.email);
  }

  onCottageUnauthenticatedClick(cottage: Cottage){
    this.cottageToShowUnauthenticated = cottage;
    this.changeNumber(15);
    sessionStorage.setItem("page", '15');
    sessionStorage.setItem("cottageToShowUnauthenticated", cottage.id.toString());
  }

  onShipUnauthenticatedClick(ship: Ship){
    this.shipToShowUnauthenticated = ship;
    this.changeNumber(16);
    sessionStorage.setItem("page", '16');
    sessionStorage.setItem("shipToShowUnauthenticated", ship.id.toString());
  }

  onInstructorUnauthenticatedClick(instructor: User){
    this.instructorToShowUnauthenticated = instructor;
    this.changeNumber(17);
    sessionStorage.setItem("page", '17');
    sessionStorage.setItem("instructorToShowUnauthenticated", instructor.email);
  }

  showAdministratorProfile(message: string) {
    this.changeNumber(7);
    sessionStorage.setItem("page",'7');
  }

  goToProfile(){
    this.userService.isCottageAdvertiserLoggedIn().subscribe(res =>{
      if(res){this.changeNumber(3);
        sessionStorage.setItem("page",'3');}
    });
    this.userService.isBoatAdvertiserLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(4);
        sessionStorage.setItem("page",'4');
      }
    });
    this.userService.isAdministratorLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(7);
        sessionStorage.setItem("page",'7');
      }
    });
    this.userService.isSuperiorAdministratorLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(8);
        sessionStorage.setItem("page",'8');
      }
    });
    this.userService.isInstructorLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(61);
        sessionStorage.setItem("page",'61');
      }
    });
  }

  showReport() {
    this.changeNumber(303);
    sessionStorage.setItem("page",'303');
  }

  changeNumber(index: number) {
    this.showCompNumber = index;
  }

  updateHotOffers(fromCottageComponent: Cottage){
    this.cottageForHotOffers = fromCottageComponent;
  }

  updateFavorHotOffers(fromFavorComponent: InstructorsFavor) {
    this.favorForHotOffers = fromFavorComponent;
  }

  changeProfile(message: string){
    this.changeNumber(7);
    sessionStorage.setItem("page",'7');
  }

  addAdministrator() {
    this.changeNumber(50);
    sessionStorage.setItem("page",'50');
  } 

  addAnswer(index: string) {
    this.changeNumber(300);
    sessionStorage.setItem("page",'300');
    sessionStorage.setItem("complaintToAnswer", index);
  }

  addReason(index: string) {
    this.changeNumber(301);
    sessionStorage.setItem("page",'301');
    sessionStorage.setItem("requestToAnswer", index);
  }

  decliningUserReason(index: string) {
    this.changeNumber(302);
    sessionStorage.setItem("page",'302');
    sessionStorage.setItem("requestToDecliningAnswer", index);
  }

  answerIsSended() {
    this.userService.isSuperiorAdministratorLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(8);
        sessionStorage.setItem("page",'8');
      }
    });
    this.userService.isAdministratorLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(7);
        sessionStorage.setItem("page",'7');
      }
    });
  }

  reasonIsSended() {
    this.userService.isSuperiorAdministratorLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(8);
        sessionStorage.setItem("page",'8');
      }
    });
    this.userService.isAdministratorLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(7);
        sessionStorage.setItem("page",'7');
      }
    });
  }

  registrationReasonIsSended() {
    this.userService.isSuperiorAdministratorLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(8);
        sessionStorage.setItem("page",'8');
      }
    });
    this.userService.isAdministratorLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(7);
        sessionStorage.setItem("page",'7');
      }
    });
  }

  updateShipHotOffers(fromShipComponent: Ship){
    this.shipForHotOffers = fromShipComponent;
  }

  goToHomePage(){
    this.changeNumber(0);
    sessionStorage.setItem("page", '0');
  }

  goToCottagesPage(){
    this.changeNumber(11);
    sessionStorage.setItem("page", '11');
  }

  goToShipsPage(){
    this.changeNumber(12);
    sessionStorage.setItem("page", '12');
  }

  goToInstructorsPage(){
    this.changeNumber(13);
    sessionStorage.setItem("page", '13');
  }

  goToLoginPage(){
    this.changeNumber(2);
    sessionStorage.setItem("page", '2');
  }

  goToClientProfile(){
    this.changeNumber(31);
    sessionStorage.setItem("page", '31');
  }

  goToCottagesPageClient(){
    this.changeNumber(32);
    sessionStorage.setItem("page", '32');
  }

  goToShipsPageClient(){
    this.changeNumber(33);
    sessionStorage.setItem("page", '33');
  }

  goToInstructorsPageClient(){
    this.changeNumber(34);
    sessionStorage.setItem("page", '34');
  }

  goToFaultsPageClient(){
    this.changeNumber(38);
    sessionStorage.setItem("page", '38');
  }

  goToSubscribedEntitiesPageClient(){
    this.changeNumber(39);
    sessionStorage.setItem("page", '39');
  }

  goToComplaintsPageClient(){
    this.changeNumber(40);
    sessionStorage.setItem("page", '40');
  }

  goToReservationsPageClient() {
    this.changeNumber(42);
    sessionStorage.setItem("page", '42');
  }

  goToCreateReservationPageClient() {
    this.changeNumber(41);
    sessionStorage.setItem("page", '41');
  }

  gradeCottage(cottage: Cottage) {
    this.cottageToGradeClient = cottage;
    this.changeNumber(43);
    sessionStorage.setItem("page", "43");
    sessionStorage.setItem("cottageToGradeClient", cottage.id.toString());
  }

  gradeShip(ship: Ship) {
    this.shipToGradeClient = ship;
    this.changeNumber(44);
    sessionStorage.setItem("page", "44");
    sessionStorage.setItem("shipToGradeClient", ship.id.toString());
  }

  gradeInstructor(instructor: User) {
    this.instructorToGradeClient = instructor;
    this.changeNumber(45);
    sessionStorage.setItem("page", "45");
    sessionStorage.setItem("instructorToGradeClient", instructor.email);
  }

  goToAccountDeleteRequestClient(user: User) {
    this.clientToDeleteAccount = user;
    this.changeNumber(46);
    sessionStorage.setItem("page", "46");
    sessionStorage.setItem("clientToDeleteAccount", user.email);
  }

  seeUserOwner(user: User){
    this.userForOwner = user;
    this.changeNumber(52);
    sessionStorage.setItem("userForOwner", this.userForOwner.email.toString());
    sessionStorage.setItem("page", '52');
  }
  
}
