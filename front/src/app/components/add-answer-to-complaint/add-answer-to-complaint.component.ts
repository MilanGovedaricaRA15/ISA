import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Complaint } from 'src/app/model/complaint';
import { ComplaintServiceService } from 'src/app/service/complaint-service.service';

@Component({
  selector: 'app-add-answer-to-complaint',
  templateUrl: './add-answer-to-complaint.component.html',
  styleUrls: ['./add-answer-to-complaint.component.css']
})
export class AddAnswerToComplaintComponent implements OnInit {
  allComplaints: any;
  @Output() answerSended = new EventEmitter<string>();

  constructor(private complaintService: ComplaintServiceService) { }

  ngOnInit(): void {
    this.complaintService.getAllComplaints().subscribe(complaintsFromBack => {
      this.allComplaints = complaintsFromBack;
    });
  }

  sendAnswer() {
    let index = parseInt(sessionStorage.getItem("complaintToAnswer"));
    let answer = document.getElementById('answerId') as HTMLTextAreaElement;
    let complaint = this.allComplaints[index];
    complaint.answer = answer.value;
    this.complaintService.sendAnswer(complaint).subscribe(ret => {
      if(ret)
        this.answerSended.emit();
    });
  }
}
