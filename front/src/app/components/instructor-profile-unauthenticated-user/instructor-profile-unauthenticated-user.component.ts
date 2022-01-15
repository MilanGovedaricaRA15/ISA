import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { InstructorsFavorService } from 'src/app/service/instructors-favor.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-instructor-profile-unauthenticated-user',
  templateUrl: './instructor-profile-unauthenticated-user.component.html',
  styleUrls: ['./instructor-profile-unauthenticated-user.component.css']
})
export class InstructorProfileUnauthenticatedUserComponent implements OnInit {

  @Input() instructorUnauthenticated: User;
  instructor: User;
  instructorsFavors: any;

  constructor(private userService : UserService, private favorService: InstructorsFavorService) { }

  ngOnInit(): void {
    if(this.instructorUnauthenticated == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("instructorToShowUnauthenticated")).subscribe(ret =>{
        this.instructor = ret;
        this.favorService.getAllFavorsByInstructorsEmail(this.instructor.email).subscribe(ret => {
          this.instructorsFavors = ret;
        })
      })
    } else {
      this.instructor = this.instructorUnauthenticated;
      this.favorService.getAllFavorsByInstructorsEmail(this.instructor.email).subscribe(ret => {
        this.instructorsFavors = ret;
      })
    }
  }

}
