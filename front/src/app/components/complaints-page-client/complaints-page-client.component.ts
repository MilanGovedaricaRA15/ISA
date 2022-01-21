import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/model/complaint';
import { User } from 'src/app/model/user';
import { ComplaintServiceService } from 'src/app/service/complaint-service.service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-complaints-page-client',
  templateUrl: './complaints-page-client.component.html',
  styleUrls: ['./complaints-page-client.component.css']
})
export class ComplaintsPageClientComponent implements OnInit {

  complaints: Array<Complaint>;
  user: User;

  constructor(private complaintService: ComplaintServiceService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      this.complaintService.getAllComplaints().subscribe(ret => {
        this.complaints = new Array<Complaint>();
        for (let c of ret) {
          if (c.author.email === this.user.email) {
            this.complaints.push(c);
          }
        }
      });
    });
  }

}
