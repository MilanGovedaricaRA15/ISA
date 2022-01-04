import { Component, Input, OnInit } from '@angular/core';
import { Cottage } from 'src/app/model/cottage';
import { CottageService } from 'src/app/service/cottage-service.service';

@Component({
  selector: 'app-cottage-profile-unauthenticated-user',
  templateUrl: './cottage-profile-unauthenticated-user.component.html',
  styleUrls: ['./cottage-profile-unauthenticated-user.component.css']
})
export class CottageProfileUnauthenticatedUserComponent implements OnInit {

  @Input() cottageUnauthenticated: Cottage;
  cottage: Cottage;
  cottageImg: String;
  
  constructor(private cottageService: CottageService) { }

  ngOnInit(): void {
    if(this.cottageUnauthenticated == undefined){
      this.cottageService.getCottageById(Number(sessionStorage.getItem("cottageToShowUnauthenticated"))).subscribe(ret =>{
        this.cottage = ret;
      })
    } else {
      this.cottage = this.cottageUnauthenticated;
    }
    if(this.cottage.images != null){
      this.cottageImg = this.cottage.images[0];
    }
  }

}
