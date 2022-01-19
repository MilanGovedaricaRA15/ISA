import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Ship } from 'src/app/model/ship';
import { ShipReservationService } from 'src/app/service/ship-reservation-service.service';
import { ShipService } from 'src/app/service/ship-service';

@Component({
  selector: 'app-ship-owner-report',
  templateUrl: './ship-owner-report.component.html',
  styleUrls: ['./ship-owner-report.component.css']
})
export class ShipOwnerReportComponent implements OnInit {

  ships: Array<Ship>
  shipsToShow: Array<Ship>
  constructor(private shipService: ShipService, private shipReservationService: ShipReservationService) { }
  datum: Date
  avarageGrade: Array<Number>
  totalCostOfShips: Array<Number>
  datumTo: Date
  datumFrom: Date
  datumToString: String
  datumFromString: String
  totalCostOfBoat: number;

  ngOnInit(): void {
    this.ships = new Array<Ship>();
    this.shipsToShow = new Array<Ship>();
    this.avarageGrade = new Array<Number>();
    this.totalCostOfBoat = 0;
    this.datumToString = new Date().toISOString().split('T')[0];
    this.datumFromString = new Date().toISOString().split('T')[0];
    this.totalCostOfShips = new Array<Number>();
    this.shipService.getAllShipsOfOwner().subscribe(ret => {
      this.ships = ret;
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
      

      for (let ship of ret){
        this.shipReservationService.getAllReservationsOfShipFromTill(ship,this.datumFrom,this.datumTo).subscribe(ret =>{
          let totalCost = 0;
          for (let x of ret){
            totalCost = totalCost + x.cost;
          }
          this.totalCostOfShips.push(totalCost);
          this.avarageGrade.push(this.getAvarageGrade(ship));
          this.shipsToShow.push(ship);
        })
      }
     
      
    })
  }

  getAvarageGrade(ship: Ship):number{
    
    let avarageGrade = 0;
    let count = 0;
    for (let grade of ship.grades){
      avarageGrade = avarageGrade + grade.value;
      count = count + 1;
    }
    avarageGrade = avarageGrade / count;
    return avarageGrade;
  }

  showCost(){
    this.shipsToShow = new Array<Ship>();
    this.avarageGrade = new Array<Number>();
    this.totalCostOfShips = new Array<Number>();
    this.totalCostOfBoat = 0;
    let elementFrom = <HTMLInputElement> document.getElementById("from");
    let elementTo = <HTMLInputElement> document.getElementById("to");
    for (let ship of this.ships){
      this.shipReservationService.getAllReservationsOfShipFromTill(ship,elementFrom.valueAsDate,elementTo.valueAsDate).subscribe(ret =>{
        let totalCost = 0;
        for (let x of ret){
          totalCost = totalCost + x.cost;
        }
        this.totalCostOfShips.push(totalCost);
        this.totalCostOfBoat = this.totalCostOfBoat + totalCost;
        this.avarageGrade.push(this.getAvarageGrade(ship));
        this.shipsToShow.push(ship);
      })
    }
  }
  
}
