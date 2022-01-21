import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountDeleteRequest } from 'src/app/model/account-delete-request';
import { User } from 'src/app/model/user';
import { AccountDeleteRequestService } from 'src/app/service/account-delete-request-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-account-delete-request-client',
  templateUrl: './account-delete-request-client.component.html',
  styleUrls: ['./account-delete-request-client.component.css']
})
export class AccountDeleteRequestClientComponent implements OnInit {
  @Input() clientToDeleteAccount: User;
  @Output() clientProfile = new EventEmitter<void>();

  client: User;

  constructor(private userService: UserService, private accountDeleteRequestService: AccountDeleteRequestService) { }

  ngOnInit(): void {
    if(this.clientToDeleteAccount == undefined){
      this.userService.getUserByEmail(sessionStorage.getItem("clientToDeleteAccount")).subscribe(ret =>{
        this.client = ret;
      });
    } else {
      this.userService.getUserByEmail(this.clientToDeleteAccount.email).subscribe(ret =>{
        this.client = ret;
      });
    }
  }

  addAccountDeleteRequest(): void {
    let reasonEl = document.getElementById('reason') as HTMLTextAreaElement;
    let reason = reasonEl.value;
    let accountDeleteRequest = new AccountDeleteRequest();
    accountDeleteRequest.user = this.client;
    accountDeleteRequest.reason = reason;
    accountDeleteRequest.answer = "";
    accountDeleteRequest.seen = false;
    this.accountDeleteRequestService.addAccountDeleteRequest(accountDeleteRequest).subscribe(ret => {
      if (ret) {
        alert("Request sent successfully!");
        this.clientProfile.emit();
      } else {
        alert("Could't send request! You have already sent your request!");
      }
    });
  }

}
