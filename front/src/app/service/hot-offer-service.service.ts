import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotOffer } from '../model/hot-offer';

@Injectable({
  providedIn: 'root'
})
export class HotOfferService {
  private addHotOfferUrl: string;
  private removeHotOfferUrl: string;
  private getAllHotOffersUrl: string;
  private getHotOffersByCottageIdUrl: string;
  private getFutureHotOffersByCottageIdUrl: string;
  private getAllHotOffersFromBaseFromTillUrl: string;

  constructor(private http: HttpClient) { 
    this.addHotOfferUrl = "http://localhost:8080/hotOffers/saveHotOffer";
    this.removeHotOfferUrl = "http://localhost:8080/hotOffers/removeHotOffer";
    this.getAllHotOffersUrl = "http://localhost:8080/hotOffers/getAllHotOffers";
    this.getHotOffersByCottageIdUrl = "http://localhost:8080/hotOffers/getHotOffersByCottageId";
    this.getFutureHotOffersByCottageIdUrl = "http://localhost:8080/hotOffers/getFutureHotOffersByCottageId";
    this.getAllHotOffersFromBaseFromTillUrl = 'http://localhost:8080/hotOffers/getAllHotOffersFromBaseFromTill'
  }

  public getAllHotOffersFromBaseFromTill(from: Date, to: Date): Observable<Array<HotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let numberFrom = from.getTime();
    let numberTo = to.getTime();
    let params = new HttpParams().set("from",numberFrom.toString()).set("to",numberTo.toString());  
    return this.http.get<Array<HotOffer>>(this.getAllHotOffersFromBaseFromTillUrl, {headers: headers,params: params,withCredentials: true});
  }

  public saveHotOffer(hotOffer:HotOffer ): Observable<any>{
    return this.http.post(this.addHotOfferUrl,hotOffer,{withCredentials: true});
  }

  public removeHotOffer(id:number ): Observable<boolean>{
    return this.http.post<boolean>(this.removeHotOfferUrl,id,{withCredentials: true});
  }

  public getAllHotOffers() : Observable<Array<HotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<HotOffer>>(this.getAllHotOffersUrl, {headers: headers, withCredentials: true});
  }

  public getHotOffersByCottageId(cottageId: number): Observable<Array<HotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("cottageId", cottageId);
  
    return this.http.get<Array<HotOffer>>(this.getHotOffersByCottageIdUrl, {headers: headers, params: params, withCredentials: true});
  }

  public getFutureHotOffersByCottageId(cottageId: number): Observable<Array<HotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("cottageId", cottageId);
  
    return this.http.get<Array<HotOffer>>(this.getFutureHotOffersByCottageIdUrl, {headers: headers, params: params, withCredentials: true});
  }
}
