import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavorHotOfferService {
  private removeHotOfferUrl: string;

  constructor(private http: HttpClient) {
    this.removeHotOfferUrl = "http://localhost:8080/favorHotOffers/removeHotOffer";
   }

  public removeHotOffer(id:number ): Observable<boolean>{
    return this.http.post<boolean>(this.removeHotOfferUrl,id,{withCredentials: true});
  }
}
