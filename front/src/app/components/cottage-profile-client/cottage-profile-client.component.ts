import { Component, Input, OnInit } from '@angular/core';
import { CottageDTO, getAverageCottageGrade } from 'src/app/dto/cottage-dto';
import { Cottage } from 'src/app/model/cottage';
import { CottageReservation } from 'src/app/model/cottage-reservation';
import { CottageReservationService } from 'src/app/service/cottage-reservation-service.service';
import { CottageService } from 'src/app/service/cottage-service.service';

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
  
  constructor(private cottageService: CottageService, private cottageReservationService: CottageReservationService) { }

  ngOnInit(): void {
    if(this.cottageClient == undefined){
      this.cottageService.getCottageById(Number(sessionStorage.getItem("cottageToShowClient"))).subscribe(ret =>{
        this.cottage = new CottageDTO(ret, getAverageCottageGrade(ret), ret.costPerNight);
        this.cottageReservationService.getAllReservationsOfCottage(this.cottage.cottage).subscribe(ret => {
          this.cottageReservations = new Array<CottageReservation>();
          for (let cr of ret) {
            this.cottageReservations.push(cr);
          }
        })
      })
    } else {
      this.cottage = new CottageDTO(this.cottageClient, getAverageCottageGrade(this.cottageClient), this.cottageClient.costPerNight);
      this.cottageReservationService.getAllReservationsOfCottage(this.cottage.cottage).subscribe(ret => {
        this.cottageReservations = new Array<CottageReservation>();
        for (let cr of ret) {
          this.cottageReservations.push(cr);
        }
      })
    }
    if(this.cottage.cottage.images != null){
      this.cottageImg = this.cottage.cottage.images[0];
    }
  }

}
