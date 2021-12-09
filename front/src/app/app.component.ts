import { Component } from '@angular/core';
import { Cottage } from './model/cottage';
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

  /**
   *
   */
  showCompNumber: number = 2;
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

  }
  addNewCottage(b:Boolean){
    this.changeNumber(6);
    sessionStorage.setItem("page",'6');
  }

  onCottageClick(cottage: Cottage){
    this.cottageToShow = cottage;
    this.changeNumber(5);
    sessionStorage.setItem("page",'5');
    sessionStorage.setItem("cottageToShow",this.cottageToShow.id.toString());
    
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
  }

  changeNumber(index: number) {
    this.showCompNumber = index;
    
  }

  updateHotOffers(fromCottageComponent: Cottage){
    this.cottageForHotOffers = fromCottageComponent;
  }
  
}
