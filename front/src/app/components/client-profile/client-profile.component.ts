import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  @Input() clientAuthenticated: User;
  client: User;
  viewInformation: boolean = true;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    if(this.clientAuthenticated == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("clientToShowAuthenticated")).subscribe(ret =>{
        this.client = ret;
      })
    } else {
      this.userService.getUserByEmail(this.clientAuthenticated.email).subscribe(ret =>{
        this.client = ret;
      })
    }
  }
  
  editInformations() : void {
    this.viewInformation = false;
  }

  changeInformations() : void {
    this.viewInformation = true;
  }

}
