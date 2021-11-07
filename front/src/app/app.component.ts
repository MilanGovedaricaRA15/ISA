import { Component } from '@angular/core';
import { Cottage } from './model/cottage';
import { UserService } from './service/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IzdajMe';
  cottageForHotOffers: Cottage;

  /**
   *
   */
  showCompNumber: number = 2;
  constructor(private userService: UserService) {

  }

  public ngOnInit() {
    this.userService.isCottageAdvertiserLoggedIn().subscribe(res =>{
      if(res){this.changeNumber(3);}
    });
    this.userService.isBoatAdvertiserLoggedIn().subscribe(res => {
      if(res){
        this.changeNumber(4);
      }
    });

  }
  onRegister(message: string) {
     if(message === 'user_registered'){
       this.changeNumber(2);
     }
    }
  onLogin(message: string){
    if(message === 'cottageAdvertiser'){
      this.changeNumber(3);
    }
    else if(message === 'boatAdvertiser'){
      this.changeNumber(4);
    }

  }
  changeNumber(index: number) {
    this.showCompNumber = index;
  }

  updateHotOffers(fromCottageComponent: Cottage){
    this.cottageForHotOffers = fromCottageComponent;
  }
  
}
