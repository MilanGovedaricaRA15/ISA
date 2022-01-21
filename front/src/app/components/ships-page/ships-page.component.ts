import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getAverageShipGrade, ShipDTO } from 'src/app/dto/ship-dto';
import { Ship } from 'src/app/model/ship';
import { ShipService } from 'src/app/service/ship-service';

@Component({
  selector: 'app-ships-page',
  templateUrl: './ships-page.component.html',
  styleUrls: ['./ships-page.component.css']
})
export class ShipsPageComponent implements OnInit {

  @Output() shipToShowUnauthenticated = new EventEmitter<Ship>();
  ships: Array<ShipDTO>;
  searchText: string;

  constructor(private shipService: ShipService) { }

  ngOnInit(): void {
    this.shipService.getAllShips().subscribe(ret => {
      this.ships = new Array<ShipDTO>();
      for (let s of ret) {
        this.ships.push(new ShipDTO(s, getAverageShipGrade(s), s.costPerNight));
      }
    });
  }

  goToShipProfile(id: number): void {
    this.shipService.getShipById(id).subscribe(ret => {
      this.shipToShowUnauthenticated.emit(ret);
    });
  }

  searchShips(): void {
    let input = this.searchText;
    this.shipService.searchShipsByName(input).subscribe(ret => {
      this.ships = new Array<ShipDTO>();
      for (let s of ret) {
        this.ships.push(new ShipDTO(s, getAverageShipGrade(s), s.costPerNight));
      }
    });
  }

}
