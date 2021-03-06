import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ship } from '../model/ship';
import { ShipReservation } from '../model/ship-reservation';

@Injectable({
  providedIn: 'root'
})
export class ShipReservationService {

  private getAllReservationsOfShipUrl: string;
  private getAllReservationsOfShipFromTillUrl: string;
  private getAllReservationsOfOwnerUrl: string;
  private getShipReservationsOfClientUrl: string;
  private addReservationByOwnerUrl: string;
  private addReservationByClientUrl: string;
  private addShipHotOfferReservationByClientUrl: string;
  private changeReservationByOwnerUrl: string;
  private getByIdUrl: string;
  private cancelShipReservationByClientUrl: string;
  private getAllReservationsUrl: string;
  private getAllReservationsFromBaseFromTillUrl: string;

  constructor(private http: HttpClient) {
    this.getAllReservationsOfShipFromTillUrl=environment.baseUrl+"shipReservation/getAllReservationsOfShipFromTill";
    this.getAllReservationsOfShipUrl=environment.baseUrl+"shipReservation/getAllReservationsOfShip";
    this.getAllReservationsOfOwnerUrl=environment.baseUrl+"shipReservation/getAllReservationsOfOwner";
    this.getShipReservationsOfClientUrl = environment.baseUrl+"shipReservation/getShipReservationsOfClient";
    this.addReservationByOwnerUrl=environment.baseUrl+"shipReservation/addReservationByOwner";
    this.addReservationByClientUrl=environment.baseUrl+"shipReservation/addReservationByClient";
    this.addShipHotOfferReservationByClientUrl=environment.baseUrl+"shipReservation/addShipHotOfferReservationByClient";
    this.changeReservationByOwnerUrl=environment.baseUrl+"shipReservation/changeReservationByOwner";
    this.getByIdUrl=environment.baseUrl+"shipReservation/getById";
    this.cancelShipReservationByClientUrl=environment.baseUrl+"shipReservation/cancelShipReservationByClient";
    this.getAllReservationsUrl = environment.baseUrl+ 'shipReservation/getAllReservations';
    this.getAllReservationsFromBaseFromTillUrl = environment.baseUrl+ 'shipReservation/getAllReservationsFromBaseFromTill'

   }

   public getAllReservations(): Observable<Array<ShipReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<ShipReservation>>(this.getAllReservationsUrl, {headers: headers});
  }

  public getAllReservationsFromBaseFromTill(from: Date, to: Date): Observable<Array<ShipReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let numberFrom = from.getTime();
    let numberTo = to.getTime();
    let params = new HttpParams().set("from",numberFrom.toString()).set("to",numberTo.toString());  
    return this.http.get<Array<ShipReservation>>(this.getAllReservationsFromBaseFromTillUrl, {headers: headers,params: params,withCredentials: true});
  }

   public getAllReservationsOfShip(ship: Ship): Observable<Array<ShipReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("id",ship.id);
  
    return this.http.get<Array<ShipReservation>>(this.getAllReservationsOfShipUrl, {headers: headers,params: params,withCredentials: true});
  }

  public getAllReservationsOfShipFromTill(ship: Ship,from:Date,to:Date): Observable<Array<ShipReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let numberFrom = from.getTime();
    let numberTo = to.getTime();
    let params = new HttpParams().set("id",ship.id).set("from",numberFrom.toString()).set("to",numberTo.toString());  
    return this.http.get<Array<ShipReservation>>(this.getAllReservationsOfShipFromTillUrl, {headers: headers,params: params,withCredentials: true});
  }

  public getAllReservationsOfOwner(): Observable<Array<ShipReservation>> {
    let user = sessionStorage.getItem('email');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",user);
  
    return this.http.get<Array<ShipReservation>>(this.getAllReservationsOfOwnerUrl, {headers: headers,params: params,withCredentials: true});
  }

  public getShipReservationsOfClient(email: string) : Observable<Array<ShipReservation>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email);
  
    return this.http.get<Array<ShipReservation>>(this.getShipReservationsOfClientUrl, {headers: headers, params: params, withCredentials: true});
  }

  public addReservationByOwner(shipReservation: ShipReservation):Observable<boolean>{
    shipReservation.report = null;
    shipReservation.penalty = null;
    return this.http.post<boolean>(this.addReservationByOwnerUrl,shipReservation,{withCredentials: true});
  }

  public addReservationByClient(shipReservation: ShipReservation) : Observable<boolean> {
    return this.http.post<boolean>(this.addReservationByClientUrl, shipReservation, {withCredentials: true});
  }

  public addShipHotOfferReservationByClient(shipReservation: ShipReservation) : Observable<boolean>{
    return this.http.post<boolean>(this.addShipHotOfferReservationByClientUrl, shipReservation, {withCredentials: true});
  }

  public changeReservationByOwner(shipReservation: ShipReservation):Observable<boolean>{
    return this.http.put<boolean>(this.changeReservationByOwnerUrl,shipReservation,{withCredentials: true});
  }

  public getById(id: Number):Observable<ShipReservation>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("id",id.toString());
    return this.http.get<ShipReservation>(this.getByIdUrl,{headers: headers,params: params,withCredentials: true});
  }

  public cancelShipReservationByClient(shipReservation: ShipReservation) : Observable<Boolean> {
    return this.http.put<Boolean>(this.cancelShipReservationByClientUrl, shipReservation, {withCredentials: true});
  }
}
