import { Component, Input, OnInit } from '@angular/core';
import { CottageDTO, getAverageCottageGrade } from 'src/app/dto/cottage-dto';
import { Cottage } from 'src/app/model/cottage';
import { CottageService } from 'src/app/service/cottage-service.service';

@Component({
  selector: 'app-cottage-profile-unauthenticated-user',
  templateUrl: './cottage-profile-unauthenticated-user.component.html',
  styleUrls: ['./cottage-profile-unauthenticated-user.component.css']
})
export class CottageProfileUnauthenticatedUserComponent implements OnInit {

  @Input() cottageUnauthenticated: Cottage;
  cottage: CottageDTO;
  cottageImg: String;
  
  constructor(private cottageService: CottageService) { }

  ngOnInit(): void {
    if(this.cottageUnauthenticated == undefined){
      this.cottageService.getCottageById(Number(sessionStorage.getItem("cottageToShowUnauthenticated"))).subscribe(ret =>{
        this.cottage = new CottageDTO(ret, getAverageCottageGrade(ret), ret.costPerNight);
      })
    } else {
      this.cottage = new CottageDTO(this.cottageUnauthenticated, getAverageCottageGrade(this.cottageUnauthenticated), this.cottageUnauthenticated.costPerNight);
    }
    if(this.cottage.cottage.images != null){
      this.cottageImg = this.cottage.cottage.images[0];
    }
  }

}
