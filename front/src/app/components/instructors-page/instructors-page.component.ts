import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getAverageInstructorGrade, InstructorDTO } from 'src/app/dto/instructor-dto';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-instructors-page',
  templateUrl: './instructors-page.component.html',
  styleUrls: ['./instructors-page.component.css']
})
export class InstructorsPageComponent implements OnInit {

  @Output() instructorToShowUnauthenticated = new EventEmitter<User>();
  instructorsDTO: Array<InstructorDTO>;
  searchTextFirstName: string;
  searchTextLastName: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllInstructors().subscribe(ret => {
      this.instructorsDTO = new Array<InstructorDTO>();
      for (let i of ret) {
        this.instructorsDTO.push(new InstructorDTO(i, getAverageInstructorGrade(i)));
      }
    });
  }

  goToInstructorProfile(email: string): void {
    this.userService.getInstructorByEmail(email).subscribe(ret => {
      this.instructorToShowUnauthenticated.emit(ret);
    })
  }

  searchInstructors(): void {
    let firstName = this.searchTextFirstName;
    let lastName = this.searchTextLastName;
    this.userService.searchInstructorssByName(firstName, lastName).subscribe(ret => {
      this.instructorsDTO = new Array<InstructorDTO>();
      for (let i of ret) {
        this.instructorsDTO.push(new InstructorDTO(i, getAverageInstructorGrade(i)));
      }
    })
  }

}
