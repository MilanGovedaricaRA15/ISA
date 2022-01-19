import { Component, OnInit } from '@angular/core';
import { Cottage } from 'src/app/model/cottage';
import { CottageReservationService } from 'src/app/service/cottage-reservation-service.service';
import { CottageService } from 'src/app/service/cottage-service.service';

@Component({
  selector: 'app-cottage-owner-report',
  templateUrl: './cottage-owner-report.component.html',
  styleUrls: ['./cottage-owner-report.component.css']
})
export class CottageOwnerReportComponent implements OnInit {

  cottages: Array<Cottage>
  cottagesToShow: Array<Cottage>
  constructor(private cottageService: CottageService, private cottageReservationService: CottageReservationService) { }
  datum: Date
  avarageGrade: Array<Number>
  totalCostOfCottages: Array<Number>
  datumTo: Date
  datumFrom: Date
  datumToString: String
  datumFromString: String
  totalCostOfCottage: number;

  ngOnInit(): void {
    this.cottages = new Array<Cottage>();
    this.cottagesToShow = new Array<Cottage>();
    this.avarageGrade = new Array<Number>();
    this.totalCostOfCottage = 0;
    this.datumToString = new Date().toISOString().split('T')[0];
    this.datumFromString = new Date().toISOString().split('T')[0];
    this.totalCostOfCottages = new Array<Number>();
    this.cottageService.getAllCottagesOfOwner().subscribe(ret => {
      this.cottages = ret;
      this.datum = new Date();
      this.datumTo = new Date(this.datum);
      this.datumToString = this.datumTo.toISOString().split('T')[0];
      
      if(this.datum.getMonth()!=0){
        this.datum.setMonth(this.datum.getMonth() - 1);
      }
      else{
          this.datum.setFullYear(this.datum.getFullYear()-1);
          this.datum.setMonth(11);
      }
      this.datumFrom = this.datum;
      this.datumFromString = this.datumFrom.toISOString().split('T')[0];
      
      
      for (let cottage of ret){
        this.cottageReservationService.getAllReservationsOfCottageFromTill(cottage,this.datumFrom,this.datumTo).subscribe(ret =>{
          let totalCost = 0;
          for (let x of ret){
            totalCost = totalCost + x.cost;
          }
          this.totalCostOfCottages.push(totalCost);
          this.avarageGrade.push(this.getAvarageGrade(cottage));
          this.cottagesToShow.push(cottage);
        })
      }
    })
  }

  getAvarageGrade(cottage: Cottage):number{
    
    let avarageGrade = 0;
    let count = 0;
    for (let grade of cottage.grades){
      avarageGrade = avarageGrade + grade.value;
      count = count + 1;
    }
    avarageGrade = avarageGrade / count;
    return avarageGrade;
  }

  showCost(){
    this.cottagesToShow = new Array<Cottage>();
    this.avarageGrade = new Array<Number>();
    this.totalCostOfCottages = new Array<Number>();
    this.totalCostOfCottage = 0;
    let elementFrom = <HTMLInputElement> document.getElementById("from");
    let elementTo = <HTMLInputElement> document.getElementById("to");
    for (let cottage of this.cottages){
      this.cottageReservationService.getAllReservationsOfCottageFromTill(cottage,elementFrom.valueAsDate,elementTo.valueAsDate).subscribe(ret =>{
        let totalCost = 0;
        for (let x of ret){
          totalCost = totalCost + x.cost;
        }
        this.totalCostOfCottages.push(totalCost);
        this.totalCostOfCottage = this.totalCostOfCottage + totalCost;
        this.avarageGrade.push(this.getAvarageGrade(cottage));
        this.cottagesToShow.push(cottage);
      })
    }
  }

}
