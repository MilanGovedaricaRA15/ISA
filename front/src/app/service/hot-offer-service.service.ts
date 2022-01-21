import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  constructor(private http: HttpClient) { 
    this.addHotOfferUrl = environment.baseUrl+"hotOffers/saveHotOffer";
    this.removeHotOfferUrl = environment.baseUrl+"hotOffers/removeHotOffer";
    this.getAllHotOffersUrl = environment.baseUrl+"hotOffers/getAllHotOffers";
    this.getHotOffersByCottageIdUrl = environment.baseUrl+"hotOffers/getHotOffersByCottageId";
    this.getFutureHotOffersByCottageIdUrl = environment.baseUrl+"hotOffers/getFutureHotOffersByCottageId";
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
