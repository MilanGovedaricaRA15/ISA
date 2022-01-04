import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ship } from 'src/app/model/ship';
import { ShipService } from 'src/app/service/ship-service';

@Component({
  selector: 'app-ships-page',
  templateUrl: './ships-page.component.html',
  styleUrls: ['./ships-page.component.css']
})
export class ShipsPageComponent implements OnInit {

  @Output() shipToShowUnauthenticated = new EventEmitter<Ship>();
  ships: Array<Ship>;
  searchText: string;

  constructor(private shipService: ShipService) { }

  ngOnInit(): void {
    this.shipService.getAllShips().subscribe(ret => {
      this.ships = ret;
    })
  }

  goToShipProfile(id: number): void {
    this.shipService.getShipById(id).subscribe(ret => {
      this.shipToShowUnauthenticated.emit(ret);
    })
  }

  searchShips(): void {
    let input = this.searchText;
    this.shipService.searchShipsByName(input).subscribe(ret => {
      this.ships = ret;
    })
  }

}
