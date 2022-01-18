import { Component, Input, OnInit, Type } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-client-profile-for-owner',
  templateUrl: './client-profile-for-owner.component.html',
  styleUrls: ['./client-profile-for-owner.component.css']
})
export class ClientProfileForOwnerComponent implements OnInit {
  @Input() seeUser: User;
  client: User;
  type: string;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    if(this.seeUser == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("userForOwner")).subscribe(ret =>{
        this.client = ret;
        if(this.client.type.toString() == 'Regular')
          this.type = '0%'
        else if(this.client.type.toString() == 'Silver')
          this.type = '10%'
        else
          this.type = '20%'
      })
    } else {
      this.userService.getUserByEmail(this.seeUser.email).subscribe(ret =>{
        this.client = ret;
        if(this.client.type.toString() == 'Regular')
          this.type = '0%'
        else if(this.client.type.toString() == 'Silver')
          this.type = '10%'
        else
          this.type = '20%'
      })
    }
  }

}
