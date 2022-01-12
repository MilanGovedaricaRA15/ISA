import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavorReservation } from '../model/favor-reservation';

@Injectable({
  providedIn: 'root'
})
export class FavorReservationService {
  getAllReservationsUrl: string;
  addReservationByOwnerUrl: string;
  getByIdUrl: string;
  changeReservationByInstructorUrl: string;

  constructor(private http: HttpClient) {
    this.getAllReservationsUrl = 'http://localhost:8080/favorReservations/getAllReservations';
    this.addReservationByOwnerUrl = 'http://localhost:8080/favorReservations/addReservationByOwner';
    this.getByIdUrl = 'http://localhost:8080/favorReservations/getReservationById';
    this.changeReservationByInstructorUrl="http://localhost:8080/favorReservations/changeReservationByInstructor";
  }

  public getAllReservations(): Observable<Array<FavorReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<FavorReservation>>(this.getAllReservationsUrl, {headers: headers});
  }

  public addReservationByOwner(favorReservation: FavorReservation):Observable<boolean>{
    return this.http.post<boolean>(this.addReservationByOwnerUrl,favorReservation,{withCredentials: true});
  }

  public getById(id:number) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("id",id.toString());
    return this.http.get<FavorReservation>(this.getByIdUrl,{headers: headers,params: params,withCredentials: true});
  }

  public changeReservationByInstructor(favorReservation: FavorReservation):Observable<boolean>{
    return this.http.put<boolean>(this.changeReservationByInstructorUrl,favorReservation,{withCredentials: true});
  }
}
