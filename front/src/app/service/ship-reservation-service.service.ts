import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ship } from '../model/ship';
import { ShipReservation } from '../model/ship-reservation';

@Injectable({
  providedIn: 'root'
})
export class ShipReservationService {

  private getAllReservationsOfShipUrl: string;
  private getAllReservationsOfShipFromTillUrl: string;
  private getAllReservationsOfOwnerUrl: string;
  private addReservationByOwnerUrl: string;
  private addReservationByClientUrl: string;
  private changeReservationByOwnerUrl: string;
  private getByIdUrl: string;

  constructor(private http: HttpClient) {
    this.getAllReservationsOfShipFromTillUrl="http://localhost:8080/shipReservation/getAllReservationsOfShipFromTill";
    this.getAllReservationsOfShipUrl="http://localhost:8080/shipReservation/getAllReservationsOfShip";
    this.getAllReservationsOfOwnerUrl="http://localhost:8080/shipReservation/getAllReservationsOfOwner";
    this.addReservationByOwnerUrl="http://localhost:8080/shipReservation/addReservationByOwner";
    this.addReservationByClientUrl="http://localhost:8080/shipReservation/addReservationByClient";
    this.changeReservationByOwnerUrl="http://localhost:8080/shipReservation/changeReservationByOwner";
    this.getByIdUrl="http://localhost:8080/shipReservation/getById";
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

  public addReservationByOwner(shipReservation: ShipReservation):Observable<boolean>{
    shipReservation.report = null;
    shipReservation.penalty = null;
    return this.http.post<boolean>(this.addReservationByOwnerUrl,shipReservation,{withCredentials: true});
  }

  public addReservationByClient(shipReservation: ShipReservation) : Observable<boolean> {
    return this.http.post<boolean>(this.addReservationByClientUrl, shipReservation, {withCredentials: true});
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
}
