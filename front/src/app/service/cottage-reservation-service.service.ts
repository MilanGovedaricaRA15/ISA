import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cottage } from '../model/cottage';
import { CottageReservation } from '../model/cottage-reservation';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CottageReservationService {
  private getAllReservationsOfCottageUrl: string;
  private getAllReservationsOfCottageFromTillUrl: string;
  private getAllReservationsOfOwnerUrl: string;
  private addReservationByOwnerUrl: string;

  constructor(private http: HttpClient) {
    this.getAllReservationsOfCottageUrl="http://localhost:8080/cottageReservation/getAllReservationsOfCottage";
    this.getAllReservationsOfCottageFromTillUrl="http://localhost:8080/cottageReservation/getAllReservationsOfCottageFromTill";
    this.getAllReservationsOfOwnerUrl="http://localhost:8080/cottageReservation/getAllReservationsOfOwner";
    this.addReservationByOwnerUrl="http://localhost:8080/cottageReservation/addReservationByOwner";
   }

   public getAllReservationsOfCottage(cottage: Cottage): Observable<Array<CottageReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("id",cottage.id);
  
    return this.http.get<Array<CottageReservation>>(this.getAllReservationsOfCottageUrl, {headers: headers,params: params,withCredentials: true});
  }

  public getAllReservationsOfCottageFromTill(cottage: Cottage,from:Date,to:Date): Observable<Array<CottageReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let numberFrom = from.getTime();
    let numberTo = to.getTime();
    let params = new HttpParams().set("id",cottage.id).set("from",numberFrom.toString()).set("to",numberTo.toString());  
    return this.http.get<Array<CottageReservation>>(this.getAllReservationsOfCottageFromTillUrl, {headers: headers,params: params,withCredentials: true});
  }

  public getAllReservationsOfOwner(): Observable<Array<CottageReservation>> {
    let user = sessionStorage.getItem('email');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",user);
  
    return this.http.get<Array<CottageReservation>>(this.getAllReservationsOfOwnerUrl, {headers: headers,params: params,withCredentials: true});
  }
  public addReservationByOwner(cottageReservation: CottageReservation):Observable<boolean>{
    return this.http.post<boolean>(this.addReservationByOwnerUrl,cottageReservation,{withCredentials: true});
  }

}
