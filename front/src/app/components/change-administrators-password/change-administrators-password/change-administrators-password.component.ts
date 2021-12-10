import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user-service.service';


@Component({
  selector: 'app-change-administrators-password',
  templateUrl: './change-administrators-password.component.html',
  styleUrls: ['./change-administrators-password.component.css']
})
export class ChangeAdministratorsPasswordComponent implements OnInit {

  newPassword: string;
  confirmNewPassword: string;
  samePasswords: boolean;
  user: User;
  @Output() nextProfile = new EventEmitter<string>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
    });
    this.samePasswords = false;
  }

  onSubmit(): void{
    if(this.newPassword != this.confirmNewPassword)
      this.samePasswords = true;
    else {
      this.samePasswords = false;
      this.user.password = this.newPassword;
      this.userService.changeAdminsPassword(this.user).subscribe(ret => {

      });
      this.nextProfile.emit('administrator');
    }


  }

}
