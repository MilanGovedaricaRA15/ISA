import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CottageDTO, getAverageCottageGrade } from 'src/app/dto/cottage-dto';
import { Cottage } from 'src/app/model/cottage';
import { CottageService } from 'src/app/service/cottage-service.service';

@Component({
  selector: 'app-cottages-page-client',
  templateUrl: './cottages-page-client.component.html',
  styleUrls: ['./cottages-page-client.component.css']
})
export class CottagesPageClientComponent implements OnInit {

  cottages: Array<CottageDTO>;
  availableCottages: Array<CottageDTO>;
  @Output() cottageToShowClient = new EventEmitter<Cottage>();

  startDate: Date;
  endDate: Date;
  numberOfDays: number;
  today: string;
  canFilter: boolean;

  descendingName: boolean;
  descendingAddress: boolean;
  descendingGrade: boolean;
  descendingNumOfRooms: boolean;
  descendingNumOfBeds: boolean;
  descendingCost: boolean;

  constructor(private cottageService: CottageService) { }

  ngOnInit(): void {
    this.cottageService.getAllCottages().subscribe(ret => {
      this.cottages = new Array<CottageDTO>();
      this.availableCottages = new Array<CottageDTO>();
      for (let cottage of ret){
        let cottageDTO = new CottageDTO(cottage, getAverageCottageGrade(cottage), cottage.costPerNight);
        this.cottages.push(cottageDTO);
        this.availableCottages.push(cottageDTO);
      }
    });
    this.descendingName = false;
    this.descendingAddress = false;
    this.descendingNumOfRooms = false;
    this.descendingNumOfBeds = false;
    this.descendingGrade = false;
    this.descendingCost = false;

    this.today = this.getTodayStringDate();
    this.canFilter = false;
  }

  goToCottageProfile(id: number): void {
    this.cottageService.getCottageById(id).subscribe(ret => {
      this.cottageToShowClient.emit(ret);
    })
  }

  searchCottages(): void {
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

      this.cottageService.getAllAvailableCottages(this.startDate, this.endDate, 0).subscribe(ret => {
        this.cottages = new Array<CottageDTO>();
        this.availableCottages = new Array<CottageDTO>();
        for (let cottage of ret){
          let cottageDTO = new CottageDTO(cottage, getAverageCottageGrade(cottage), cottage.costPerNight * this.numberOfDays);
          this.cottages.push(cottageDTO);
          this.availableCottages.push(cottageDTO);
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
    
    let filteredCottages = new Array<CottageDTO>();
    for (let c of this.availableCottages) {
      if (costFrom <= c.cottage.costPerNight && c.cottage.costPerNight <= costTo
        && gradeFrom <= c.averageGrade && c.averageGrade <= gradeTo) {
        filteredCottages.push(c);
      }
    }
    this.cottages = filteredCottages;
  }

  getAllCottages(): void {
    this.cottageService.getAllCottages().subscribe(ret => {
      this.cottages = new Array<CottageDTO>();
      this.availableCottages = new Array<CottageDTO>();
      for (let c of ret) {
        let cottageDTO = new CottageDTO(c, getAverageCottageGrade(c), c.costPerNight);
        this.cottages.push(cottageDTO);
        this.availableCottages.push(cottageDTO);
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
      this.cottages.sort((a,b) => (a.cottage.name < b.cottage.name) ? 1 : ((b.cottage.name < a.cottage.name) ? -1 : 0))
      this.descendingName = false;
    }
    else {
      this.cottages.sort((a,b) => (a.cottage.name > b.cottage.name) ? 1 : ((b.cottage.name > a.cottage.name) ? -1 : 0))
      this.descendingName = true;
    }
  }

  sortByAddress(){
    if(this.descendingAddress){
      this.cottages.sort((a,b) => (a.cottage.address < b.cottage.address) ? 1 : ((b.cottage.address < a.cottage.address) ? -1 : 0))
      this.descendingAddress = false;
    }
    else {
      this.cottages.sort((a,b) => (a.cottage.address > b.cottage.address) ? 1 : ((b.cottage.address > a.cottage.address) ? -1 : 0))
      this.descendingAddress = true;
    }

  }

  sortByNumOfRooms(){
    if(this.descendingNumOfRooms){
      this.cottages.sort((a,b) => (a.cottage.numOfRooms < b.cottage.numOfRooms) ? 1 : ((b.cottage.numOfRooms < a.cottage.numOfRooms) ? -1 : 0))
      this.descendingNumOfRooms = false;
    }
    else {
      this.cottages.sort((a,b) => (a.cottage.numOfRooms > b.cottage.numOfRooms) ? 1 : ((b.cottage.numOfRooms > a.cottage.numOfRooms) ? -1 : 0))
      this.descendingNumOfRooms = true;
    }
  }

  sortByNumOfBeds(){
    if(this.descendingNumOfBeds){
      this.cottages.sort((a,b) => (a.cottage.numOfBeds < b.cottage.numOfBeds) ? 1 : ((b.cottage.numOfBeds < a.cottage.numOfBeds) ? -1 : 0))
      this.descendingNumOfBeds = false;
    }
    else {
      this.cottages.sort((a,b) => (a.cottage.numOfBeds > b.cottage.numOfBeds) ? 1 : ((b.cottage.numOfBeds > a.cottage.numOfBeds) ? -1 : 0))
      this.descendingNumOfBeds = true;
    }
  }

  sortByCost(){
    if(this.descendingCost){
      this.cottages.sort((a,b) => (a.cottage.costPerNight < b.cottage.costPerNight) ? 1 : ((b.cottage.costPerNight < a.cottage.costPerNight) ? -1 : 0))
      this.descendingCost = false;
    }
    else {
      this.cottages.sort((a,b) => (a.cottage.costPerNight > b.cottage.costPerNight) ? 1 : ((b.cottage.costPerNight > a.cottage.costPerNight) ? -1 : 0))
      this.descendingCost = true;
    }
  }

  sortByGrade(){
    if(this.descendingGrade){
      this.cottages.sort((a,b) => (a.averageGrade < b.averageGrade) ? 1 : ((b.averageGrade < a.averageGrade) ? -1 : 0))
      this.descendingGrade = false;
    }
    else {
      this.cottages.sort((a,b) => (a.averageGrade > b.averageGrade) ? 1 : ((b.averageGrade > a.averageGrade) ? -1 : 0))
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
