import { Component, Input, OnInit } from '@angular/core';
import { getAverageInstructorGrade, InstructorDTO } from 'src/app/dto/instructor-dto';
import { getAverageFavorGrade, InstructorsFavorDTO } from 'src/app/dto/instructors-favor-dto';
import { getAverageShipGrade } from 'src/app/dto/ship-dto';
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
  instructorDTO: InstructorDTO;
  instructorsFavors: Array<InstructorsFavorDTO>;

  constructor(private userService : UserService, private favorService: InstructorsFavorService) { }

  ngOnInit(): void {
    if(this.instructorUnauthenticated == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("instructorToShowUnauthenticated")).subscribe(ret =>{
        this.instructorDTO = new InstructorDTO(ret, getAverageInstructorGrade(ret));
        this.favorService.getAllFavorsByInstructorsEmail(this.instructorDTO.instructor.email).subscribe(ret => {
          this.instructorsFavors = new Array<InstructorsFavorDTO>();
          for (let f of ret) {
            this.instructorsFavors.push(new InstructorsFavorDTO(f, getAverageFavorGrade(f), f.cost));
          }
        });
      });
    } else {
      this.instructorDTO = new InstructorDTO(this.instructorUnauthenticated, getAverageInstructorGrade(this.instructorUnauthenticated));
      this.favorService.getAllFavorsByInstructorsEmail(this.instructorDTO.instructor.email).subscribe(ret => {
        this.instructorsFavors = new Array<InstructorsFavorDTO>();
        for (let f of ret) {
          this.instructorsFavors.push(new InstructorsFavorDTO(f, getAverageFavorGrade(f), f.cost));
        }
      });
    }
  }
}

