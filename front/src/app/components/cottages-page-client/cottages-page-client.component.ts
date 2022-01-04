import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cottage } from 'src/app/model/cottage';
import { CottageService } from 'src/app/service/cottage-service.service';

@Component({
  selector: 'app-cottages-page-client',
  templateUrl: './cottages-page-client.component.html',
  styleUrls: ['./cottages-page-client.component.css']
})
export class CottagesPageClientComponent implements OnInit {

  cottages: Array<Cottage>;
  @Output() cottageToShowClient = new EventEmitter<Cottage>();

  searchText: string;
  descendingName: boolean;
  descendingAddress: boolean;
  descendingGrade: boolean;
  descendingDescription: boolean;

  constructor(private cottageService: CottageService) { }

  ngOnInit(): void {
    this.cottageService.getAllCottages().subscribe(ret => {
      this.cottages = ret;
    })
    this.descendingName = false;
    this.descendingAddress = false;
    this.descendingDescription = false;
    this.descendingGrade = false;
  }

  goToCottageProfile(id: number): void {
    this.cottageService.getCottageById(id).subscribe(ret => {
      this.cottageToShowClient.emit(ret);
    })
  }

  searchCottages(): void {
    let input = this.searchText;
    this.cottageService.searchCottagesByName(input).subscribe(ret => {
      this.cottages = ret;
    })
  }

  sortByName(){
    if(this.descendingName){
      this.cottages.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
      this.descendingName = false;
    }
    else {
      this.cottages.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      this.descendingName = true;
    }
  }

  sortByAddress(){
    if(this.descendingAddress){
      this.cottages.sort((a,b) => (a.address < b.address) ? 1 : ((b.address < a.address) ? -1 : 0))
      this.descendingAddress = false;
    }
    else {
      this.cottages.sort((a,b) => (a.address > b.address) ? 1 : ((b.address > a.address) ? -1 : 0))
      this.descendingAddress = true;
    }

  }

  sortByDescription(){
    if(this.descendingDescription){
      this.cottages.sort((a,b) => (a.description < b.description) ? 1 : ((b.description < a.description) ? -1 : 0))
      this.descendingDescription = false;
    }
    else {
      this.cottages.sort((a,b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0))
      this.descendingDescription = true;
    }

  }

}
