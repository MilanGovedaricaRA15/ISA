import { Component } from '@angular/core';
import { Cottage } from './model/cottage';
import { Ship } from './model/ship';
import { User } from './model/user';
import { UserService } from './service/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IzdajMe';
  cottageForHotOffers: Cottage;
  cottageToShow: Cottage;
  cottageToShowUnauthenticated: Cottage;
  shipToShowUnauthenticated: Ship;
  instructorToShowUnauthenticated: User;

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
    }
    else if (message === 'client') {
      this.changeNumber(31);
      sessionStorage.setItem("page", '31');
    }

  }
  addNewCottage(b:Boolean){
    this.changeNumber(6);
    sessionStorage.setItem("page",'6');
  }

  onCottageClick(cottage: Cottage){
    this.cottageToShow = cottage;
    this.changeNumber(5);
    sessionStorage.setItem("page", '5');
    sessionStorage.setItem("cottageToShow", this.cottageToShow.id.toString());
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
  }

  changeNumber(index: number) {
    this.showCompNumber = index;
  }

  updateHotOffers(fromCottageComponent: Cottage){
    this.cottageForHotOffers = fromCottageComponent;
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
  
}
