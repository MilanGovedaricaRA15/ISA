import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotOffer } from '../model/hot-offer';

@Injectable({
  providedIn: 'root'
})
export class HotOfferService {
  private addHotOfferUrl: string;
  private removeHotOfferUrl: string;

  constructor(private http: HttpClient) { 
    this.addHotOfferUrl = "http://localhost:8080/hotOffers/saveHotOffer";
    this.removeHotOfferUrl = "http://localhost:8080/hotOffers/removeHotOffer";
  }

  public saveHotOffer(hotOffer:HotOffer ): Observable<any>{
    return this.http.post(this.addHotOfferUrl,hotOffer,{withCredentials: true});
  }
  public removeHotOffer(id:number ): Observable<boolean>{
    return this.http.post<boolean>(this.removeHotOfferUrl,id,{withCredentials: true});
  }
}
