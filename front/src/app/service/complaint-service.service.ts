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

  constructor(private http: HttpClient) {
    this.getAllComplaintsUrl = 'http://localhost:8080/complaints/getAllComplaints';
    this.sendAnswerUrl = 'http://localhost:8080/complaints/sendAnswer';
  }

  public getAllComplaints(): Observable<Array<Complaint>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.http.get<Array<Complaint>>(this.getAllComplaintsUrl, {headers: headers});
  }

  public sendAnswer(complaint: Complaint): Observable<Boolean> {
    return this.http.put<boolean>(this.sendAnswerUrl, complaint,{withCredentials: true});
  }
}
