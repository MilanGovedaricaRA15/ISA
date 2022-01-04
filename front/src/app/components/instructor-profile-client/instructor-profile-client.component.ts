import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-instructor-profile-client',
  templateUrl: './instructor-profile-client.component.html',
  styleUrls: ['./instructor-profile-client.component.css']
})
export class InstructorProfileClientComponent implements OnInit {

  @Input() instructorClient: User;
  instructor: User;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    if(this.instructorClient == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("instructorToShowClient")).subscribe(ret =>{
        this.instructor = ret;
      })
    } else {
      this.instructor = this.instructorClient;
    }
  }

}
