import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ship } from 'src/app/model/ship';
import { ShipService } from 'src/app/service/ship-service';

@Component({
  selector: 'app-ships-page-client',
  templateUrl: './ships-page-client.component.html',
  styleUrls: ['./ships-page-client.component.css']
})
export class ShipsPageClientComponent implements OnInit {

  @Output() shipToShowClient = new EventEmitter<Ship>();
  ships: Array<Ship>;
  searchText: string;
  descendingName: boolean;
  descendingAddress: boolean;
  descendingType: boolean;
  descendingCapacity: boolean;
  descendingDescription: boolean;

  constructor(private shipService: ShipService) { }

  ngOnInit(): void {
    this.shipService.getAllShips().subscribe(ret => {
      this.ships = ret;
    })
    this.descendingName = false;
    this.descendingAddress = false;
    this.descendingType = false;
    this.descendingCapacity = false;
    this.descendingDescription = false;
  }

  goToShipProfile(id: number): void {
    this.shipService.getShipById(id).subscribe(ret => {
      this.shipToShowClient.emit(ret);
    })
  }

  searchShips(): void {
    let input = this.searchText;
    this.shipService.searchShipsByName(input).subscribe(ret => {
      this.ships = ret;
    })
  }

  sortByName(){
    if(this.descendingName){
      this.ships.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
      this.descendingName = false;
    }
    else {
      this.ships.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      this.descendingName = true;
    }
  }

  sortByAddress(){
    if(this.descendingAddress){
      this.ships.sort((a,b) => (a.address < b.address) ? 1 : ((b.address < a.address) ? -1 : 0))
      this.descendingAddress = false;
    }
    else {
      this.ships.sort((a,b) => (a.address > b.address) ? 1 : ((b.address > a.address) ? -1 : 0))
      this.descendingAddress = true;
    }
  }


  sortByType(){
    if(this.descendingType){
      this.ships.sort((a,b) => (a.type.toString() < b.type.toString()) ? 1 : ((b.type.toString() < a.type.toString()) ? -1 : 0))
      this.descendingType = false;
    }
    else {
      this.ships.sort((a,b) => (a.type.toString() > b.type.toString()) ? 1 : ((b.type.toString() > a.type.toString()) ? -1 : 0))
      this.descendingType = true;
    }
  }


  sortByCapacity(){
    if(this.descendingCapacity){
      this.ships.sort((a,b) => (a.capacity < b.capacity) ? 1 : ((b.capacity < a.capacity) ? -1 : 0))
      this.descendingCapacity = false;
    }
    else {
      this.ships.sort((a,b) => (a.capacity > b.capacity) ? 1 : ((b.capacity > a.capacity) ? -1 : 0))
      this.descendingCapacity = true;
    }
  }


  sortByDescription(){
    if(this.descendingDescription){
      this.ships.sort((a,b) => (a.description < b.description) ? 1 : ((b.description < a.description) ? -1 : 0))
      this.descendingDescription = false;
    }
    else {
      this.ships.sort((a,b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0))
      this.descendingDescription = true;
    }
  }

}
