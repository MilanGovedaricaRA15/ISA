import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Complaint } from 'src/app/model/complaint';
import { Grade } from 'src/app/model/grade';
import { Ship } from 'src/app/model/ship';
import { User } from 'src/app/model/user';
import { ComplaintServiceService } from 'src/app/service/complaint-service.service';
import { GradeService } from 'src/app/service/grade-service.service';
import { ShipService } from 'src/app/service/ship-service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-grade-ship-client',
  templateUrl: './grade-ship-client.component.html',
  styleUrls: ['./grade-ship-client.component.css']
})
export class GradeShipClientComponent implements OnInit {
  @Input() shipToGrade: Ship;

  @Output() allClientReservations = new EventEmitter<void>();

  grading: boolean;
  complaining: boolean;

  ship: Ship;

  shipChecked: boolean;
  shipOwnerChecked: boolean;

  gradeValue: number;
  gradeComment: string;

  complaintComment: string;

  user: User;

  constructor(private userService: UserService, private gradeService: GradeService, private complaintService: ComplaintServiceService, private shipService: ShipService) { }

  ngOnInit(): void {
    if (this.shipToGrade == undefined) {
      this.shipService.getShipById(Number(sessionStorage.getItem("shipToGradeClient"))).subscribe(ret => {
        this.ship = ret;
      });
    } else {
      this.ship = this.shipToGrade;
    }

    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
    });

    this.grading = false;
    this.complaining = false;

    this.shipChecked = false;
    this.shipOwnerChecked = false;
  }

  chooseGradeOrComplain(): void {
    let gradeEl = document.getElementById('grade') as HTMLInputElement;
    let complaintEl = document.getElementById('complaint') as HTMLInputElement;
    if (!gradeEl.checked && !complaintEl.checked) {
      alert('You must select one option!');
    } else {
      if (gradeEl.checked) {
        this.grading = true;
        this.complaining = false;
      } else {
        this.grading = false;
        this.complaining = true;
      }
    }
    this.shipChecked = false;
    this.shipOwnerChecked = false;
  }

  chooseShipOrOwner(): void {
    let gradeShEl = document.getElementById('gradeShip') as HTMLInputElement;
    let gradeShOwnEl = document.getElementById('gradeShipOwner') as HTMLInputElement;
    if (!gradeShEl.checked && !gradeShOwnEl.checked) {
      alert('You must select one option!');
    } else {
      if (gradeShEl.checked) {
        this.shipChecked = true;
        this.shipOwnerChecked = false;
      } else {
        this.shipChecked = false;
        this.shipOwnerChecked = true;
      }
    }
  }

  chooseShipOrOwnerComplaint(): void {
    let complaintShEl = document.getElementById('complaintShip') as HTMLInputElement;
    let complaintOwnEl = document.getElementById('complaintShipOwner') as HTMLInputElement;
    if (!complaintShEl.checked && !complaintOwnEl.checked) {
      alert('You must select one option!');
    } else {
      if (complaintShEl.checked) {
        this.shipChecked = true;
        this.shipOwnerChecked = false;
      } else {
        this.shipChecked = false;
        this.shipOwnerChecked = true;
      }
    }
  }

  addGrade(): void {
    let grade5El = document.getElementById('grade5') as HTMLInputElement;
    let grade6El = document.getElementById('grade6') as HTMLInputElement;
    let grade7El = document.getElementById('grade7') as HTMLInputElement;
    let grade8El = document.getElementById('grade8') as HTMLInputElement;
    let grade9El = document.getElementById('grade9') as HTMLInputElement;
    let grade10El = document.getElementById('grade10') as HTMLInputElement;

    let commentEl = document.getElementById('gradeCommentText') as HTMLTextAreaElement;

    if (!grade5El.checked && !grade6El.checked && !grade7El.checked && !grade8El.checked && !grade9El.checked && !grade10El.checked) {
      alert('You must select one of the options for grade value!');
    } else {
      if (grade5El.checked) {
        this.gradeValue = 5;
      } else if (grade6El.checked) {
        this.gradeValue = 6;
      } else if (grade7El.checked) {
        this.gradeValue = 7;
      } else if (grade8El.checked) {
        this.gradeValue = 8;
      } else if (grade9El.checked) {
        this.gradeValue = 9;
      } else if (grade10El.checked) {
        this.gradeValue = 10;
      } else {
        this.gradeValue = 5;
      }
      this.gradeComment = commentEl.value;

      this.userService.getLoggedUser().subscribe(ret => {
        this.user = ret;

        let grade = new Grade();
        grade.user = this.user;
        grade.value = this.gradeValue;
        grade.comment = this.gradeComment;
        grade.seen = false;

        if (this.shipChecked) {
          let newShip = this.ship;
          newShip.grades.push(grade);
          this.gradeService.addGradeToShip(newShip).subscribe(ret => {
            this.showGradeSaveStatus(ret);
            this.allClientReservations.emit();
          });
        } else if (this.shipOwnerChecked) {
          let newOwner = this.ship.owner;
          newOwner.grades.push(grade);
          this.gradeService.addGradeToUser(newOwner).subscribe(ret => {
            this.showGradeSaveStatus(ret);
            this.allClientReservations.emit();
          });
        }
      });
      
    }
  }


  private showGradeSaveStatus(ret: boolean) {
    if (ret) {
      alert('Grade successfully created!');
    } else {
      alert('We run into a problem! Grade could not be created!');
    }
  }

  addComplaint(): void {
    let commentEl = document.getElementById('complaintCommentText') as HTMLTextAreaElement;

    this.complaintComment = commentEl.value;

    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;

      let complaint = new Complaint();
      complaint.text = this.complaintComment;
      complaint.author = this.user;
      complaint.complaintCottage = null;
      complaint.answer = "";

      if (this.shipChecked) {
        complaint.complaintUser = null;
        complaint.complaintShip = this.ship;
        this.complaintService.addComplaint(complaint).subscribe(ret => {
          this.showComplaintSaveStatus(ret);
          this.allClientReservations.emit();
        });
      } else if (this.shipOwnerChecked) {
        complaint.complaintUser = this.ship.owner;
        complaint.complaintCottage = null;
        this.complaintService.addComplaint(complaint).subscribe(ret => {
          this.showComplaintSaveStatus(ret);
          this.allClientReservations.emit();
        });
      }
    });
      
  }

  private showComplaintSaveStatus(ret: boolean) {
    if (ret) {
      alert('Complaint successfully created!');
    } else {
      alert('We run into a problem! Complaint could not be created!');
    }
  }
}
