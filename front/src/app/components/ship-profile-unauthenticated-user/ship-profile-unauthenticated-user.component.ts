import { Component, Input, OnInit } from '@angular/core';
import { Ship } from 'src/app/model/ship';
import { Grade } from 'src/app/model/grade';
import { ShipService } from 'src/app/service/ship-service';
import { Observable } from 'rxjs';
import { getAverageShipGrade, ShipDTO } from 'src/app/dto/ship-dto';

@Component({
  selector: 'app-ship-profile-unauthenticated-user',
  templateUrl: './ship-profile-unauthenticated-user.component.html',
  styleUrls: ['./ship-profile-unauthenticated-user.component.css']
})
export class ShipProfileUnauthenticatedUserComponent implements OnInit {
  
  ship: ShipDTO;
  shipImg: String;
  averageGrade: number;
  @Input() shipUnauthenticated: Ship;

  constructor(private shipService : ShipService) { }

  ngOnInit(): void {
    if(this.shipUnauthenticated == undefined){
      this.shipService.getShipById(Number(sessionStorage.getItem("shipToShowUnauthenticated"))).subscribe(ret =>{
        this.ship = new ShipDTO(ret, getAverageShipGrade(ret), ret.costPerNight);
        if(this.ship.ship.images != null){
          this.shipImg = this.ship.ship.images[0];
        }
      });
    } else {
      this.ship = new ShipDTO(this.shipUnauthenticated, getAverageShipGrade(this.shipUnauthenticated), this.shipUnauthenticated.costPerNight);
      if(this.ship.ship.images != null){
        this.shipImg = this.ship.ship.images[0];
      }
    }
  }

}
