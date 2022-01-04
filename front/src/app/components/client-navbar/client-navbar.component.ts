import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './client-navbar.component.html',
  styleUrls: ['./client-navbar.component.css']
})
export class ClientNavbarComponent implements OnInit {

  @Output() clientProfile = new EventEmitter<void>();
  @Output() cottagesPageClient = new EventEmitter<void>();
  @Output() shipsPageClient = new EventEmitter<void>();
  @Output() instructorsPageClient = new EventEmitter<void>();
  @Output() cottagesReservationsPageClient = new EventEmitter<void>();
  @Output() shipsReservationsPageClient = new EventEmitter<void>();
  @Output() instructorsReservationsPageClient = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  goToClientProfile(): void {
    this.clientProfile.emit();
  }

  goToCottagesPageClient(): void {
    this.cottagesPageClient.emit();
  }

  goToShipsPageClient(): void {
    this.shipsPageClient.emit();
  }

  goToInstructorsPageClient(): void {
    this.instructorsPageClient.emit();
  }

  goToCottagesReservationsPageClient(): void {
    this.cottagesReservationsPageClient.emit();
  }

  goToShipsReservationsPageClient(): void {
    this.shipsReservationsPageClient.emit();
  }

  goToInstructorsReservationsPageClient(): void {
    this.instructorsReservationsPageClient.emit();
  }

}
