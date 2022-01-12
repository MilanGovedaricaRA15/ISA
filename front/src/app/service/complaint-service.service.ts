import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../model/complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintServiceService {
  private getAllComplaintsUrl: string;

  constructor(private http: HttpClient) {
    this.getAllComplaintsUrl = 'http://localhost:8080/complaint/getAllComplaints';
  }

  public getAllComplaints(): Observable<Array<Complaint>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.http.get<Array<Complaint>>(this.getAllComplaintsUrl, {headers: headers});
  }
}
