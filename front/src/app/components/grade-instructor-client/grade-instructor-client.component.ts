import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Grade } from 'src/app/model/grade';
import { User } from 'src/app/model/user';
import { GradeService } from 'src/app/service/grade-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-grade-instructor-client',
  templateUrl: './grade-instructor-client.component.html',
  styleUrls: ['./grade-instructor-client.component.css']
})
export class GradeInstructorClientComponent implements OnInit {
  @Input() instructorToGrade: User;

  @Output() allClientReservations = new EventEmitter<void>();

  instructor: User;
  gradeValue: number;
  gradeComment: string;
  user: User;

  constructor(private userService: UserService, private gradeService: GradeService) { }

  ngOnInit(): void {
    if (this.instructorToGrade == undefined) {
      this.userService.getInstructorByEmail(sessionStorage.getItem("instructorToGradeClient")).subscribe(ret => {
        this.instructor = ret;
      });
    } else {
      this.instructor = this.instructorToGrade;
    }

    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
    });
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
          
        let newOwner = this.instructor;
        newOwner.grades.push(grade);
        this.gradeService.addGradeToUser(newOwner).subscribe(ret => {
          this.showGradeSaveStatus(ret);
          this.allClientReservations.emit();
        });
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
