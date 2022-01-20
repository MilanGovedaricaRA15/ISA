import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../model/complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintServiceService {
  private getAllComplaintsUrl: string;
  private sendAnswerUrl: string;
  private addComplaintUrl: string;

  constructor(private http: HttpClient) {
    this.getAllComplaintsUrl = 'http://localhost:8080/complaints/getAllComplaints';
    this.sendAnswerUrl = 'http://localhost:8080/complaints/sendAnswer';
    this.addComplaintUrl = 'http://localhost:8080/complaints/addComplaint';
  }

  public getAllComplaints(): Observable<Array<Complaint>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.http.get<Array<Complaint>>(this.getAllComplaintsUrl, {headers: headers});
  }

  public sendAnswer(complaint: Complaint): Observable<Boolean> {
    return this.http.put<boolean>(this.sendAnswerUrl, complaint,{withCredentials: true});
  }

  public addComplaint(complaint: Complaint): Observable<boolean> {
    return this.http.post<boolean>(this.addComplaintUrl, complaint, {withCredentials: true});
  }
}
