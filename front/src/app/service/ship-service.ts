import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ship } from "../model/ship";

@Injectable({
    providedIn: 'root'
})
export class ShipService {
  private getAllShipsUrl: string;
  private getAllAvailableShipsUrl: string;
  private getShipByIdUrl: string;
  private searchShipsByNameUrl: string;
  private getShipAverageGradeUrl: string;
  private removeShipImgUrl: string;
  private getAllShipsOfOwnerUrl: string;
  private changeShipUrl: string;
  private removeShipHotOfferUrl: string;
  private deleteShipHotOfferUrl: string;
  private uploadImgUrl: string;
  private removeShipUrl: string;
  private addShipUrl: string;
  private addShipHotOfferToShipUrl: string;
  private checkIsReservedUrl: string;
  private removeShipByAdministratorUrl: string;
  private addSubscribedUserToShipUrl: string;
  private removeSubscribedUserFromShipUrl: string;
  private getUsersSubscribedShipsUrl: string;
  private isUserSubscribedToShipUrl: string;

  constructor(private http: HttpClient) { 
    this.getAllShipsUrl = "http://localhost:8080/ships/getAllShips";
    this.getAllAvailableShipsUrl = "http://localhost:8080/ships/getAllAvailableShips";
    this.getShipByIdUrl = 'http://localhost:8080/ships/getShipById';
    this.searchShipsByNameUrl = 'http://localhost:8080/ships/searchShipsByName';
    this.getShipAverageGradeUrl = 'http://localhost:8080/ships/getShipAverageGrade';
    this.removeShipImgUrl = 'http://localhost:8080/ships/removeShipImg';
    this.getAllShipsOfOwnerUrl = 'http://localhost:8080/ships/getAllShipsOfOwner';
    this.changeShipUrl = 'http://localhost:8080/ships/changeShip';
    this.removeShipHotOfferUrl = 'http://localhost:8080/ships/removeHotOffer';
    this.deleteShipHotOfferUrl = 'http://localhost:8080/ships/deleteShipHotOffer';
    this.uploadImgUrl = 'http://localhost:8080/ships/uploadImg';
    this.removeShipUrl = 'http://localhost:8080/ships/removeShip';
    this.addShipUrl = 'http://localhost:8080/ships/addShip';
    this.addShipHotOfferToShipUrl = 'http://localhost:8080/ships/addHotOfferToShip';
    this.checkIsReservedUrl = 'http://localhost:8080/ships/checkIsReserved';
    this.removeShipByAdministratorUrl = 'http://localhost:8080/ships/removeShipByAdministrator';
    this.addSubscribedUserToShipUrl = 'http://localhost:8080/ships/addSubscribedUserToShip';
    this.removeSubscribedUserFromShipUrl = 'http://localhost:8080/ships/removeSubscribedUserFromShip';
    this.getUsersSubscribedShipsUrl = 'http://localhost:8080/ships/getUsersSubscribedShips';
    this.isUserSubscribedToShipUrl = 'http://localhost:8080/ships/isUserSubscribedToShip';
  }

  public getAllShips(): Observable<Array<Ship>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<Ship>>(this.getAllShipsUrl, {headers: headers});
  }

  public getAllAvailableShips(from: Date, to: Date, numOfGuests: number): Observable<Array<Ship>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let stringFrom = from.getTime().toString();
    let stringTo = to.getTime().toString();
    let params = new HttpParams().set("from", stringFrom).set("to", stringTo).set("numOfGuests", numOfGuests);  

    return this.http.get<Array<Ship>>(this.getAllAvailableShipsUrl, {headers: headers, params: params});
  }

  public getShipById(id: number): Observable<Ship> {
    let ship = id;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("ship", ship);

    return this.http.get<Ship>(this.getShipByIdUrl, {headers: headers, params: params});
  }

  public searchShipsByName(name: string): Observable<Array<Ship>> {
    let ship = name;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("name", ship);

    return this.http.get<Array<Ship>>(this.searchShipsByNameUrl, {headers: headers, params: params});
  }

  public getShipAverageGrade(id: number): Observable<number> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("id", id);

    return this.http.get<number>(this.getShipAverageGradeUrl, {headers: headers, params: params});
  }

  public addShip(ship: Ship):Observable<Ship>{
    return this.http.post<Ship>(this.addShipUrl,ship,{withCredentials: true});
  }
  
  public upload(file:File):Observable<boolean> {
    const formData:FormData = new FormData();

    formData.append('file', file);

    return this.http.post<boolean>(this.uploadImgUrl, formData,{withCredentials: true});
  } 
  
  public getAllShipsOfOwner(): Observable<Array<Ship>> {
    let user = sessionStorage.getItem('email');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",user);
  
    return this.http.get<Array<Ship>>(this.getAllShipsOfOwnerUrl, {headers: headers,params: params,withCredentials: true});
  }
    
  public removeShipImg(shipToRemove:Ship ): Observable<any>{
    return this.http.put(this.removeShipImgUrl,shipToRemove,{withCredentials: true});
  }

  public removeShip(shipToRemove:number ): Observable<any>{
    return this.http.post(this.removeShipUrl,shipToRemove,{withCredentials: true});
  }

  public removeShipByAdministrator(shipId: number): Observable<Boolean>{
    return this.http.post<Boolean>(this.removeShipByAdministratorUrl,shipId,{withCredentials: true});
  }
  
  public changeShip(shipToChange:Ship): Observable<Boolean>{
    return this.http.put<Boolean>(this.changeShipUrl,shipToChange,{withCredentials: true});
  }
  
  public removeShipHotOffer(shipToChange:Ship): Observable<Boolean>{
    return this.http.put<Boolean>(this.removeShipHotOfferUrl,shipToChange,{withCredentials: true});
  }

  public deleteShipHotOffer(shipToChange: Ship): Observable<Boolean>{
    return this.http.put<Boolean>(this.deleteShipHotOfferUrl, shipToChange, {withCredentials: true});
  }
  
  public addShipHotOfferToShip(shipToChange:Ship): Observable<boolean>{
    return this.http.put<boolean>(this.addShipHotOfferToShipUrl,shipToChange,{withCredentials: true});
  }

  public checkIsReserved(shipToChange:Ship): Observable<boolean>{
    return this.http.post<boolean>(this.checkIsReservedUrl,shipToChange,{withCredentials: true});
  }
  
  public addSubscribedUserToShip(ship: Ship): Observable<boolean> {
    return this.http.post<boolean>(this.addSubscribedUserToShipUrl, ship, { withCredentials: true });
  }

  public removeSubscribedUserFromShip(ship: Ship): Observable<boolean> {
    return this.http.put<boolean>(this.removeSubscribedUserFromShipUrl, ship, { withCredentials: true });
  }

  public getUsersSubscribedShips(email: string): Observable<Array<Ship>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email);
  
    return this.http.get<Array<Ship>>(this.getUsersSubscribedShipsUrl, {headers: headers, params: params, withCredentials: true});
  }

  public isUserSubscribedToShip(email: string, shipId: number): Observable<boolean> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email).set("shipId", shipId);
  
    return this.http.get<boolean>(this.isUserSubscribedToShipUrl, {headers: headers, params: params, withCredentials: true});
  }
  
}
