import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../model/report';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  getAllReportsUrl: string;
  changeVerifiedUrl: string;
  deleteReportUrl: string;

  constructor(private http: HttpClient) { 
    this.getAllReportsUrl = 'http://localhost:8080/reports/getAllReports'
    this.changeVerifiedUrl = 'http://localhost:8080/reports/changeVerified'
    this.deleteReportUrl = 'http://localhost:8080/reports/deleteReport'
  }

  public getAllReports(): Observable<Array<Report>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<Report>>(this.getAllReportsUrl, {headers: headers});
  }

  public changeVerified(id: number): Observable<boolean> {
    return this.http.put<boolean>(this.changeVerifiedUrl, id,{withCredentials: true});
  }

  public removeReport(id:number): Observable<boolean>{
    return this.http.post<boolean>(this.deleteReportUrl,id);
  }
}
