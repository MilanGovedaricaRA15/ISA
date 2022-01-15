import { Component, Input, OnInit } from '@angular/core';
import { FavorHotOffer } from 'src/app/model/favor-hot-offer';
import { FavorReservation } from 'src/app/model/favor-reservation';
import { InstructorsFavor } from 'src/app/model/instructors-favor';
import { User } from 'src/app/model/user';
import { FavorHotOfferService } from 'src/app/service/favor-hot-offer.service';
import { FavorReservationService } from 'src/app/service/favor-reservation.service';
import { InstructorsFavorService } from 'src/app/service/instructors-favor.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-instructor-profile-client',
  templateUrl: './instructor-profile-client.component.html',
  styleUrls: ['./instructor-profile-client.component.css']
})
export class InstructorProfileClientComponent implements OnInit {

  @Input() instructorClient: User;
  instructor: User;
  instructorsFavors: Array<InstructorsFavor>;
  favorReservations: Array<FavorReservation>;
  favorHotOffers: Array<FavorHotOffer>;
  user: User;
  changedFavor: InstructorsFavor;
  costs: Array<number>;

  constructor(private userService : UserService, private favorService: InstructorsFavorService, 
    private favorReservationService: FavorReservationService, private favorHotOfferService: FavorHotOfferService) { }

  ngOnInit(): void {
    if(this.instructorClient == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("instructorToShowClient")).subscribe(ret =>{
        this.instructor = ret;
        this.favorService.getAllFavorsByInstructorsEmail(this.instructor.email).subscribe(ret => {
          this.instructorsFavors = ret;
          this.favorHotOffers = new Array<FavorHotOffer>();
          for (let f of ret) {
            this.favorHotOfferService.getFutureFavorHotOffersByFavorId(f.id).subscribe(ret => {
              for (let fho of ret) {
                this.favorHotOffers.push(fho);
              }
              this.costs = new Array<number>();
              for (let ho of this.favorHotOffers) {
                let till = new Date(ho.availableTill);
                let from = new Date(ho.availableFrom);
                let numOfDays = (till.getTime() - from.getTime()) / 86400000;
                let servicesCost = 0;
                if (ho.services) {
                  for (let s of ho.services) {
                    for (let p of this.instructorsFavors) {
                      for (let pl of p.priceList) {
                        if (s === pl.service) {
                          servicesCost += p.cost;
                          break;
                        }
                      }
                    }
                  }
                }
                let favor = new InstructorsFavor();
                favor.cost = ho.cost;
                for (let f of this.instructorsFavors) {
                  for (let iho of f.hotOffers) {
                    if (iho.id === ho.id) {
                      favor = f;
                      break;
                    }
                  }
                }
                let totalCost = numOfDays * (favor.cost + servicesCost);
                this.costs.push(totalCost);
              }
            });
          }
        });
        this.favorReservationService.getAllReservationsOfInstructorFavors(this.instructor.email).subscribe(ret => {
          this.favorReservations = new Array<FavorReservation>();
          for (let fr of ret) {
            this.favorReservations.push(fr);
          }
        });
      });
    } else {
      this.instructor = this.instructorClient;
      this.favorService.getAllFavorsByInstructorsEmail(this.instructor.email).subscribe(ret => {
        this.instructorsFavors = ret;
        this.favorHotOffers = new Array<FavorHotOffer>();
          for (let f of ret) {
            this.favorHotOfferService.getFutureFavorHotOffersByFavorId(f.id).subscribe(ret => {
              for (let fho of ret) {
                this.favorHotOffers.push(fho);
              }
              this.costs = new Array<number>();
              for (let ho of this.favorHotOffers) {
                let till = new Date(ho.availableTill);
                let from = new Date(ho.availableFrom);
                let numOfDays = (till.getTime() - from.getTime()) / 86400000;
                let servicesCost = 0;
                if (ho.services) {
                  for (let s of ho.services) {
                    for (let p of this.instructorsFavors) {
                      for (let pl of p.priceList) {
                        if (s === pl.service) {
                          servicesCost += p.cost;
                          break;
                        }
                      }
                    }
                  }
                }
                let favor = new InstructorsFavor();
                favor.cost = ho.cost;
                for (let f of this.instructorsFavors) {
                  for (let iho of f.hotOffers) {
                    if (iho.id === ho.id) {
                      favor = f;
                      break;
                    }
                  }
                }
                let totalCost = numOfDays * (favor.cost + servicesCost);
                this.costs.push(totalCost);
              }
            });
          }
      });
      this.favorReservationService.getAllReservationsOfInstructorFavors(this.instructor.email).subscribe(ret => {
        this.favorReservations = new Array<FavorReservation>();
        for (let fr of ret) {
          this.favorReservations.push(fr);
        }
      });
    }

    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
    });
  }

  makeFastReservation(id: number): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      let favorReservation = new FavorReservation();
      for (let f of this.instructorsFavors) {
        let i = 0;
        for (let ho of f.hotOffers) {
          if (id === ho.id) {
            favorReservation.availableFrom = ho.availableFrom;
            favorReservation.availableTill = ho.availableTill;
            favorReservation.client = this.user;
            favorReservation.services = ho.services;
            favorReservation.cost = ho.cost;
            favorReservation.penalty = null;
            favorReservation.report = null;
            f.hotOffers.splice(i, 1);
            favorReservation.favor = f;
            break;
          }
          i += 1;
        }
      }
      
      this.favorReservationService.addFavorHotOfferReservationByClient(favorReservation).subscribe(ret => {
        if (ret) {
          this.favorService.deleteFavorHotOffer(favorReservation.favor).subscribe(ret => {
            if (ret) {
              window.location.reload();
            }
          });
        }
      });
    });
  }

}
