import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-instructors-page',
  templateUrl: './instructors-page.component.html',
  styleUrls: ['./instructors-page.component.css']
})
export class InstructorsPageComponent implements OnInit {

  @Output() instructorToShowUnauthenticated = new EventEmitter<User>();
  instructors: Array<User>;
  searchTextFirstName: string;
  searchTextLastName: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllInstructors().subscribe(ret => {
      this.instructors = ret;
    })
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
      this.instructors = ret;
    })
  }

}
