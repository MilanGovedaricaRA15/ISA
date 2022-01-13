import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountDeleteRequestService } from 'src/app/service/account-delete-request-service.service';

@Component({
  selector: 'app-add-reason-for-deleting-request',
  templateUrl: './add-reason-for-deleting-request.component.html',
  styleUrls: ['./add-reason-for-deleting-request.component.css']
})
export class AddReasonForDeletingRequestComponent implements OnInit {
  allRequests: any;
  @Output() reasonSended = new EventEmitter<string>();

  constructor(private accountDeleteRequestService: AccountDeleteRequestService) { }

  ngOnInit(): void {
    this.accountDeleteRequestService.getAllRequests().subscribe(requestsFromBack => {
      this.allRequests = requestsFromBack;
    });
  }

  confirm() {
    let index = parseInt(sessionStorage.getItem("requestToAnswer"));
    let answer = document.getElementById('reasonId') as HTMLTextAreaElement;
    let request = this.allRequests[index];
    request.answer = answer.value;
    this.accountDeleteRequestService.declineRequest(request).subscribe(ret => {
      if(ret)
        this.reasonSended.emit();
    });
  }
}
