import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavorReservation } from '../model/favor-reservation';
import { InstructorsFavor } from '../model/instructors-favor';

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
  getFavorReservationsOfClientUrl: string;
  cancelFavorReservationByClientUrl: string;
  getAllReservationsOfFavorFromTillUrl: string;
  getAllReservationsOfFavorUrl: string;

  constructor(private http: HttpClient) {
    this.getAllReservationsUrl = 'http://localhost:8080/favorReservations/getAllReservations';
    this.addReservationByOwnerUrl = 'http://localhost:8080/favorReservations/addReservationByOwner';
    this.addReservationByClientUrl = 'http://localhost:8080/favorReservations/addReservationByClient';
    this.addFavorHotOfferReservationByClientUrl = 'http://localhost:8080/favorReservations/addFavorHotOfferReservationByClient';
    this.getByIdUrl = 'http://localhost:8080/favorReservations/getReservationById';
    this.changeReservationByInstructorUrl="http://localhost:8080/favorReservations/changeReservationByInstructor";
    this.getAllReservationsOfInstructorFavorsUrl = "http://localhost:8080/favorReservations/getAllReservationsOfInstructorFavors";
    this.getFavorReservationsOfClientUrl = "http://localhost:8080/favorReservations/getFavorReservationsOfClient";
    this.cancelFavorReservationByClientUrl = "http://localhost:8080/favorReservations/cancelFavorReservationByClient";
    this.getAllReservationsOfFavorFromTillUrl = "http://localhost:8080/favorReservations/getAllReservationsOfFavorFromTill";
    this.getAllReservationsOfFavorUrl = "http://localhost:8080/favorReservations/getAllReservationsOfFavor";
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

  public getAllReservationsOfFavorFromTill(favor: InstructorsFavor,from:Date,to:Date): Observable<Array<FavorReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let numberFrom = from.getTime();
    let numberTo = to.getTime();
    let params = new HttpParams().set("id",favor.id).set("from",numberFrom.toString()).set("to",numberTo.toString());  
    return this.http.get<Array<FavorReservation>>(this.getAllReservationsOfFavorFromTillUrl, {headers: headers,params: params,withCredentials: true});
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

  public getFavorReservationsOfClient(email: string) : Observable<Array<FavorReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email);
  
    return this.http.get<Array<FavorReservation>>(this.getFavorReservationsOfClientUrl, {headers: headers, params: params, withCredentials: true});
  }

  public cancelFavorReservationByClient(favorReservation: FavorReservation) : Observable<Boolean> {
    return this.http.put<Boolean>(this.cancelFavorReservationByClientUrl, favorReservation, {withCredentials: true});
  }

  public getAllReservationsOfFavor(instructorsFavor: InstructorsFavor): Observable<Array<FavorReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("id",instructorsFavor.id);
  
    return this.http.get<Array<FavorReservation>>(this.getAllReservationsOfFavorUrl, {headers: headers,params: params,withCredentials: true});
  }
}
