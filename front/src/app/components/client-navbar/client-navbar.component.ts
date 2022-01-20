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
  @Output() faultsPageClient = new EventEmitter<void>();
  @Output() subscribedEntitiesPageClient = new EventEmitter<void>();
  @Output() complaintsPageClient = new EventEmitter<void>();
  @Output() reservationsPageClient = new EventEmitter<void>();
  @Output() createReservationPageClient = new EventEmitter<void>();

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

  goToFaultsPageClient(): void {
    this.faultsPageClient.emit();
  }

  goToSubscribedEntitiesPageClient(): void {
    this.subscribedEntitiesPageClient.emit();
  }

  goToComplaintsPageClient(): void {
    this.complaintsPageClient.emit();
  }

  goToReservationsPageClient(): void {
    this.reservationsPageClient.emit();
  }

  goToCreateReservationPageClient(): void {
    this.createReservationPageClient.emit();
  }

}
