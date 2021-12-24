import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Penalty } from 'src/app/model/penalty';
import { Report } from 'src/app/model/report';
import { ShipReservation } from 'src/app/model/ship-reservation';
import { ShipReservationService } from 'src/app/service/ship-reservation-service.service';

@Component({
  selector: 'app-add-ship-reservation-report',
  templateUrl: './add-ship-reservation-report.component.html',
  styleUrls: ['./add-ship-reservation-report.component.css']
})
export class AddShipReservationReportComponent implements OnInit {

  constructor(private shipReservationService: ShipReservationService) { }
  addNewReport:any;
  reportToAdd: Report;
  @Input() shipReservation: ShipReservation;
  @Output() goToProfile = new EventEmitter<void>();

  ngOnInit(): void {
    if(this.shipReservation == undefined){
      this.shipReservationService.getById(Number(sessionStorage.getItem("receiveShipReservation"))).subscribe(ret =>{
        this.shipReservation = ret;
      })
    }
    this.reportToAdd = new Report;
    this.addNewReport = new FormGroup({
      "report": new FormControl(null,[Validators.required,Validators.pattern('[a-zšđčćžA-ZŠĐČĆŽ ]*')]),
      "comment": new FormControl(null,[Validators.required,Validators.pattern('[a-zšđčćžA-ZŠĐČĆŽ ]*')]),
      "praise": new FormControl(null,[Validators.required,Validators.pattern('[a-zšđčćžA-ZŠĐČĆŽ ]*')])
    });
  }

  submitData(){
    let elementShowedUp = <HTMLInputElement> document.getElementById('showedUp');
    let elementShouldGetPenalty = <HTMLInputElement> document.getElementById('shouldGetPenalty');
    if(elementShowedUp.checked){
      this.reportToAdd.showedUp = false;
      this.reportToAdd.verified = true;
      let penalty = new Penalty;
      penalty.date = new Date();
      this.shipReservation.penalty = penalty;
    }
    else{
      this.reportToAdd.showedUp = true;
      this.reportToAdd.verified = false;
    }
    if(elementShouldGetPenalty.checked){
      this.reportToAdd.shouldGetPenalty = true;
    }
    else{
      this.reportToAdd.shouldGetPenalty = false;
    }
    this.shipReservation.report = this.reportToAdd;
    this.shipReservationService.changeReservationByOwner(this.shipReservation).subscribe(ret => {
        this.goToProfile.emit();
    })

  }

  get report() {
    return this.addNewReport.get('report');
  }
  get comment() {
    return this.addNewReport.get('comment');
  }
  get praise(){
    return this.addNewReport.get('praise');
  }

}
