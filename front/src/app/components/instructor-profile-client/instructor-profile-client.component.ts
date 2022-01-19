import { Component, Input, OnInit } from '@angular/core';
import { FavorHotOfferDTO } from 'src/app/dto/favor-hot-offer-dto';
import { getAverageFavorGrade, InstructorsFavorDTO } from 'src/app/dto/instructors-favor-dto';
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
  availableInstructorsFavors: Array<InstructorsFavor>;
  favorHotOffersDTO: Array<FavorHotOfferDTO>;
  favorReservations: Array<FavorReservation>;
  user: User;
  changedFavor: InstructorsFavor;

  startDate: Date;
  endDate: Date;
  numberOfDays: number;
  today: string;
  canFilter: boolean;

  constructor(private userService : UserService, private favorService: InstructorsFavorService, 
    private favorReservationService: FavorReservationService, private favorHotOfferService: FavorHotOfferService) { }

  ngOnInit(): void {
    if(this.instructorClient == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("instructorToShowClient")).subscribe(ret =>{
        this.instructor = ret;
        this.favorService.getAllFavorsByInstructorsEmail(this.instructor.email).subscribe(ret => {
          this.instructorsFavors = ret;
          this.availableInstructorsFavors = ret;
          this.favorHotOffersDTO = new Array<FavorHotOfferDTO>();
          for (let f of this.instructorsFavors) {
            this.favorHotOfferService.getFutureFavorHotOffersByFavorId(f.id).subscribe(ret => {
              for (let ho of ret) {
                let till = new Date(ho.availableTill);
                let from = new Date(ho.availableFrom);
                let numOfDays = (till.getTime() - from.getTime()) / 86400000;
                let favorDTO = new FavorHotOfferDTO(f, ho, f.cost * numOfDays);
                this.favorHotOffersDTO.push(favorDTO);
              }
            })
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
        this.availableInstructorsFavors = ret;
        this.favorHotOffersDTO = new Array<FavorHotOfferDTO>();
          for (let f of this.instructorsFavors) {
            this.favorHotOfferService.getFutureFavorHotOffersByFavorId(f.id).subscribe(ret => {
              for (let ho of ret) {
                let till = new Date(ho.availableTill);
                let from = new Date(ho.availableFrom);
                let numOfDays = (till.getTime() - from.getTime()) / 86400000;
                let favorDTO = new FavorHotOfferDTO(f, ho, f.cost * numOfDays)
                this.favorHotOffersDTO.push(favorDTO);
              }
            })
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

    this.today = this.getTodayStringDate();
    this.canFilter = false;
  }

  searchFavors(): void {
    let start = document.getElementById('startDate') as HTMLInputElement
    this.startDate = start.valueAsDate;
    let end = document.getElementById('endDate') as HTMLInputElement
    this.endDate = end.valueAsDate;

    let yesterday = new Date();
    if (yesterday.getDate() != 1) {
      yesterday.setDate(new Date().getDate() - 1);
    }
    if (start.valueAsDate < yesterday) {
      alert('Start date should be later or equal to today!');
      this.canFilter = false;
    }
    else if (end.valueAsDate < new Date()) {
      alert('End date should be later than today!');
      this.canFilter = false;
    }
    else if (end.valueAsDate <= start.valueAsDate) {
      alert('End date should be later than the start date!');
      this.canFilter = false;
    } else {
      this.numberOfDays = (this.endDate.valueOf() - this.startDate.valueOf()) / 86400000;

      this.favorService.getAllAvailableFavors(this.startDate, this.endDate, 0).subscribe(ret => {
        this.instructorsFavors = new Array<InstructorsFavor>();
        this.availableInstructorsFavors = new Array<InstructorsFavor>();
        for (let f of ret){
          if (f.instructor.id === this.instructor.id) {
            this.instructorsFavors.push(f);
            this.availableInstructorsFavors.push(f);
          }
        }
      });

      this.canFilter = true;

      let costFromEl = document.getElementById('filterCostFrom') as HTMLInputElement;
      costFromEl.valueAsNumber = 0;
      let costToEl = document.getElementById('filterCostTo') as HTMLInputElement;
      costToEl.valueAsNumber = 10000;
    }
  }

  filterByCost(): void {
    let costFromEl = document.getElementById('filterCostFrom') as HTMLInputElement;
    let costFrom = costFromEl.valueAsNumber;
    let costToEl = document.getElementById('filterCostTo') as HTMLInputElement;
    let costTo = costToEl.valueAsNumber;
    
    let filteredCottages = new Array<InstructorsFavor>();
    for (let c of this.availableInstructorsFavors) {
      if (costFrom <= c.cost && c.cost <= costTo) {
        filteredCottages.push(c);
      }
    }
    this.instructorsFavors = filteredCottages;
  }

  getAllFavors(): void {
    this.favorService.getAllFavorsByInstructorsEmail(this.instructor.email).subscribe(ret => {
      this.instructorsFavors = new Array<InstructorsFavor>();
      this.availableInstructorsFavors = new Array<InstructorsFavor>();
      for (let c of ret) {
        this.instructorsFavors.push(c);
        this.availableInstructorsFavors.push(c);
      }
    });

    this.canFilter = false;
    let start = document.getElementById('startDate') as HTMLInputElement
    start.value = this.today;
    let end = document.getElementById('endDate') as HTMLInputElement
    end.value = this.today;
  }

  makeFastReservation(favorHotOffer: FavorHotOfferDTO): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      let favorReservation = new FavorReservation();
      let i = 0;
      for (let ho of favorHotOffer.instructorsFavor.hotOffers) {
        if (favorHotOffer.favorHotOffer.id === ho.id) {
          favorReservation.availableFrom = ho.availableFrom;
          favorReservation.availableTill = ho.availableTill;
          favorReservation.client = this.user;
          favorReservation.services = ho.services;
          favorReservation.cost = ho.cost;
          favorReservation.penalty = null;
          favorReservation.report = null;
          favorHotOffer.instructorsFavor.hotOffers.splice(i, 1);
          favorReservation.favor = favorHotOffer.instructorsFavor;
          break;
        }
        i += 1;
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

  private getTodayStringDate() {
    let today = new Date();
    let year = today.getFullYear().toString();
    let month = (today.getMonth() + 1);
    let day = today.getDate();
    let monthString = month.toString();
    if (month < 10) {
      monthString = '0' + month.toString();
    }
    let dayString = day.toString();
    if (day < 10) {
      dayString = '0' + day.toString();
    }
    let todayString = year + '-' + monthString + '-' + dayString;
    return todayString;
  }

}
