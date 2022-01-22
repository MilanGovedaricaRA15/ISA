import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CottageDTO, getAverageCottageGrade } from 'src/app/dto/cottage-dto';
import { Cottage } from 'src/app/model/cottage';
import { CottageService } from 'src/app/service/cottage-service.service';

@Component({
  selector: 'app-cottages-page',
  templateUrl: './cottages-page.component.html',
  styleUrls: ['./cottages-page.component.css']
})
export class CottagesPageComponent implements OnInit {

  cottages: Array<CottageDTO>;
  @Output() cottageToShowUnauthenticated = new EventEmitter<Cottage>();

  searchText: string;
  searchTextAddress: string;
  searchMinCost: number;
  searchMaxCost: number;

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
      for (let cottage of ret){
        let cottageDTO = new CottageDTO(cottage, getAverageCottageGrade(cottage), cottage.costPerNight);
        this.cottages.push(cottageDTO);
      }
    })
    this.descendingName = false;
    this.descendingAddress = false;
    this.descendingNumOfRooms = false;
    this.descendingNumOfBeds = false;
    this.descendingGrade = false;
    this.descendingCost = false;
  }

  goToCottageProfile(id: number): void {
    this.cottageService.getCottageById(id).subscribe(ret => {
      this.cottageToShowUnauthenticated.emit(ret);
    })
  }

  searchCottages(): void {
    let input = this.searchText;
    this.cottageService.searchCottagesByName(input).subscribe(ret => {
      this.cottages = new Array<CottageDTO>();
      for (let cottage of ret){
        let cottageDTO = new CottageDTO(cottage, getAverageCottageGrade(cottage), cottage.costPerNight);
        this.cottages.push(cottageDTO);
      }
    })
  }

  searchCottagesByAddress(): void {
    let inputAddress = this.searchTextAddress;
    this.cottageService.searchCottagesByAddress(inputAddress).subscribe(ret => {
      this.cottages = new Array<CottageDTO>();
      for (let cottage of ret){
        let cottageDTO = new CottageDTO(cottage, getAverageCottageGrade(cottage), cottage.costPerNight);
        this.cottages.push(cottageDTO);
      }
    })
  }

  searchCottagesByCost(): void {
    let inputMin = this.searchMinCost;
    let inputMax = this.searchMaxCost;
    this.cottageService.searchCottagesByCost(inputMin, inputMax).subscribe(ret => {
      this.cottages = new Array<CottageDTO>();
      for (let cottage of ret){
        let cottageDTO = new CottageDTO(cottage, getAverageCottageGrade(cottage), cottage.costPerNight);
        this.cottages.push(cottageDTO);
      }
    })
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

}
