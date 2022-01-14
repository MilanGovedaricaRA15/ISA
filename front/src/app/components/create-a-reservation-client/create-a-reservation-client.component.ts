import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CottageDTO, getAverageCottageGrade } from 'src/app/dto/cottage-dto';
import { getAverageFavorGrade, InstructorsFavorDTO } from 'src/app/dto/instructors-favor-dto';
import { getAverageShipGrade, ShipDTO } from 'src/app/dto/ship-dto';
import { Services } from 'src/app/model/cottage';
import { CottageReservation } from 'src/app/model/cottage-reservation';
import { FavorReservation } from 'src/app/model/favor-reservation';
import { FavorServices } from 'src/app/model/instructors-favor';
import { ShipServices } from 'src/app/model/ship';
import { ShipReservation } from 'src/app/model/ship-reservation';
import { User } from 'src/app/model/user';
import { CottageReservationService } from 'src/app/service/cottage-reservation-service.service';
import { CottageService } from 'src/app/service/cottage-service.service';
import { FavorReservationService } from 'src/app/service/favor-reservation.service';
import { InstructorsFavorService } from 'src/app/service/instructors-favor.service';
import { ShipReservationService } from 'src/app/service/ship-reservation-service.service';
import { ShipService } from 'src/app/service/ship-service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-create-a-reservation-client',
  templateUrl: './create-a-reservation-client.component.html',
  styleUrls: ['./create-a-reservation-client.component.css']
})
export class CreateAReservationClientComponent implements OnInit {

  @Output() clientProfileAuthenticated = new EventEmitter<void>();

  user: User;

  cottageReservation: CottageReservation;
  shipReservation: ShipReservation;
  instructorsFavorReservation: FavorReservation;

  today: string;
  entity: string;
  startDate: Date;
  endDate: Date;
  numberOfGuests: number;
  cottageServices: Array<Services>;
  shipServices: Array<ShipServices>;
  instructorsFavorServices: Array<FavorServices>;

  cottages: Array<CottageDTO>;
  ships: Array<ShipDTO>;
  instructorsFavors: Array<InstructorsFavorDTO>;

  descendingCostCottage: boolean;
  descendingGradeCottage: boolean;
  descendingCostShip: boolean;
  descendingGradeShip: boolean;
  descendingCostFavor: boolean;
  descendingGradeFavor: boolean;

  constructor(private userService: UserService, private cottageReservationService: CottageReservationService,
    private shipReservationService: ShipReservationService, private favorReservationService: FavorReservationService,
     private cottageService: CottageService, private shipService: ShipService, private instructorsFavorService: InstructorsFavorService) { }

  ngOnInit(): void {
    this.initialize();

    this.descendingCostCottage = false;
    this.descendingGradeCottage = false;
    this.descendingCostShip = false;
    this.descendingGradeShip = false;
    this.descendingCostFavor = false;
    this.descendingGradeFavor = false;
  }
  
  availableReservations() : void {
    this.initialize();

    let start = document.getElementById('startDate') as HTMLInputElement
    let end = document.getElementById('endDate') as HTMLInputElement

    let yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);
    if (start.valueAsDate < yesterday) {
      alert('Start date should be later or equal to today!');
    }
    else if (end.valueAsDate < new Date()) {
      alert('End date should be later than today!');
    }
    else if (end.valueAsDate <= start.valueAsDate) {
      alert('End date should be later than the start date!');
    } else {
      let ent = document.getElementById('entity') as HTMLSelectElement
      this.entity = ent.value;
      let start = document.getElementById('startDate') as HTMLInputElement
      this.startDate = start.valueAsDate;
      let end = document.getElementById('endDate') as HTMLInputElement
      this.endDate = end.valueAsDate;
      let guests = document.getElementById('numOfGuests') as HTMLInputElement
      this.numberOfGuests = guests.valueAsNumber;

      if (this.entity === 'cottage') {
        this.cottageService.getAllAvailableCottages(this.startDate, this.endDate, this.numberOfGuests).subscribe(ret => {
          for (let cottage of ret){
            let cottageDTO = new CottageDTO(cottage, getAverageCottageGrade(cottage));
            this.cottages.push(cottageDTO);
          }
        });
      } else if (this.entity === 'ship') {
        this.shipService.getAllAvailableShips(this.startDate, this.endDate, this.numberOfGuests).subscribe(ret => {
          for (let ship of ret){
            let shipDTO = new ShipDTO(ship, getAverageShipGrade(ship));
            this.ships.push(shipDTO);
          }
        });
      } else if (this.entity === 'fishing') {
        this.instructorsFavorService.getAllAvailableFavors(this.startDate, this.endDate, this.numberOfGuests).subscribe(ret => {
          for (let favor of ret){
            let favorDTO = new InstructorsFavorDTO(favor, getAverageFavorGrade(favor));
            this.instructorsFavors.push(favorDTO);
          }
        });
      }
    }
    
  }

  bookTheCottage(id: number): void {
    this.cottageService.getCottageById(id).subscribe(ret => {
      this.cottageServices = Array<Services>();
      let totalCost = ret.costPerNight;
      for (let s of ret.priceList) {
        let service = document.getElementById(s.id.toString()) as HTMLInputElement;
        if (service.checked) {
          this.cottageServices.push(s.service);
          totalCost += s.cost;
        }
      }
      let days = (this.endDate.valueOf() - this.startDate.valueOf()) / 86400000;
      totalCost *= days;

      this.cottageReservation = new CottageReservation();
      this.cottageReservation.availableFrom = this.startDate;
      this.cottageReservation.availableTill = this.endDate;
      this.cottageReservation.cottage = ret;
      this.cottageReservation.client = this.user;
      this.cottageReservation.services = this.cottageServices;
      this.cottageReservation.cost = totalCost;
      this.cottageReservation.penalty = null;
      this.cottageReservation.report = null;

      this.cottageReservationService.addReservationByClient(this.cottageReservation).subscribe(ret => {
        if (ret) {
          alert('Reservation successfully created!');
          this.clientProfileAuthenticated.emit();
        } else {
          alert('Reservation could not be created!');
        }
      });

    });
  }

  bookTheShip(id: number): void {
    this.shipService.getShipById(id).subscribe(ret => {
      this.shipServices = Array<ShipServices>();
      let totalCost = ret.costPerNight;
      for (let s of ret.priceList) {
        let service = document.getElementById(s.id.toString()) as HTMLInputElement;
        if (service.checked) {
          this.shipServices.push(s.service);
          totalCost += s.cost;
        }
      }
      let days = (this.endDate.valueOf() - this.startDate.valueOf()) / 86400000;
      totalCost *= days;

      this.shipReservation = new ShipReservation();
      this.shipReservation.availableFrom = this.startDate;
      this.shipReservation.availableTill = this.endDate;
      this.shipReservation.ship = ret;
      this.shipReservation.client = this.user;
      this.shipReservation.services = this.shipServices;
      this.shipReservation.cost = totalCost;
      this.shipReservation.penalty = null;
      this.shipReservation.report = null;

      this.shipReservationService.addReservationByClient(this.shipReservation).subscribe(ret => {
        if (ret) {
          alert('Reservation successfully created!');
          this.clientProfileAuthenticated.emit();
        } else {
          alert('Reservation could not be created!');
        }
      });

    });
  }

  bookTheInstructorsFavor(id: number): void {
    this.instructorsFavorService.getFavorById(id).subscribe(ret => {
      this.instructorsFavorServices = Array<FavorServices>();
      let totalCost = ret.cost;
      for (let s of ret.priceList) {
        let service = document.getElementById(s.id.toString()) as HTMLInputElement;
        if (service.checked) {
          this.instructorsFavorServices.push(s.service);
          totalCost += s.cost;
        }
      }
      let days = (this.endDate.valueOf() - this.startDate.valueOf()) / 86400000;
      totalCost *= days;

      this.instructorsFavorReservation = new FavorReservation();
      this.instructorsFavorReservation.availableFrom = this.startDate;
      this.instructorsFavorReservation.availableTill = this.endDate;
      this.instructorsFavorReservation.favor = ret;
      this.instructorsFavorReservation.client = this.user;
      this.instructorsFavorReservation.services = this.instructorsFavorServices;
      this.instructorsFavorReservation.cost = totalCost;
      this.instructorsFavorReservation.penalty = null;
      this.instructorsFavorReservation.report = null;

      this.favorReservationService.addReservationByClient(this.instructorsFavorReservation).subscribe(ret => {
        if (ret) {
          alert('Reservation successfully created!');
          this.clientProfileAuthenticated.emit();
        } else {
          alert('Reservation could not be created!');
        }
      });

    });
  }

  private getTodayStringDate() {
    let today = new Date();
    let year = today.getFullYear().toString();
    let month = (today.getMonth() + 1);
    let day = today.getDate();
    let monthString = month.toString();
    if (month < 10) {
      monthString = '0' + month.toString();
    }
    let dayString = day.toString();
    if (day < 10) {
      dayString = '0' + day.toString();
    }
    let todayString = year + '-' + monthString + '-' + dayString;
    return todayString;
  }

  sortCottageByCost(){
    if(this.descendingCostCottage){
      this.cottages.sort((a,b) => (a.cottage.costPerNight < b.cottage.costPerNight) ? 1 : ((b.cottage.costPerNight < a.cottage.costPerNight) ? -1 : 0))
      this.descendingCostCottage = false;
    }
    else {
      this.cottages.sort((a,b) => (a.cottage.costPerNight > b.cottage.costPerNight) ? 1 : ((b.cottage.costPerNight > a.cottage.costPerNight) ? -1 : 0))
      this.descendingCostCottage = true;
    }
  }

  sortCottageByGrade(){
    if(this.descendingGradeCottage){
      this.cottages.sort((a,b) => (a.averageGrade < b.averageGrade) ? 1 : ((b.averageGrade < a.averageGrade) ? -1 : 0))
      this.descendingGradeCottage = false;
    }
    else {
      this.cottages.sort((a,b) => (a.averageGrade > b.averageGrade) ? 1 : ((b.averageGrade > a.averageGrade) ? -1 : 0))
      this.descendingGradeCottage = true;
    }
  }

  sortShipByCost(){
    if(this.descendingCostShip){
      this.ships.sort((a,b) => (a.ship.costPerNight < b.ship.costPerNight) ? 1 : ((b.ship.costPerNight < a.ship.costPerNight) ? -1 : 0))
      this.descendingCostShip = false;
    }
    else {
      this.ships.sort((a,b) => (a.ship.costPerNight > b.ship.costPerNight) ? 1 : ((b.ship.costPerNight > a.ship.costPerNight) ? -1 : 0))
      this.descendingCostShip = true;
    }
  }

  sortShipByGrade(){
    if(this.descendingGradeShip){
      this.ships.sort((a,b) => (a.averageGrade < b.averageGrade) ? 1 : ((b.averageGrade < a.averageGrade) ? -1 : 0))
      this.descendingGradeShip = false;
    }
    else {
      this.ships.sort((a,b) => (a.averageGrade > b.averageGrade) ? 1 : ((b.averageGrade > a.averageGrade) ? -1 : 0))
      this.descendingGradeShip = true;
    }
  }

  sortFavorByCost(){
    if(this.descendingCostFavor){
      this.instructorsFavors.sort((a,b) => (a.instructorsFavor.cost < b.instructorsFavor.cost) ? 1 : ((b.instructorsFavor.cost < a.instructorsFavor.cost) ? -1 : 0))
      this.descendingCostFavor = false;
    }
    else {
      this.instructorsFavors.sort((a,b) => (a.instructorsFavor.cost > b.instructorsFavor.cost) ? 1 : ((b.instructorsFavor.cost > a.instructorsFavor.cost) ? -1 : 0))
      this.descendingCostFavor = true;
    }
  }

  sortFavorByGrade(){
    if(this.descendingGradeFavor){
      this.instructorsFavors.sort((a,b) => (a.averageGrade < b.averageGrade) ? 1 : ((b.averageGrade < a.averageGrade) ? -1 : 0))
      this.descendingGradeFavor = false;
    }
    else {
      this.instructorsFavors.sort((a,b) => (a.averageGrade > b.averageGrade) ? 1 : ((b.averageGrade > a.averageGrade) ? -1 : 0))
      this.descendingGradeFavor = true;
    }
  }

  private initialize() {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
    });

    this.today = this.getTodayStringDate();

    this.cottages = new Array<CottageDTO>();
    this.ships = new Array<ShipDTO>();
    this.instructorsFavors = new Array<InstructorsFavorDTO>();

    this.cottageServices = Array<Services>();
    this.shipServices = Array<ShipServices>();
    this.instructorsFavorServices = Array<FavorServices>();
  }

}

