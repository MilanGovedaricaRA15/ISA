import { Component, Input, OnInit } from '@angular/core';
import { Cottage } from 'src/app/model/cottage';
import { CottageService } from 'src/app/service/cottage-service.service';

@Component({
  selector: 'app-cottage-profile-client',
  templateUrl: './cottage-profile-client.component.html',
  styleUrls: ['./cottage-profile-client.component.css']
})
export class CottageProfileClientComponent implements OnInit {

  @Input() cottageClient: Cottage;
  cottage: Cottage;
  cottageImg: String;
  
  constructor(private cottageService: CottageService) { }

  ngOnInit(): void {
    if(this.cottageClient == undefined){
      this.cottageService.getCottageById(Number(sessionStorage.getItem("cottageToShowClient"))).subscribe(ret =>{
        this.cottage = ret;
      })
    } else {
      this.cottage = this.cottageClient;
    }
    if(this.cottage.images != null){
      this.cottageImg = this.cottage.images[0];
    }
  }

}
