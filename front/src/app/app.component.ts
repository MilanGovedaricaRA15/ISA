import { Component } from '@angular/core';
import { UserService } from './service/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IzdajMe';

  /**
   *
   */
  showCompNumber: number = 0;
  constructor(private userService: UserService) {

  }
  onRegister(message: string) {
     if(message === 'user_registered'){
       this.changeNumber(2);
     }
    }
  changeNumber(index: number) {
    // this.userService.findAll().subscribe(result => {

    // });
    this.showCompNumber = index;
  }

  
}
