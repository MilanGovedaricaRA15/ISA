import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Output() cottagesPage = new EventEmitter<void>();
  @Output() shipsPage = new EventEmitter<void>();
  @Output() instructorsPage = new EventEmitter<void>();
  @Output() loginPage = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
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
