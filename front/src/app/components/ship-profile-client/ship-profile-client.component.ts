import { Component, Input, OnInit } from '@angular/core';
import { Ship } from 'src/app/model/ship';
import { ShipReservation } from 'src/app/model/ship-reservation';
import { ShipReservationService } from 'src/app/service/ship-reservation-service.service';
import { ShipService } from 'src/app/service/ship-service';

@Component({
  selector: 'app-ship-profile-client',
  templateUrl: './ship-profile-client.component.html',
  styleUrls: ['./ship-profile-client.component.css']
})
export class ShipProfileClientComponent implements OnInit {

  ship: Ship;
  shipImg: String;
  averageGrade: number;
  @Input() shipClient: Ship;
  shipReservations: Array<ShipReservation>;

  constructor(private shipService : ShipService, private shipReservationService: ShipReservationService) { }

  ngOnInit(): void {
    if(this.shipClient == undefined){
      this.shipService.getShipById(Number(sessionStorage.getItem("shipToShowClient"))).subscribe(ret =>{
        this.ship = ret;
        this.shipReservationService.getAllReservationsOfShip(this.ship).subscribe(ret => {
          this.shipReservations = new Array<ShipReservation>();
          for (let cr of ret) {
            this.shipReservations.push(cr);
          }
        })
      })
    } else {
      this.ship = this.shipClient;
      this.shipReservationService.getAllReservationsOfShip(this.ship).subscribe(ret => {
        this.shipReservations = new Array<ShipReservation>();
        for (let cr of ret) {
          this.shipReservations.push(cr);
        }
      })
    }
    if(this.ship.images != null){
      this.shipImg = this.ship.images[0];
    }
    this.shipService.getShipAverageGrade(this.ship.id).subscribe(ret =>{
      this.averageGrade = ret;
    });
  }

}
