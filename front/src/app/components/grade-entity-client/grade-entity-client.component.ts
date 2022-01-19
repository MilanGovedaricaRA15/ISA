import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cottage } from 'src/app/model/cottage';
import { Grade } from 'src/app/model/grade';
import { Ship } from 'src/app/model/ship';
import { User } from 'src/app/model/user';
import { CottageService } from 'src/app/service/cottage-service.service';
import { GradeService } from 'src/app/service/grade-service.service';
import { ShipService } from 'src/app/service/ship-service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-grade-entity-client',
  templateUrl: './grade-entity-client.component.html',
  styleUrls: ['./grade-entity-client.component.css']
})
export class GradeEntityClientComponent implements OnInit {
  @Input() cottageToGrade: Cottage;

  @Output() allClientReservations = new EventEmitter<void>();

  cottage: Cottage;
  cottageChecked: boolean;
  cottageOwnerChecked: boolean;

  ship: Ship;
  shipChecked: boolean;
  shipOwnerChecked: boolean;

  gradeValue: number;
  gradeComment: string;
  user: User;

  constructor(private userService: UserService, private gradeService: GradeService, private cottageService: CottageService) { }

  ngOnInit(): void {
    if (this.cottageToGrade == undefined) {
      this.cottageService.getCottageById(Number(sessionStorage.getItem("cottageToGradeClient"))).subscribe(ret => {
        this.cottage = ret;
      });
    } else {
      this.cottage = this.cottageToGrade;
    }

    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
    });

    this.cottageChecked = false;
    this.cottageOwnerChecked = false;
  }

  chooseCottageOrOwner(): void {
    let gradeCotEl = document.getElementById('gradeCottage') as HTMLInputElement;
    let gradeOwnEl = document.getElementById('gradeOwner') as HTMLInputElement;
    if (!gradeCotEl.checked && !gradeOwnEl.checked) {
      alert('You must select one option!');
    } else {
      if (gradeCotEl.checked) {
        this.cottageChecked = true;
        this.cottageOwnerChecked = false;
      } else {
        this.cottageChecked = false;
        this.cottageOwnerChecked = true;
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

        if (this.cottageChecked) {
          let newCottage = this.cottage;
          newCottage.grades.push(grade);
          this.gradeService.addGradeToCottage(newCottage).subscribe(ret => {
            this.showGradeSaveStatus(ret);
            this.allClientReservations.emit();
          });
        } else if (this.cottageOwnerChecked) {
          let newOwner = this.cottage.owner;
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
}
