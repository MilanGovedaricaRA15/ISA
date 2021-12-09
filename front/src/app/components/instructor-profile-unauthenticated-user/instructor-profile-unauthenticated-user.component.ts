import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-instructor-profile-unauthenticated-user',
  templateUrl: './instructor-profile-unauthenticated-user.component.html',
  styleUrls: ['./instructor-profile-unauthenticated-user.component.css']
})
export class InstructorProfileUnauthenticatedUserComponent implements OnInit {

  @Input() instructorUnauthenticated: User;
  instructor: User;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    if(this.instructorUnauthenticated == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("instructorToShowUnauthenticated")).subscribe(ret =>{
        this.instructor = ret;
      })
    } else {
      this.instructor = this.instructorUnauthenticated;
    }
  }

}
