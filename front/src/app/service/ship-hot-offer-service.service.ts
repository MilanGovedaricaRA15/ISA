import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShipHotOffer } from '../model/ship-hot-offer';

@Injectable({
  providedIn: 'root'
})
export class ShipHotOfferService {
  private getAllShipHotOffersUrl: string;
  private getShipHotOffersByShipIdUrl: string;
  private getFutureShipHotOffersByShipIdUrl: string;
  private getAllShipHotOffersFromBaseFromTillUrl: string;

  constructor(private http: HttpClient) {
    this.getAllShipHotOffersUrl = "http://localhost:8080/shipHotOffers/getAllShipHotOffers";
    this.getShipHotOffersByShipIdUrl = "http://localhost:8080/shipHotOffers/getShipHotOffersByShipId";
    this.getFutureShipHotOffersByShipIdUrl = "http://localhost:8080/shipHotOffers/getFutureShipHotOffersByShipId";
    this.getAllShipHotOffersFromBaseFromTillUrl = 'http://localhost:8080/shipHotOffers/getAllShipHotOffersFromBaseFromTill'
  }

  public getAllShipHotOffersFromBaseFromTill(from: Date, to: Date): Observable<Array<ShipHotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let numberFrom = from.getTime();
    let numberTo = to.getTime();
    let params = new HttpParams().set("from",numberFrom.toString()).set("to",numberTo.toString());  
    return this.http.get<Array<ShipHotOffer>>(this.getAllShipHotOffersFromBaseFromTillUrl, {headers: headers,params: params,withCredentials: true});
  }
  
  public getAllShipHotOffers() : Observable<Array<ShipHotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<ShipHotOffer>>(this.getAllShipHotOffersUrl, {headers: headers, withCredentials: true});
  }

  public getShipHotOffersByShipId(shipId: number): Observable<Array<ShipHotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("shipId", shipId);
  
    return this.http.get<Array<ShipHotOffer>>(this.getShipHotOffersByShipIdUrl, {headers: headers, params: params, withCredentials: true});
  }

  public getFutureShipHotOffersByShipId(shipId: number): Observable<Array<ShipHotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("shipId", shipId);
  
    return this.http.get<Array<ShipHotOffer>>(this.getFutureShipHotOffersByShipIdUrl, {headers: headers, params: params, withCredentials: true});
  }
}
