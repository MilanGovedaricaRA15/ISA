import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingRevenue } from '../model/booking-revenue';

@Injectable({
  providedIn: 'root'
})
export class BookingRevenueService {
  getRevenuesUrl: string;
  changeRevenuesUrl: string;

  constructor(private http: HttpClient) {
    this.getRevenuesUrl = 'http://localhost:8080/bookingRevenue/getRevenues';
    this.changeRevenuesUrl = 'http://localhost:8080/bookingRevenue/changeRevenues';
  }

  public getRevenues(): Observable<BookingRevenue> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.http.get<BookingRevenue>(this.getRevenuesUrl, {headers: headers});
  }

  public changeRevenues(revenueRegular: number, revenueSilver: number, revenueGold: number): Observable<Boolean> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let par = revenueRegular.toString() + ' ' + revenueSilver.toString() + ' ' + revenueGold.toString(); 
    return this.http.put<boolean>(this.changeRevenuesUrl, par, {headers: headers});
  }
}
