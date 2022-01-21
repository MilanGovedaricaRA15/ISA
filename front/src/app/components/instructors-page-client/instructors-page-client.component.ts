import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getAverageInstructorGrade, InstructorDTO } from 'src/app/dto/instructor-dto';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-instructors-page-client',
  templateUrl: './instructors-page-client.component.html',
  styleUrls: ['./instructors-page-client.component.css']
})
export class InstructorsPageClientComponent implements OnInit {

  @Output() instructorToShowClient = new EventEmitter<User>();
  instructorsDTO: Array<InstructorDTO>;
  searchTextFirstName: string;
  searchTextLastName: string;
  descendingFirstName: boolean;
  descendingLastName: boolean;
  descendingCountry: boolean;
  descendingMobile: boolean;
  descendingEmail: boolean;
  descendingAddress: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllInstructors().subscribe(ret => {
      this.instructorsDTO = new Array<InstructorDTO>();
      for (let i of ret) {
        this.instructorsDTO.push(new InstructorDTO(i, getAverageInstructorGrade(i)));
      }
    });
    this.descendingFirstName = false;
    this.descendingLastName = false;
    this.descendingCountry = false;
    this.descendingMobile = false;
    this.descendingEmail = false;
    this.descendingAddress = false;
  }

  goToInstructorProfile(email: string): void {
    this.userService.getInstructorByEmail(email).subscribe(ret => {
      this.instructorToShowClient.emit(ret);
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

  sortByFirstName(){
    if(this.descendingFirstName){
      this.instructorsDTO.sort((a,b) => (a.instructor.firstName < b.instructor.firstName) ? 1 : ((b.instructor.firstName < a.instructor.firstName) ? -1 : 0))
      this.descendingFirstName = false;
    }
    else {
      this.instructorsDTO.sort((a,b) => (a.instructor.firstName > b.instructor.firstName) ? 1 : ((b.instructor.firstName > a.instructor.firstName) ? -1 : 0))
      this.descendingFirstName = true;
    }

  }

  sortByLastName(){
    if(this.descendingLastName){
      this.instructorsDTO.sort((a,b) => (a.instructor.lastName < b.instructor.lastName) ? 1 : ((b.instructor.lastName < a.instructor.lastName) ? -1 : 0))
      this.descendingLastName = false;
    }
    else {
      this.instructorsDTO.sort((a,b) => (a.instructor.lastName > b.instructor.lastName) ? 1 : ((b.instructor.lastName > a.instructor.lastName) ? -1 : 0))
      this.descendingLastName = true;
    }
  }

  sortByAddress(){
    if(this.descendingAddress){
      this.instructorsDTO.sort((a,b) => (a.instructor.address < b.instructor.address) ? 1 : ((b.instructor.address < a.instructor.address) ? -1 : 0))
      this.descendingAddress = false;
    }
    else {
      this.instructorsDTO.sort((a,b) => (a.instructor.address > b.instructor.address) ? 1 : ((b.instructor.address > a.instructor.address) ? -1 : 0))
      this.descendingAddress = true;
    }
  }

  sortByEmail(){
    if(this.descendingEmail){
      this.instructorsDTO.sort((a,b) => (a.instructor.email < b.instructor.email) ? 1 : ((b.instructor.email < a.instructor.email) ? -1 : 0))
      this.descendingEmail = false;
    }
    else {
      this.instructorsDTO.sort((a,b) => (a.instructor.email > b.instructor.email) ? 1 : ((b.instructor.email > a.instructor.email) ? -1 : 0))
      this.descendingEmail = true;
    }

  }
sortByMobile(){
    if(this.descendingMobile){
      this.instructorsDTO.sort((a,b) => (a.instructor.mobileNumber < b.instructor.mobileNumber) ? 1 : ((b.instructor.mobileNumber < a.instructor.mobileNumber) ? -1 : 0))
      this.descendingMobile = false;
    }
    else {
      this.instructorsDTO.sort((a,b) => (a.instructor.mobileNumber > b.instructor.mobileNumber) ? 1 : ((b.instructor.mobileNumber > a.instructor.mobileNumber) ? -1 : 0))
      this.descendingMobile = true;
    }
  }

  sortByCountry(){
    if(this.descendingCountry){
      this.instructorsDTO.sort((a,b) => (a.instructor.country < b.instructor.country) ? 1 : ((b.instructor.country < a.instructor.country) ? -1 : 0))
      this.descendingCountry = false;
    }
    else {
      this.instructorsDTO.sort((a,b) => (a.instructor.country > b.instructor.country) ? 1 : ((b.instructor.country > a.instructor.country) ? -1 : 0))
      this.descendingCountry = true;
    }
  }

  sortByGrade(){
    if(this.descendingCountry){
      this.instructorsDTO.sort((a,b) => (a.averageGrade < b.averageGrade) ? 1 : ((b.averageGrade < a.averageGrade) ? -1 : 0))
      this.descendingCountry = false;
    }
    else {
      this.instructorsDTO.sort((a,b) => (a.averageGrade > b.averageGrade) ? 1 : ((b.averageGrade > a.averageGrade) ? -1 : 0))
      this.descendingCountry = true;
    }
  }

}
