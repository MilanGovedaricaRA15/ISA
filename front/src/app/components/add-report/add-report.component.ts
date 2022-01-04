import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CottageReservation } from 'src/app/model/cottage-reservation';
import { Penalty } from 'src/app/model/penalty';
import { Report } from 'src/app/model/report';
import { CottageReservationService } from 'src/app/service/cottage-reservation-service.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {

  constructor(private cottageReservationService: CottageReservationService) { }
  addNewReport:any;
  reportToAdd: Report;
  @Input() cottageReservation: CottageReservation;
  @Output() goToProfile = new EventEmitter<void>();

  ngOnInit(): void {
    if(this.cottageReservation == undefined){
      this.cottageReservationService.getById(Number(sessionStorage.getItem("receiveCottageReservation"))).subscribe(ret =>{
        this.cottageReservation = ret;
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
      this.cottageReservation.penalty = penalty;
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
    this.cottageReservation.report = this.reportToAdd;
    this.cottageReservationService.changeReservationByOwner(this.cottageReservation).subscribe(ret => {
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
