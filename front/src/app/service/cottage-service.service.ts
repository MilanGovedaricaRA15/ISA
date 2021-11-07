import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cottage } from '../model/cottage';

@Injectable({
  providedIn: 'root'
})
export class CottageService {
  private getAllCottagesUrl: string;
  private removeCottageImgUrl: string;
  private getAllCottagesOfOwnerUrl: string;
  private changeCottageUrl: string;

  

  constructor(private http: HttpClient) { 
    this.getAllCottagesUrl="http://localhost:8080/cottages/getAllCottages";
    this.getAllCottagesOfOwnerUrl="http://localhost:8080/cottages/getAllCottagesOfOwner";
    this.removeCottageImgUrl="http://localhost:8080/cottages/removeCottageImg";
    this.changeCottageUrl='http://localhost:8080/cottages/changeCottage';
  }

  public getAllCottages(): Observable<Array<Cottage>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  
    return this.http.get<Array<Cottage>>(this.getAllCottagesUrl, {headers: headers});
  }

  public getAllCottagesOfOwner(): Observable<Array<Cottage>> {
    let user = sessionStorage.getItem('email');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",user);
  
    return this.http.get<Array<Cottage>>(this.getAllCottagesOfOwnerUrl, {headers: headers,params: params});
  }
  
  public removeCottageImg(cottageToRemove:Cottage ): Observable<any>{
    return this.http.put(this.removeCottageImgUrl,cottageToRemove);
  }

  public changeCottage(cottageToChange:Cottage): Observable<any>{
   return this.http.put(this.changeCottageUrl,cottageToChange);
  }


}
