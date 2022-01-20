import { Component, Input, OnInit } from '@angular/core';
import { getAverageShipGrade, ShipDTO } from 'src/app/dto/ship-dto';
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

  ship: ShipDTO;
  shipImg: String;
  @Input() shipClient: Ship;
  shipReservations: Array<ShipReservation>;
  shipHotOffers: Array<ShipHotOffer>;
  user: User;
  costs: Array<number>;

  isSubscribed: boolean;

  constructor(private shipService : ShipService, private shipReservationService: ShipReservationService, 
    private shipHotOfferService: ShipHotOfferService, private userService: UserService) { }

  ngOnInit(): void {
    if(this.shipClient == undefined){
      this.shipService.getShipById(Number(sessionStorage.getItem("shipToShowClient"))).subscribe(ret =>{
        this.ship = new ShipDTO(ret, getAverageShipGrade(ret), ret.costPerNight);

        this.userService.getLoggedUser().subscribe(ret => {
          this.user = ret;
          this.shipService.isUserSubscribedToShip(this.user.email, this.ship.ship.id).subscribe(ret => {
            this.isSubscribed = ret;
          });
        });

        this.shipReservationService.getAllReservationsOfShip(this.ship.ship).subscribe(ret => {
          this.shipReservations = new Array<ShipReservation>();
          for (let cr of ret) {
            this.shipReservations.push(cr);
          }
        });
        this.shipHotOfferService.getFutureShipHotOffersByShipId(this.ship.ship.id).subscribe(ret => {
          this.shipHotOffers = ret;
          this.costs = new Array<number>();
          for (let ho of this.shipHotOffers) {
            let till = new Date(ho.availableTill);
            let from = new Date(ho.availableFrom);
            let numOfDays = (till.getTime() - from.getTime()) / 86400000;
            let servicesCost = 0;
            if (ho.services) {
              for (let s of ho.services) {
                for (let p of this.ship.ship.priceList) {
                  if (s === p.service) {
                    servicesCost += p.cost;
                    break;
                  }
                }
              }
            }
            let totalCost = numOfDays * (this.ship.ship.costPerNight + servicesCost);
            this.costs.push(totalCost);
          }
        });
      });
    } else {
      this.ship = new ShipDTO(this.shipClient, getAverageShipGrade(this.shipClient), this.shipClient.costPerNight);

      this.userService.getLoggedUser().subscribe(ret => {
        this.user = ret;
        this.shipService.isUserSubscribedToShip(this.user.email, this.ship.ship.id).subscribe(ret => {
          this.isSubscribed = ret;
        });
      });

      this.shipReservationService.getAllReservationsOfShip(this.ship.ship).subscribe(ret => {
        this.shipReservations = new Array<ShipReservation>();
        for (let cr of ret) {
          this.shipReservations.push(cr);
        }
      });
      this.shipHotOfferService.getFutureShipHotOffersByShipId(this.ship.ship.id).subscribe(ret => {
        this.shipHotOffers = ret;
        this.costs = new Array<number>();
          for (let ho of this.shipHotOffers) {
            let till = new Date(ho.availableTill);
            let from = new Date(ho.availableFrom);
            let numOfDays = (till.getTime() - from.getTime()) / 86400000;
            let servicesCost = 0;
            if (ho.services) {
              for (let s of ho.services) {
                for (let p of this.ship.ship.priceList) {
                  if (s === p.service) {
                    servicesCost += p.cost;
                    break;
                  }
                }
              }
            }
            let totalCost = numOfDays * (this.ship.ship.costPerNight + servicesCost);
            this.costs.push(totalCost);
          }
      });
    }
    if(this.ship.ship.images != null){
      this.shipImg = this.ship.ship.images[0];
    }
  }

  subscribeToShip(): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      this.shipService.isUserSubscribedToShip(this.user.email, this.ship.ship.id).subscribe(ret => {
        if (ret) {
          alert("You are already subscribed on ship '" + this.ship.ship.name + "'!");
          this.isSubscribed = true;
        } else {
          this.ship.ship.subscribedUsers.push(this.user);
          this.shipService.addSubscribedUserToShip(this.ship.ship).subscribe(ret => {
            if(ret) {
              alert("You have successfully subscribed on ship '" + this.ship.ship.name + "'!");
              this.isSubscribed = true;
            } else {
              alert("Can't subscribe to ship!");
            }
          });
        }
      });
    });
  }

  cancelSubscriptionOfShip(): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      this.shipService.isUserSubscribedToShip(this.user.email, this.ship.ship.id).subscribe(ret => {
        if (ret) {
          if (this.ship.ship.subscribedUsers != null) {
            let i = 0;
            for (let su of this.ship.ship.subscribedUsers) {
              if (su.email === this.user.email) {
                this.ship.ship.subscribedUsers.splice(i, 1);
                break;
              }
              i += 1;
            }
          }
          this.shipService.removeSubscribedUserFromShip(this.ship.ship).subscribe(ret => {
            if(ret) {
              alert("You have successfully canceled your subscription on ship '" + this.ship.ship.name + "'!");
              this.isSubscribed = false;
            } else {
              alert("Can't cancel subscription to ship!");
            }
          });
        } else {
          alert("You were not subscribed on ship '" + this.ship.ship.name + "', so you stay unsubscribed!");
          this.isSubscribed = false;
        }
      });
    });
  }

  makeFastReservation(id: number): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      let shipReservation = new ShipReservation();
      let i = 0;
      for (let ho of this.ship.ship.hotOffers) {
        if (id === ho.id) {
          shipReservation.availableFrom = ho.availableFrom;
          shipReservation.availableTill = ho.availableTill;
          shipReservation.ship = this.ship.ship;
          shipReservation.client = this.user;
          shipReservation.services = ho.services;
          shipReservation.cost = ho.cost;
          shipReservation.penalty = null;
          shipReservation.report = null;
          this.ship.ship.hotOffers.splice(i, 1);
          break;
        }
        i += 1;
      }
      
      this.shipReservationService.addShipHotOfferReservationByClient(shipReservation).subscribe(ret => {
        if (ret) {
          this.shipService.deleteShipHotOffer(this.ship.ship).subscribe(ret => {
            if (ret) {
              window.location.reload();
            }
          });
        }
      });
    });    
  }

}
