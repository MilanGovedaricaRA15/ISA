import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavorHotOffer } from '../model/favor-hot-offer';

@Injectable({
  providedIn: 'root'
})
export class FavorHotOfferService {
  private removeHotOfferUrl: string;
  private getAllFavorHotOffersUrl: string;
  private getFavorHotOffersByFavorIdUrl: string;
  private getFutureFavorHotOffersByFavorIdUrl: string;

  constructor(private http: HttpClient) {
    this.removeHotOfferUrl = environment.baseUrl+"favorHotOffers/removeHotOffer";
    this.getAllFavorHotOffersUrl = environment.baseUrl+"favorHotOffers/getAllFavorHotOffers";
    this.getFavorHotOffersByFavorIdUrl = environment.baseUrl+"favorHotOffers/getFavorHotOffersByFavorId";
    this.getFutureFavorHotOffersByFavorIdUrl = environment.baseUrl+"favorHotOffers/getFutureFavorHotOffersByFavorId";
  }

  public removeHotOffer(id:number ): Observable<boolean>{
    return this.http.post<boolean>(this.removeHotOfferUrl,id,{withCredentials: true});
  }

  public getAllFavorHotOffers() : Observable<Array<FavorHotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<FavorHotOffer>>(this.getAllFavorHotOffersUrl, {headers: headers, withCredentials: true});
  }

  public getFavorHotOffersByFavorId(favorId: number): Observable<Array<FavorHotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("favorId", favorId);
  
    return this.http.get<Array<FavorHotOffer>>(this.getFavorHotOffersByFavorIdUrl, {headers: headers, params: params, withCredentials: true});
  }

  public getFutureFavorHotOffersByFavorId(favorId: number): Observable<Array<FavorHotOffer>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("favorId", favorId);
  
    return this.http.get<Array<FavorHotOffer>>(this.getFutureFavorHotOffersByFavorIdUrl, {headers: headers, params: params, withCredentials: true});
  }
}
