import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotOffer } from '../model/hot-offer';

@Injectable({
  providedIn: 'root'
})
export class HotOfferService {
  private addHotOfferUrl: string;

  constructor(private http: HttpClient) { 
    this.addHotOfferUrl = "http://localhost:8080/hotOffers/saveHotOffer";
  }

  public saveHotOffer(hotOffer:HotOffer ): Observable<any>{
    return this.http.post(this.addHotOfferUrl,hotOffer);
  }
}
