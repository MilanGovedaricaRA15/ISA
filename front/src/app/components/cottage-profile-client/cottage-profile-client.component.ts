import { Component, Input, OnInit } from '@angular/core';
import { CottageDTO, getAverageCottageGrade } from 'src/app/dto/cottage-dto';
import { Cottage } from 'src/app/model/cottage';
import { CottageReservation } from 'src/app/model/cottage-reservation';
import { HotOffer } from 'src/app/model/hot-offer';
import { User } from 'src/app/model/user';
import { CottageReservationService } from 'src/app/service/cottage-reservation-service.service';
import { CottageService } from 'src/app/service/cottage-service.service';
import { HotOfferService } from 'src/app/service/hot-offer-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-cottage-profile-client',
  templateUrl: './cottage-profile-client.component.html',
  styleUrls: ['./cottage-profile-client.component.css']
})
export class CottageProfileClientComponent implements OnInit {

  @Input() cottageClient: Cottage;
  cottage: CottageDTO;
  cottageImg: String;
  cottageReservations: Array<CottageReservation>;
  cottageHotOffers: Array<HotOffer>;
  costs: Array<number>;
  user: User;
  isSubscribed: boolean;
  
  constructor(private cottageService: CottageService, private cottageReservationService: CottageReservationService, 
    private hotOfferService: HotOfferService, private userService: UserService) { }

  ngOnInit(): void {
    if(this.cottageClient == undefined){
      this.cottageService.getCottageById(Number(sessionStorage.getItem("cottageToShowClient"))).subscribe(ret =>{
        this.cottage = new CottageDTO(ret, getAverageCottageGrade(ret), ret.costPerNight);

        if(this.cottage.cottage.images != null){
          this.cottageImg = this.cottage.cottage.images[0];
        }

        this.userService.getLoggedUser().subscribe(ret => {
          this.user = ret;
          this.cottageService.isUserSubscribedToCottage(this.user.email, this.cottage.cottage.id).subscribe(ret => {
            this.isSubscribed = ret;
          });
        });

        this.cottageReservationService.getAllReservationsOfCottage(this.cottage.cottage).subscribe(ret => {
          this.cottageReservations = new Array<CottageReservation>();
          for (let cr of ret) {
            this.cottageReservations.push(cr);
          }
        });
        this.hotOfferService.getFutureHotOffersByCottageId(this.cottage.cottage.id).subscribe(ret => {
          this.cottageHotOffers = ret;
          this.costs = new Array<number>();
          for (let ho of this.cottageHotOffers) {
            let till = new Date(ho.availableTill);
            let from = new Date(ho.availableFrom);
            let numOfDays = (till.getTime() - from.getTime()) / 86400000;
            let servicesCost = 0;
            if (ho.services) {
              for (let s of ho.services) {
                for (let p of this.cottage.cottage.priceList) {
                  if (s === p.service) {
                    servicesCost += p.cost;
                    break;
                  }
                }
              }
            }
            let totalCost = numOfDays * (this.cottage.cottage.costPerNight + servicesCost);
            this.costs.push(totalCost);
          }
        });
      });
    } else {
      this.cottage = new CottageDTO(this.cottageClient, getAverageCottageGrade(this.cottageClient), this.cottageClient.costPerNight);

      if(this.cottage.cottage.images != null){
        this.cottageImg = this.cottage.cottage.images[0];
      }

      this.userService.getLoggedUser().subscribe(ret => {
        this.user = ret;
        this.cottageService.isUserSubscribedToCottage(this.user.email, this.cottage.cottage.id).subscribe(ret => {
          this.isSubscribed = ret;
        });
      });

      this.cottageReservationService.getAllReservationsOfCottage(this.cottage.cottage).subscribe(ret => {
        this.cottageReservations = new Array<CottageReservation>();
        for (let cr of ret) {
          this.cottageReservations.push(cr);
        }
      });
      this.hotOfferService.getFutureHotOffersByCottageId(this.cottage.cottage.id).subscribe(ret => {
        this.cottageHotOffers = ret;
        this.costs = new Array<number>();
          for (let ho of this.cottageHotOffers) {
            let till = new Date(ho.availableTill);
            let from = new Date(ho.availableFrom);
            let numOfDays = (till.getTime() - from.getTime()) / 86400000;
            let servicesCost = 0;
            if (ho.services) {
              for (let s of ho.services) {
                for (let p of this.cottage.cottage.priceList) {
                  if (s === p.service) {
                    servicesCost += p.cost;
                    break;
                  }
                }
              }
            }
            let totalCost = numOfDays * (this.cottage.cottage.costPerNight + servicesCost);
            this.costs.push(totalCost);
          }
      });
    }
  }

  subscribeToCottage(): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      this.cottageService.isUserSubscribedToCottage(this.user.email, this.cottage.cottage.id).subscribe(ret => {
        if (ret) {
          alert("You are already subscribed on cottage '" + this.cottage.cottage.name + "'!");
          this.isSubscribed = true;
        } else {
          this.cottage.cottage.subscribedUsers.push(this.user);
          this.cottageService.addSubscribedUserToCottage(this.cottage.cottage).subscribe(ret => {
            if(ret) {
              alert("You have successfully subscribed on cottage '" + this.cottage.cottage.name + "'!");
              this.isSubscribed = true;
            } else {
              alert("Can't subscribe to cottage!");
            }
          });
        }
      });
    });
  }

  cancelSubscriptionOfCottage(): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      this.cottageService.isUserSubscribedToCottage(this.user.email, this.cottage.cottage.id).subscribe(ret => {
        if (ret) {
          if (this.cottage.cottage.subscribedUsers != null) {
            let i = 0;
            for (let su of this.cottage.cottage.subscribedUsers) {
              if (su.email === this.user.email) {
                this.cottage.cottage.subscribedUsers.splice(i, 1);
                break;
              }
              i += 1;
            }
          }
          this.cottageService.removeSubscribedUserFromCottage(this.cottage.cottage).subscribe(ret => {
            if(ret) {
              alert("You have successfully canceled your subscription on cottage '" + this.cottage.cottage.name + "'!");
              this.isSubscribed = false;
            } else {
              alert("Can't cancel subscription to cottage!");
            }
          });
        } else {
          alert("You were not subscribed on cottage '" + this.cottage.cottage.name + "', so you stay unsubscribed!");
          this.isSubscribed = false;
        }
      });
    });
  }

  makeFastReservation(id: number): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      let cottageReservation = new CottageReservation();
      let i = 0;
      for (let ho of this.cottage.cottage.hotOffers) {
        if (id === ho.id) {
          cottageReservation.availableFrom = ho.availableFrom;
          cottageReservation.availableTill = ho.availableTill;
          cottageReservation.cottage = this.cottage.cottage;
          cottageReservation.client = this.user;
          cottageReservation.services = ho.services;
          cottageReservation.cost = ho.cost;
          cottageReservation.penalty = null;
          cottageReservation.report = null;
          this.cottage.cottage.hotOffers.splice(i, 1);
          break;
        }
        i += 1;
      }
      
      this.cottageReservationService.addHotOfferReservationByClient(cottageReservation).subscribe(ret => {
        if (ret) {
          this.cottageService.deleteHotOffer(this.cottage.cottage).subscribe(ret => {
            if (ret) {
              window.location.reload();
            }
          });
        }
      });
    });    
  }

}
