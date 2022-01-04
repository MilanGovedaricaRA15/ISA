import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-instructors-page-client',
  templateUrl: './instructors-page-client.component.html',
  styleUrls: ['./instructors-page-client.component.css']
})
export class InstructorsPageClientComponent implements OnInit {

  @Output() instructorToShowClient = new EventEmitter<User>();
  instructors: Array<User>;
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
      this.instructors = ret;
    })
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
      this.instructors = ret;
    })
  }

  sortByFirstName(){
    if(this.descendingFirstName){
      this.instructors.sort((a,b) => (a.firstName < b.firstName) ? 1 : ((b.firstName < a.firstName) ? -1 : 0))
      this.descendingFirstName = false;
    }
    else {
      this.instructors.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))
      this.descendingFirstName = true;
    }

  }

  sortByLastName(){
    if(this.descendingLastName){
      this.instructors.sort((a,b) => (a.lastName < b.lastName) ? 1 : ((b.lastName < a.lastName) ? -1 : 0))
      this.descendingLastName = false;
    }
    else {
      this.instructors.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0))
      this.descendingLastName = true;
    }
  }

  sortByAddress(){
    if(this.descendingAddress){
      this.instructors.sort((a,b) => (a.address < b.address) ? 1 : ((b.address < a.address) ? -1 : 0))
      this.descendingAddress = false;
    }
    else {
      this.instructors.sort((a,b) => (a.address > b.address) ? 1 : ((b.address > a.address) ? -1 : 0))
      this.descendingAddress = true;
    }
  }

  sortByEmail(){
    if(this.descendingEmail){
      this.instructors.sort((a,b) => (a.email < b.email) ? 1 : ((b.email < a.email) ? -1 : 0))
      this.descendingEmail = false;
    }
    else {
      this.instructors.sort((a,b) => (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0))
      this.descendingEmail = true;
    }

  }
sortByMobile(){
    if(this.descendingMobile){
      this.instructors.sort((a,b) => (a.mobileNumber < b.mobileNumber) ? 1 : ((b.mobileNumber < a.mobileNumber) ? -1 : 0))
      this.descendingMobile = false;
    }
    else {
      this.instructors.sort((a,b) => (a.mobileNumber > b.mobileNumber) ? 1 : ((b.mobileNumber > a.mobileNumber) ? -1 : 0))
      this.descendingMobile = true;
    }
  }

  sortByCountry(){
    if(this.descendingCountry){
      this.instructors.sort((a,b) => (a.country < b.country) ? 1 : ((b.country < a.country) ? -1 : 0))
      this.descendingCountry = false;
    }
    else {
      this.instructors.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0))
      this.descendingCountry = true;
    }
  }

}
