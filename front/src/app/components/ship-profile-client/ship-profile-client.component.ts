import { Component, Input, OnInit } from '@angular/core';
import { Ship } from 'src/app/model/ship';
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

  constructor(private shipService : ShipService) { }

  ngOnInit(): void {
    if(this.shipClient == undefined){
      this.shipService.getShipById(Number(sessionStorage.getItem("shipToShowClient"))).subscribe(ret =>{
        this.ship = ret;
      })
    } else {
      this.ship = this.shipClient;
    }
    if(this.ship.images != null){
      this.shipImg = this.ship.images[0];
    }
    this.shipService.getShipAverageGrade(this.ship.id).subscribe(ret =>{
      this.averageGrade = ret;
    });
  }

}
