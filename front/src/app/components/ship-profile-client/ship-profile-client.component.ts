import { Component, Input, OnInit } from '@angular/core';
import { Ship } from 'src/app/model/ship';
import { ShipHotOffer } from 'src/app/model/ship-hot-offer';
import { ShipReservation } from 'src/app/model/ship-reservation';
import { User } from 'src/app/model/user';
import { ShipHotOfferService } from 'src/app/service/ship-hot-offer-service.service';
import { ShipReservationService } from 'src/app/service/ship-reservation-service.service';
import { ShipService } from 'src/app/service/ship-service';
import { UserService } from 'src/app/service/user-service.service';

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
  shipHotOffers: Array<ShipHotOffer>;
  user: User;
  costs: Array<number>;

  constructor(private shipService : ShipService, private shipReservationService: ShipReservationService, 
    private shipHotOfferService: ShipHotOfferService, private userService: UserService) { }

  ngOnInit(): void {
    if(this.shipClient == undefined){
      this.shipService.getShipById(Number(sessionStorage.getItem("shipToShowClient"))).subscribe(ret =>{
        this.ship = ret;
        this.shipReservationService.getAllReservationsOfShip(this.ship).subscribe(ret => {
          this.shipReservations = new Array<ShipReservation>();
          for (let cr of ret) {
            this.shipReservations.push(cr);
          }
        });
        this.shipHotOfferService.getFutureShipHotOffersByShipId(this.ship.id).subscribe(ret => {
          this.shipHotOffers = ret;
          this.costs = new Array<number>();
          for (let ho of this.shipHotOffers) {
            let till = new Date(ho.availableTill);
            let from = new Date(ho.availableFrom);
            let numOfDays = (till.getTime() - from.getTime()) / 86400000;
            let servicesCost = 0;
            if (ho.services) {
              for (let s of ho.services) {
                for (let p of this.ship.priceList) {
                  if (s === p.service) {
                    servicesCost += p.cost;
                    break;
                  }
                }
              }
            }
            let totalCost = numOfDays * (this.ship.costPerNight + servicesCost);
            this.costs.push(totalCost);
          }
        });
      });
    } else {
      this.ship = this.shipClient;
      this.shipReservationService.getAllReservationsOfShip(this.ship).subscribe(ret => {
        this.shipReservations = new Array<ShipReservation>();
        for (let cr of ret) {
          this.shipReservations.push(cr);
        }
      });
      this.shipHotOfferService.getFutureShipHotOffersByShipId(this.ship.id).subscribe(ret => {
        this.shipHotOffers = ret;
        this.costs = new Array<number>();
          for (let ho of this.shipHotOffers) {
            let till = new Date(ho.availableTill);
            let from = new Date(ho.availableFrom);
            let numOfDays = (till.getTime() - from.getTime()) / 86400000;
            let servicesCost = 0;
            if (ho.services) {
              for (let s of ho.services) {
                for (let p of this.ship.priceList) {
                  if (s === p.service) {
                    servicesCost += p.cost;
                    break;
                  }
                }
              }
            }
            let totalCost = numOfDays * (this.ship.costPerNight + servicesCost);
            this.costs.push(totalCost);
          }
      });
    }
    if(this.ship.images != null){
      this.shipImg = this.ship.images[0];
    }
    this.shipService.getShipAverageGrade(this.ship.id).subscribe(ret =>{
      this.averageGrade = ret;
    });

    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
    });
  }

  makeFastReservation(id: number): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      let shipReservation = new ShipReservation();
      let i = 0;
      for (let ho of this.ship.hotOffers) {
        if (id === ho.id) {
          shipReservation.availableFrom = ho.availableFrom;
          shipReservation.availableTill = ho.availableTill;
          shipReservation.ship = this.ship;
          shipReservation.client = this.user;
          shipReservation.services = ho.services;
          shipReservation.cost = ho.cost;
          shipReservation.penalty = null;
          shipReservation.report = null;
          this.ship.hotOffers.splice(i, 1);
          break;
        }
        i += 1;
      }
      
      this.shipReservationService.addShipHotOfferReservationByClient(shipReservation).subscribe(ret => {
        if (ret) {
          this.shipService.deleteShipHotOffer(this.ship).subscribe(ret => {
            if (ret) {
              window.location.reload();
            }
          });
        }
      });
    });    
  }

}
