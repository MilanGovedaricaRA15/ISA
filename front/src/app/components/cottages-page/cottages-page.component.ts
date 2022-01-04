import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cottage } from 'src/app/model/cottage';
import { CottageService } from 'src/app/service/cottage-service.service';

@Component({
  selector: 'app-cottages-page',
  templateUrl: './cottages-page.component.html',
  styleUrls: ['./cottages-page.component.css']
})
export class CottagesPageComponent implements OnInit {

  cottages: Array<Cottage>;
  @Output() cottageToShowUnauthenticated = new EventEmitter<Cottage>();

  searchText: string;

  constructor(private cottageService: CottageService) { }

  ngOnInit(): void {
    this.cottageService.getAllCottages().subscribe(ret => {
      this.cottages = ret;
    })
  }

  goToCottageProfile(id: number): void {
    this.cottageService.getCottageById(id).subscribe(ret => {
      this.cottageToShowUnauthenticated.emit(ret);
    })
  }

  searchCottages(): void {
    let input = this.searchText;
    this.cottageService.searchCottagesByName(input).subscribe(ret => {
      this.cottages = ret;
    })
  }

}
