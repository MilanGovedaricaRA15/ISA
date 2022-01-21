import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShipHotOffer } from '../model/ship-hot-offer';

@Injectable({
  providedIn: 'root'
})
export class ShipHotOfferService {
  private getAllShipHotOffersUrl: string;
  private getShipHotOffersByShipIdUrl: string;
  private getFutureShipHotOffersByShipIdUrl: string;

  constructor(private http: HttpClient) {
    this.getAllShipHotOffersUrl = environment.baseUrl+"shipHotOffers/getAllShipHotOffers";
    this.getShipHotOffersByShipIdUrl = environment.baseUrl+"shipHotOffers/getShipHotOffersByShipId";
    this.getFutureShipHotOffersByShipIdUrl = environment.baseUrl+"shipHotOffers/getFutureShipHotOffersByShipId";
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
