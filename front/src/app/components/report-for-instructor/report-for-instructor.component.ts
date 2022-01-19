import { Component, OnInit } from '@angular/core';
import { InstructorsFavor } from 'src/app/model/instructors-favor';
import { FavorReservationService } from 'src/app/service/favor-reservation.service';
import { InstructorsFavorService } from 'src/app/service/instructors-favor.service';

@Component({
  selector: 'app-report-for-instructor',
  templateUrl: './report-for-instructor.component.html',
  styleUrls: ['./report-for-instructor.component.css']
})
export class ReportForInstructorComponent implements OnInit {
  averageGrade: Array<Number>
  totalCostOfFavors: Array<Number>
  instructorFavors: Array<InstructorsFavor>
  totalCostOfFavor: number

  constructor(private favorReservationService: FavorReservationService, private instructorsFavorService: InstructorsFavorService) { }

  ngOnInit(): void {
    let from = new Date(sessionStorage.getItem("dateFrom"))
    let to = new Date(sessionStorage.getItem("dateTo"))
    this.averageGrade = new Array<Number>();
    this.totalCostOfFavors = new Array<Number>();
    this.totalCostOfFavor = 0;
    this.instructorsFavorService.getAllFavorsOfInstructor().subscribe(ret => {
      this.instructorFavors = ret
      for (let favor of ret){
        this.favorReservationService.getAllReservationsOfFavorFromTill(favor,from,to).subscribe(ret =>{
          let totalCost = 0;
          for (let x of ret){
            totalCost = totalCost + x.cost;
          }
          this.totalCostOfFavors.push(totalCost);
          this.totalCostOfFavor = this.totalCostOfFavor + totalCost;
          this.averageGrade.push(this.getAverageGrade(favor));
        })
      }
    });
  }

  getAverageGrade(favor: InstructorsFavor):number{
    
    let averageGrade = 0;
    let count = 0;
    for (let grade of favor.grades){
      averageGrade = averageGrade + grade.value;
      count = count + 1;
    }
    averageGrade = averageGrade / count;
    return averageGrade;
  }
}
