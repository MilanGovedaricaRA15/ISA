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
  addReservationByClientUrl: string;
  addFavorHotOfferReservationByClientUrl: string;
  getByIdUrl: string;
  changeReservationByInstructorUrl: string;
  getAllReservationsOfInstructorFavorsUrl: string;

  constructor(private http: HttpClient) {
    this.getAllReservationsUrl = 'http://localhost:8080/favorReservations/getAllReservations';
    this.addReservationByOwnerUrl = 'http://localhost:8080/favorReservations/addReservationByOwner';
    this.addReservationByClientUrl = 'http://localhost:8080/favorReservations/addReservationByClient';
    this.addFavorHotOfferReservationByClientUrl = 'http://localhost:8080/favorReservations/addFavorHotOfferReservationByClient';
    this.getByIdUrl = 'http://localhost:8080/favorReservations/getReservationById';
    this.changeReservationByInstructorUrl="http://localhost:8080/favorReservations/changeReservationByInstructor";
    this.getAllReservationsOfInstructorFavorsUrl = "http://localhost:8080/favorReservations/getAllReservationsOfInstructorFavors"
  }

  public getAllReservations(): Observable<Array<FavorReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<FavorReservation>>(this.getAllReservationsUrl, {headers: headers});
  }

  public addReservationByOwner(favorReservation: FavorReservation):Observable<boolean>{
    return this.http.post<boolean>(this.addReservationByOwnerUrl,favorReservation,{withCredentials: true});
  }

  public addReservationByClient(favorReservation: FavorReservation) : Observable<boolean>{
    return this.http.post<boolean>(this.addReservationByClientUrl, favorReservation, {withCredentials: true});
  }

  public addFavorHotOfferReservationByClient(favorReservation: FavorReservation) : Observable<boolean>{
    return this.http.post<boolean>(this.addFavorHotOfferReservationByClientUrl, favorReservation, {withCredentials: true});
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

  public getAllReservationsOfInstructorFavors(email: string) : Observable<Array<FavorReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email);

    return this.http.get<Array<FavorReservation>>(this.getAllReservationsOfInstructorFavorsUrl, {headers: headers, params: params});
  }
}
