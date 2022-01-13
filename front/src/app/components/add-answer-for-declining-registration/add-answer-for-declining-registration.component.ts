import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-answer-for-declining-registration',
  templateUrl: './add-answer-for-declining-registration.component.html',
  styleUrls: ['./add-answer-for-declining-registration.component.css']
})
export class AddAnswerForDecliningRegistrationComponent implements OnInit {
  allUsers: any;
  @Output() decliningReason = new EventEmitter<string>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(ret => {
      this.allUsers = ret;
    });
  }

  confirm() {
    let index = parseInt(sessionStorage.getItem("requestToDecliningAnswer"));
    let answer = document.getElementById('reasonId') as HTMLTextAreaElement;
    let declineUser = this.allUsers[index]
    this.userService.declineUser(declineUser.id.toString() + ' ' + answer.value).subscribe(ret => {
      if(ret)
        this.decliningReason.emit();  
    });
  }
}
