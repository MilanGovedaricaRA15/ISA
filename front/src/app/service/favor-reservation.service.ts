import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavorReservation } from '../model/favor-reservation';

@Injectable({
  providedIn: 'root'
})
export class FavorReservationService {
  getAllReservationsUrl: string;

  constructor(private http: HttpClient) {
    this.getAllReservationsUrl = 'http://localhost:8080/favorReservations/getAllReservations';
  }

  public getAllReservations(): Observable<Array<FavorReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<FavorReservation>>(this.getAllReservationsUrl, {headers: headers});
  }
}
