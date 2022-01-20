import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/model/complaint';
import { ComplaintServiceService } from 'src/app/service/complaint-service.service';

@Component({
  selector: 'app-complaints-page-client',
  templateUrl: './complaints-page-client.component.html',
  styleUrls: ['./complaints-page-client.component.css']
})
export class ComplaintsPageClientComponent implements OnInit {

  complaints: Array<Complaint>;

  constructor(private complaintService: ComplaintServiceService) { }

  ngOnInit(): void {
    this.complaintService.getAllComplaints().subscribe(ret => {
      this.complaints = ret;
    });
  }

}
