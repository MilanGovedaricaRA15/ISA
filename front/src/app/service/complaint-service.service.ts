import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Complaint } from '../model/complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintServiceService {
  private getAllComplaintsUrl: string;
  private sendAnswerUrl: string;
  private addComplaintUrl: string;

  constructor(private http: HttpClient) {
    this.getAllComplaintsUrl = environment.baseUrl+'complaints/getAllComplaints';
    this.sendAnswerUrl = environment.baseUrl+'complaints/sendAnswer';
    this.addComplaintUrl = environment.baseUrl+'complaints/addComplaint';
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
