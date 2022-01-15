import { Component, Input, OnInit } from '@angular/core';
import { FavorReservation } from 'src/app/model/favor-reservation';
import { InstructorsFavor } from 'src/app/model/instructors-favor';
import { User } from 'src/app/model/user';
import { FavorReservationService } from 'src/app/service/favor-reservation.service';
import { InstructorsFavorService } from 'src/app/service/instructors-favor.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-instructor-profile-client',
  templateUrl: './instructor-profile-client.component.html',
  styleUrls: ['./instructor-profile-client.component.css']
})
export class InstructorProfileClientComponent implements OnInit {

  @Input() instructorClient: User;
  instructor: User;
  instructorsFavors: Array<InstructorsFavor>;
  favorReservations: Array<FavorReservation>;

  constructor(private userService : UserService, private favorService: InstructorsFavorService, private favorReservationService: FavorReservationService) { }

  ngOnInit(): void {
    if(this.instructorClient == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("instructorToShowClient")).subscribe(ret =>{
        this.instructor = ret;
        this.favorService.getAllFavorsByInstructorsEmail(this.instructor.email).subscribe(ret => {
          this.instructorsFavors = ret;
        })
        this.favorReservationService.getAllReservationsOfInstructorFavors(this.instructor.email).subscribe(ret => {
          this.favorReservations = new Array<FavorReservation>();
          for (let fr of ret) {
            this.favorReservations.push(fr);
          }
        })
      })
    } else {
      this.instructor = this.instructorClient;
      this.favorService.getAllFavorsByInstructorsEmail(this.instructor.email).subscribe(ret => {
        this.instructorsFavors = ret;
      })
      this.favorReservationService.getAllReservationsOfInstructorFavors(this.instructor.email).subscribe(ret => {
        this.favorReservations = new Array<FavorReservation>();
        for (let fr of ret) {
          this.favorReservations.push(fr);
        }
      })
    }
  }

}
