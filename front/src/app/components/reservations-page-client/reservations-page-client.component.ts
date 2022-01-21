import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cottage } from 'src/app/model/cottage';
import { CottageReservation } from 'src/app/model/cottage-reservation';
import { FavorReservation } from 'src/app/model/favor-reservation';
import { Ship } from 'src/app/model/ship';
import { ShipReservation } from 'src/app/model/ship-reservation';
import { User } from 'src/app/model/user';
import { CottageReservationService } from 'src/app/service/cottage-reservation-service.service';
import { FavorReservationService } from 'src/app/service/favor-reservation.service';
import { ShipReservationService } from 'src/app/service/ship-reservation-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-reservations-page-client',
  templateUrl: './reservations-page-client.component.html',
  styleUrls: ['./reservations-page-client.component.css']
})
export class ReservationsPageClientComponent implements OnInit {
  @Output() gradeCottage = new EventEmitter<Cottage>();
  @Output() gradeShip = new EventEmitter<Ship>();
  @Output() gradeInstructor = new EventEmitter<User>();

  clientCottageReservations: Array<CottageReservation>;
  clientShipReservations: Array<ShipReservation>;
  clientFavorReservations: Array<FavorReservation>;

  pastCottageReservations: Array<CottageReservation>;
  pastShipReservations: Array<ShipReservation>;
  pastFavorReservations: Array<FavorReservation>;

  descendingCottageName: boolean;
  descendingCottageAvailableFrom: boolean;
  descendingCottageAvailableTill: boolean;
  descendingCottageCost: boolean;

  descendingShipName: boolean;
  descendingShipAvailableFrom: boolean;
  descendingShipAvailableTill: boolean;
  descendingShipCost: boolean;

  descendingFavorName: boolean;
  descendingFavorAvailableFrom: boolean;
  descendingFavorAvailableTill: boolean;
  descendingFavorCost: boolean;

  constructor(private userService: UserService, private cottageReservationService: CottageReservationService,
    private shipReservationService: ShipReservationService, private favorReservationService: FavorReservationService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.cottageReservationService.getCottageReservationsOfClient(ret.email).subscribe(ret => {
        this.clientCottageReservations = new Array<CottageReservation>();
        this.pastCottageReservations = new Array<CottageReservation>();
        for (let cr of ret) {
          if (new Date(cr.availableFrom).getTime() >= new Date().getTime()) {
            this.clientCottageReservations.push(cr);
          } else {
            this.pastCottageReservations.push(cr);
          }
        }
      });
      this.shipReservationService.getShipReservationsOfClient(ret.email).subscribe(ret => {
        this.clientShipReservations = new Array<ShipReservation>();
        this.pastShipReservations = new Array<ShipReservation>();
        for (let sr of ret) {
          if (new Date(sr.availableFrom).getTime() >= new Date().getTime()) {
            this.clientShipReservations.push(sr);
          } else {
            this.pastShipReservations.push(sr);
          }
        }
      });
      this.favorReservationService.getFavorReservationsOfClient(ret.email).subscribe(ret => {
        this.clientFavorReservations = new Array<FavorReservation>();
        this.pastFavorReservations = new Array<FavorReservation>();
        for (let fr of ret) {
          if (new Date(fr.availableFrom).getTime() >= new Date().getTime()) {
            this.clientFavorReservations.push(fr);
          } else {
            this.pastFavorReservations.push(fr);
          }
        }
      });
    });

    this.descendingCottageName = false;
    this.descendingCottageAvailableFrom = false;
    this.descendingCottageAvailableTill = false;
    this.descendingCottageCost = false;

    this.descendingShipName = false;
    this.descendingShipAvailableFrom = false;
    this.descendingShipAvailableTill = false;
    this.descendingShipCost = false;

    this.descendingFavorName = false;
    this.descendingFavorAvailableFrom = false;
    this.descendingFavorAvailableTill = false;
    this.descendingFavorCost = false;
  }

  gradeCottageOrOwner(cottage: Cottage): void {
    this.gradeCottage.emit(cottage);
  }

  gradeShipOrOwner(ship: Ship): void {
    this.gradeShip.emit(ship);
  }

  gradeOneInstructor(instructor: User): void {
    this.gradeInstructor.emit(instructor);
  }

  cancelCottageReservation(cottageReservation: CottageReservation) : void {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let from = new Date(cottageReservation.availableFrom);
    let daysBefore = (from.getTime() - today.getTime()) / 86400000;
    if (daysBefore >= 3) {
      this.cottageReservationService.cancelCottageReservationByClient(cottageReservation).subscribe(ret => {
        if (ret) {
          alert('Reservation canceled!');
          window.location.reload();
        } else {
          alert('Could not cancel the reservation!');
        }
      });
    } else {
      alert('Can not cancel the reservation that has passed or starts within 3 days!');
    }
  }

  cancelShipReservation(shipReservation: ShipReservation) : void {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let from = new Date(shipReservation.availableFrom);
    let daysBefore = (from.getTime() - today.getTime()) / 86400000;
    if (daysBefore >= 3) {
      this.shipReservationService.cancelShipReservationByClient(shipReservation).subscribe(ret => {
        if (ret) {
          alert('Reservation canceled!');
          window.location.reload();
        } else {
          alert('Could not cancel the reservation!');
        }
      });
    } else {
      alert('Can not cancel the reservation that has passed or starts within 3 days!');
    }
  }

  cancelFavorReservation(favorReservation: FavorReservation) : void {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let from = new Date(favorReservation.availableFrom);
    let daysBefore = (from.getTime() - today.getTime()) / 86400000;
    if (daysBefore >= 3) {
      this.favorReservationService.cancelFavorReservationByClient(favorReservation).subscribe(ret => {
        if (ret) {
          alert('Reservation canceled!');
          window.location.reload();
        } else {
          alert('Could not cancel the reservation!');
        }
      });
    } else {
      alert('Can not cancel the reservation that has passed or starts within 3 days!');
    }
  }

  sortByCottageName(){
    if(this.descendingCottageName){
      this.pastCottageReservations.sort((a,b) => (a.cottage.name < b.cottage.name) ? 1 : ((b.cottage.name < a.cottage.name) ? -1 : 0))
      this.descendingCottageName = false;
    }
    else {
      this.pastCottageReservations.sort((a,b) => (a.cottage.name > b.cottage.name) ? 1 : ((b.cottage.name > a.cottage.name) ? -1 : 0))
      this.descendingCottageName = true;
    }
  }

  sortByCottageAvailableFrom(){
    if(this.descendingCottageAvailableFrom){
      this.pastCottageReservations.sort((a,b) => (a.availableFrom < b.availableFrom) ? 1 : ((b.availableFrom < a.availableFrom) ? -1 : 0))
      this.descendingCottageAvailableFrom = false;
    }
    else {
      this.pastCottageReservations.sort((a,b) => (a.availableFrom > b.availableFrom) ? 1 : ((b.availableFrom > a.availableFrom) ? -1 : 0))
      this.descendingCottageAvailableFrom = true;
    }

  }

  sortByCottageAvailableTill(){
    if(this.descendingCottageAvailableTill){
      this.pastCottageReservations.sort((a,b) => (a.availableTill < b.availableTill) ? 1 : ((b.availableTill < a.availableTill) ? -1 : 0))
      this.descendingCottageAvailableTill = false;
    }
    else {
      this.pastCottageReservations.sort((a,b) => (a.availableTill > b.availableTill) ? 1 : ((b.availableTill > a.availableTill) ? -1 : 0))
      this.descendingCottageAvailableTill = true;
    }
  }

  sortByCottageCost(){
    if(this.descendingCottageCost){
      this.pastCottageReservations.sort((a,b) => (a.cost < b.cost) ? 1 : ((b.cost < a.cost) ? -1 : 0))
      this.descendingCottageCost = false;
    }
    else {
      this.pastCottageReservations.sort((a,b) => (a.cost > b.cost) ? 1 : ((b.cost > a.cost) ? -1 : 0))
      this.descendingCottageCost = true;
    }
  }

  sortByShipName(){
    if(this.descendingShipName){
      this.pastShipReservations.sort((a,b) => (a.ship.name < b.ship.name) ? 1 : ((b.ship.name < a.ship.name) ? -1 : 0))
      this.descendingShipName = false;
    }
    else {
      this.pastShipReservations.sort((a,b) => (a.ship.name > b.ship.name) ? 1 : ((b.ship.name > a.ship.name) ? -1 : 0))
      this.descendingShipName = true;
    }
  }

  sortByShipAvailableFrom(){
    if(this.descendingShipAvailableFrom){
      this.pastShipReservations.sort((a,b) => (a.availableFrom < b.availableFrom) ? 1 : ((b.availableFrom < a.availableFrom) ? -1 : 0))
      this.descendingShipAvailableFrom = false;
    }
    else {
      this.pastShipReservations.sort((a,b) => (a.availableFrom > b.availableFrom) ? 1 : ((b.availableFrom > a.availableFrom) ? -1 : 0))
      this.descendingShipAvailableFrom = true;
    }

  }

  sortByShipAvailableTill(){
    if(this.descendingShipAvailableTill){
      this.pastShipReservations.sort((a,b) => (a.availableTill < b.availableTill) ? 1 : ((b.availableTill < a.availableTill) ? -1 : 0))
      this.descendingShipAvailableTill = false;
    }
    else {
      this.pastShipReservations.sort((a,b) => (a.availableTill > b.availableTill) ? 1 : ((b.availableTill > a.availableTill) ? -1 : 0))
      this.descendingShipAvailableTill = true;
    }
  }

  sortByShipCost(){
    if(this.descendingShipCost){
      this.pastShipReservations.sort((a,b) => (a.cost < b.cost) ? 1 : ((b.cost < a.cost) ? -1 : 0))
      this.descendingShipCost = false;
    }
    else {
      this.pastShipReservations.sort((a,b) => (a.cost > b.cost) ? 1 : ((b.cost > a.cost) ? -1 : 0))
      this.descendingShipCost = true;
    }
  }

  sortByFavorName(){
    if(this.descendingFavorName){
      this.pastFavorReservations.sort((a,b) => (a.favor.name < b.favor.name) ? 1 : ((b.favor.name < a.favor.name) ? -1 : 0))
      this.descendingFavorName = false;
    }
    else {
      this.pastFavorReservations.sort((a,b) => (a.favor.name > b.favor.name) ? 1 : ((b.favor.name > a.favor.name) ? -1 : 0))
      this.descendingFavorName = true;
    }
  }

  sortByFavorAvailableFrom(){
    if(this.descendingFavorAvailableFrom){
      this.pastFavorReservations.sort((a,b) => (a.availableFrom < b.availableFrom) ? 1 : ((b.availableFrom < a.availableFrom) ? -1 : 0))
      this.descendingFavorAvailableFrom = false;
    }
    else {
      this.pastFavorReservations.sort((a,b) => (a.availableFrom > b.availableFrom) ? 1 : ((b.availableFrom > a.availableFrom) ? -1 : 0))
      this.descendingFavorAvailableFrom = true;
    }

  }

  sortByFavorAvailableTill(){
    if(this.descendingFavorAvailableTill){
      this.pastFavorReservations.sort((a,b) => (a.availableTill < b.availableTill) ? 1 : ((b.availableTill < a.availableTill) ? -1 : 0))
      this.descendingFavorAvailableTill = false;
    }
    else {
      this.pastFavorReservations.sort((a,b) => (a.availableTill > b.availableTill) ? 1 : ((b.availableTill > a.availableTill) ? -1 : 0))
      this.descendingFavorAvailableTill = true;
    }
  }

  sortByFavorCost(){
    if(this.descendingFavorCost){
      this.pastFavorReservations.sort((a,b) => (a.cost < b.cost) ? 1 : ((b.cost < a.cost) ? -1 : 0))
      this.descendingFavorCost = false;
    }
    else {
      this.pastFavorReservations.sort((a,b) => (a.cost > b.cost) ? 1 : ((b.cost > a.cost) ? -1 : 0))
      this.descendingFavorCost = true;
    }
  }

}
