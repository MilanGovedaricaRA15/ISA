import { Component, Input, OnInit } from '@angular/core';
import { Ship } from 'src/app/model/ship';
import { ShipService } from 'src/app/service/ship-service';

@Component({
  selector: 'app-ship-profile-unauthenticated-user',
  templateUrl: './ship-profile-unauthenticated-user.component.html',
  styleUrls: ['./ship-profile-unauthenticated-user.component.css']
})
export class ShipProfileUnauthenticatedUserComponent implements OnInit {
  
  ship: Ship;
  shipImg: String;
  @Input() shipUnauthenticated: Ship;

  constructor(private shipService : ShipService) { }

  ngOnInit(): void {
    if(this.shipUnauthenticated == undefined){
      this.shipService.getShipById(Number(sessionStorage.getItem("shipToShowUnauthenticated"))).subscribe(ret =>{
        this.ship = ret;
      })
    } else {
      this.ship = this.shipUnauthenticated;
    }
    if(this.ship.images != null){
      this.shipImg = this.ship.images[0];
    }
  }

}
