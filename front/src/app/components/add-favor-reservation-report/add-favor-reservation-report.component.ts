import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FavorReservation } from 'src/app/model/favor-reservation';
import { Penalty } from 'src/app/model/penalty';
import { Report } from 'src/app/model/report';
import { FavorReservationService } from 'src/app/service/favor-reservation.service';

@Component({
  selector: 'app-add-favor-reservation-report',
  templateUrl: './add-favor-reservation-report.component.html',
  styleUrls: ['./add-favor-reservation-report.component.css']
})
export class AddFavorReservationReportComponent implements OnInit {
  addNewReport:any;
  reportToAdd: Report;
  @Input() favorReservation: FavorReservation;
  @Output() goToProfile = new EventEmitter<void>();

  constructor(private favorReservationService: FavorReservationService) { }

  ngOnInit(): void {
    if(this.favorReservation == undefined){
      this.favorReservationService.getById(Number(sessionStorage.getItem("receiveFavorReservation"))).subscribe(ret =>{
        this.favorReservation = ret;
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
      this.favorReservation.penalty = penalty;
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
    
    this.favorReservation.report = this.reportToAdd;
    this.favorReservationService.changeReservationByInstructor(this.favorReservation).subscribe(ret => {
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
