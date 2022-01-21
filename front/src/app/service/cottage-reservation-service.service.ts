import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  private addReservationByClientUrl: string;
  private addHotOfferReservationByClientUrl: string;
  private changeReservationByOwnerUrl: string;
  private getByIdUrl: string;
  private getCottageReservationsOfClientUrl: string;
  private cancelCottageReservationByClientUrl: string;

  constructor(private http: HttpClient) {
    this.getAllReservationsOfCottageUrl = environment.baseUrl+"cottageReservation/getAllReservationsOfCottage";
    this.getAllReservationsOfCottageFromTillUrl = environment.baseUrl+"cottageReservation/getAllReservationsOfCottageFromTill";
    this.getAllReservationsOfOwnerUrl = environment.baseUrl+"cottageReservation/getAllReservationsOfOwner";
    this.addReservationByOwnerUrl = environment.baseUrl+"cottageReservation/addReservationByOwner";
    this.addReservationByClientUrl = environment.baseUrl+"cottageReservation/addReservationByClient";
    this.addHotOfferReservationByClientUrl = environment.baseUrl+"cottageReservation/addHotOfferReservationByClient";
    this.changeReservationByOwnerUrl = environment.baseUrl+"cottageReservation/changeReservationByOwner";
    this.getByIdUrl = environment.baseUrl+"cottageReservation/getById";
    this.getCottageReservationsOfClientUrl = environment.baseUrl+"cottageReservation/getCottageReservationsOfClient";
    this.cancelCottageReservationByClientUrl = environment.baseUrl+"cottageReservation/cancelCottageReservationByClient";
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
    cottageReservation.penalty = null;
    cottageReservation.report = null;
    return this.http.post<boolean>(this.addReservationByOwnerUrl,cottageReservation,{withCredentials: true});
  }

  public addReservationByClient(cottageReservation: CottageReservation) : Observable<boolean>{
    return this.http.post<boolean>(this.addReservationByClientUrl, cottageReservation, {withCredentials: true});
  }

  public addHotOfferReservationByClient(cottageReservation: CottageReservation) : Observable<boolean>{
    return this.http.post<boolean>(this.addHotOfferReservationByClientUrl, cottageReservation, {withCredentials: true});
  }

  public changeReservationByOwner(cottageReservation: CottageReservation):Observable<boolean>{
    return this.http.put<boolean>(this.changeReservationByOwnerUrl,cottageReservation,{withCredentials: true});
  }
  
  public getById(id: Number):Observable<CottageReservation>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("id",id.toString());
    return this.http.get<CottageReservation>(this.getByIdUrl,{headers: headers,params: params,withCredentials: true});
  }

  public getCottageReservationsOfClient(email: string) : Observable<Array<CottageReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email);
  
    return this.http.get<Array<CottageReservation>>(this.getCottageReservationsOfClientUrl, {headers: headers, params: params, withCredentials: true});
  }

  public cancelCottageReservationByClient(cottageReservation: CottageReservation) : Observable<Boolean> {
    return this.http.put<Boolean>(this.cancelCottageReservationByClientUrl, cottageReservation, {withCredentials: true});
  }

}
