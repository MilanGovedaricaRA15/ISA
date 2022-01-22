import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getAverageShipGrade, ShipDTO } from 'src/app/dto/ship-dto';
import { Ship } from 'src/app/model/ship';
import { ShipService } from 'src/app/service/ship-service';

@Component({
  selector: 'app-ships-page-client',
  templateUrl: './ships-page-client.component.html',
  styleUrls: ['./ships-page-client.component.css']
})
export class ShipsPageClientComponent implements OnInit {

  @Output() shipToShowClient = new EventEmitter<Ship>();
  ships: Array<ShipDTO>;
  availableShips: Array<ShipDTO>;

  startDate: Date;
  endDate: Date;
  numberOfDays: number;
  today: string;
  canFilter: boolean;

  descendingName: boolean;
  descendingAddress: boolean;
  descendingType: boolean;
  descendingCapacity: boolean;
  descendingDescription: boolean;
  descendingCost: boolean;
  descendingGrade: boolean;

  constructor(private shipService: ShipService) { }

  ngOnInit(): void {
    this.shipService.getAllShips().subscribe(ret => {
      this.ships = new Array<ShipDTO>();
      this.availableShips = new Array<ShipDTO>();
      for (let s of ret) {
        let shipDTO = new ShipDTO(s, getAverageShipGrade(s), s.costPerNight);
        this.ships.push(shipDTO);
        this.availableShips.push(shipDTO);
      }
    });
    this.descendingName = false;
    this.descendingAddress = false;
    this.descendingType = false;
    this.descendingCapacity = false;
    this.descendingDescription = false;
    this.descendingCost = false;
    this.descendingGrade = false;

    this.today = this.getTodayStringDate();
    this.canFilter = false;
  }

  goToShipProfile(id: number): void {
    this.shipService.getShipById(id).subscribe(ret => {
      this.shipToShowClient.emit(ret);
    })
  }

  searchShips(): void {
    let start = document.getElementById('startDate') as HTMLInputElement
    this.startDate = start.valueAsDate;
    let end = document.getElementById('endDate') as HTMLInputElement
    this.endDate = end.valueAsDate;

    let yesterday = new Date();
    if (yesterday.getDate() != 1) {
      yesterday.setDate(new Date().getDate() - 1);
    }
    if (start.valueAsDate < yesterday) {
      alert('Start date should be later or equal to today!');
      this.canFilter = false;
    }
    else if (end.valueAsDate < new Date()) {
      alert('End date should be later than today!');
      this.canFilter = false;
    }
    else if (end.valueAsDate <= start.valueAsDate) {
      alert('End date should be later than the start date!');
      this.canFilter = false;
    } else {
      this.numberOfDays = (this.endDate.valueOf() - this.startDate.valueOf()) / 86400000;

      this.shipService.getAllAvailableShips(this.startDate, this.endDate, 0).subscribe(ret => {
        this.ships = new Array<ShipDTO>();
        this.availableShips = new Array<ShipDTO>();
        for (let ship of ret){
          let shipDTO = new ShipDTO(ship, getAverageShipGrade(ship), ship.costPerNight * this.numberOfDays);
          this.ships.push(shipDTO);
          this.availableShips.push(shipDTO);
        }
      });

      this.canFilter = true;

      let costFromEl = document.getElementById('filterCostFrom') as HTMLInputElement;
      costFromEl.valueAsNumber = 0;
      let costToEl = document.getElementById('filterCostTo') as HTMLInputElement;
      costToEl.valueAsNumber = 100;
      let gradeFromEl = document.getElementById('filterGradeFrom') as HTMLInputElement;
      gradeFromEl.valueAsNumber = 0;
      let gradeToEl = document.getElementById('filterGradeTo') as HTMLInputElement;
      gradeToEl.valueAsNumber = 10;
    }
  }

  filterByCostAndGrade(): void {
    let costFromEl = document.getElementById('filterCostFrom') as HTMLInputElement;
    let costFrom = costFromEl.valueAsNumber;
    let costToEl = document.getElementById('filterCostTo') as HTMLInputElement;
    let costTo = costToEl.valueAsNumber;
    let gradeFromEl = document.getElementById('filterGradeFrom') as HTMLInputElement;
    let gradeFrom = gradeFromEl.valueAsNumber;
    let gradeToEl = document.getElementById('filterGradeTo') as HTMLInputElement;
    let gradeTo = gradeToEl.valueAsNumber;
    
    let filteredShips = new Array<ShipDTO>();
    for (let s of this.availableShips) {
      if (costFrom <= s.ship.costPerNight && s.ship.costPerNight <= costTo
        && gradeFrom <= s.averageGrade && s.averageGrade <= gradeTo) {
        filteredShips.push(s);
      }
    }
    this.ships = filteredShips;
  }

  getAllShips(): void {
    this.shipService.getAllShips().subscribe(ret => {
      this.ships = new Array<ShipDTO>();
      this.availableShips = new Array<ShipDTO>();
      for (let s of ret) {
        let shipDTO = new ShipDTO(s, getAverageShipGrade(s), s.costPerNight);
        this.ships.push(shipDTO);
        this.availableShips.push(shipDTO);
      }
    });

    this.canFilter = false;
    let start = document.getElementById('startDate') as HTMLInputElement
    start.value = this.today;
    let end = document.getElementById('endDate') as HTMLInputElement
    end.value = this.today;
  }

  sortByName(){
    if(this.descendingName){
      this.ships.sort((a,b) => (a.ship.name < b.ship.name) ? 1 : ((b.ship.name < a.ship.name) ? -1 : 0))
      this.descendingName = false;
    }
    else {
      this.ships.sort((a,b) => (a.ship.name > b.ship.name) ? 1 : ((b.ship.name > a.ship.name) ? -1 : 0))
      this.descendingName = true;
    }
  }

  sortByAddress(){
    if(this.descendingAddress){
      this.ships.sort((a,b) => (a.ship.address < b.ship.address) ? 1 : ((b.ship.address < a.ship.address) ? -1 : 0))
      this.descendingAddress = false;
    }
    else {
      this.ships.sort((a,b) => (a.ship.address > b.ship.address) ? 1 : ((b.ship.address > a.ship.address) ? -1 : 0))
      this.descendingAddress = true;
    }
  }


  sortByType(){
    if(this.descendingType){
      this.ships.sort((a,b) => (a.ship.type.toString() < b.ship.type.toString()) ? 1 : ((b.ship.type.toString() < a.ship.type.toString()) ? -1 : 0))
      this.descendingType = false;
    }
    else {
      this.ships.sort((a,b) => (a.ship.type.toString() > b.ship.type.toString()) ? 1 : ((b.ship.type.toString() > a.ship.type.toString()) ? -1 : 0))
      this.descendingType = true;
    }
  }


  sortByCapacity(){
    if(this.descendingCapacity){
      this.ships.sort((a,b) => (a.ship.capacity < b.ship.capacity) ? 1 : ((b.ship.capacity < a.ship.capacity) ? -1 : 0))
      this.descendingCapacity = false;
    }
    else {
      this.ships.sort((a,b) => (a.ship.capacity > b.ship.capacity) ? 1 : ((b.ship.capacity > a.ship.capacity) ? -1 : 0))
      this.descendingCapacity = true;
    }
  }


  sortByDescription(){
    if(this.descendingDescription){
      this.ships.sort((a,b) => (a.ship.description < b.ship.description) ? 1 : ((b.ship.description < a.ship.description) ? -1 : 0))
      this.descendingDescription = false;
    }
    else {
      this.ships.sort((a,b) => (a.ship.description > b.ship.description) ? 1 : ((b.ship.description > a.ship.description) ? -1 : 0))
      this.descendingDescription = true;
    }
  }

  sortByCost(){
    if(this.descendingCost){
      this.ships.sort((a,b) => (a.ship.costPerNight < b.ship.costPerNight) ? 1 : ((b.ship.costPerNight < a.ship.costPerNight) ? -1 : 0))
      this.descendingCost = false;
    }
    else {
      this.ships.sort((a,b) => (a.ship.costPerNight > b.ship.costPerNight) ? 1 : ((b.ship.costPerNight > a.ship.costPerNight) ? -1 : 0))
      this.descendingCost = true;
    }
  }

  sortByGrade(){
    if(this.descendingGrade){
      this.ships.sort((a,b) => (a.averageGrade < b.averageGrade) ? 1 : ((b.averageGrade < a.averageGrade) ? -1 : 0))
      this.descendingGrade = false;
    }
    else {
      this.ships.sort((a,b) => (a.averageGrade > b.averageGrade) ? 1 : ((b.averageGrade > a.averageGrade) ? -1 : 0))
      this.descendingGrade = true;
    }
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

}
