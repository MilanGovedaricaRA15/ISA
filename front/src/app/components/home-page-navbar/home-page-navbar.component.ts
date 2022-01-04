import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-page-navbar',
  templateUrl: './home-page-navbar.component.html',
  styleUrls: ['./home-page-navbar.component.css']
})
export class HomePageNavbarComponent implements OnInit {

  @Output() homePage = new EventEmitter<void>();
  @Output() cottagesPage = new EventEmitter<void>();
  @Output() shipsPage = new EventEmitter<void>();
  @Output() instructorsPage = new EventEmitter<void>();
  @Output() loginPage = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  goToHomePage(): void {
    this.homePage.emit();
  }

  goToCottagesPage(): void {
    this.cottagesPage.emit();
  }

  goToShipsPage(): void {
    this.shipsPage.emit();
  }

  goToInstructorsPage(): void {
    this.instructorsPage.emit();
  }

  goToLoginPage(): void {
    this.loginPage.emit();
  }

}
