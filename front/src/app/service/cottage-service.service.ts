import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cottage } from '../model/cottage';

@Injectable({
  providedIn: 'root'
})
export class CottageService {
  private getAllCottagesUrl: string;
  private getAllAvailableCottagesUrl: string;
  private getCottageByIdUrl: string;
  private removeCottageImgUrl: string;
  private getAllCottagesOfOwnerUrl: string;
  private changeCottageUrl: string;
  private removeHotOfferUrl: string;
  private deleteHotOfferUrl: string;
  private uploadImgUrl: string;
  private removeCottageUrl: string;
  private addCottageUrl: string;
  private addHotOfferToCottageUrl: string;
  private checkIsReservedUrl: string;
  private searchCottagesByNameUrl: string;
  private searchCottagesByAddressUrl: string;
  private searchCottagesByCostUrl: string;
  private removeCottageByAdministratorUrl: string;
  private addSubscribedUserToCottageUrl: string;
  private removeSubscribedUserFromCottageUrl: string;
  private getUsersSubscribedCottagesUrl: string;
  private isUserSubscribedToCottageUrl: string;

  constructor(private http: HttpClient) { 
    this.getAllCottagesUrl = "http://localhost:8080/cottages/getAllCottages";
    this.getAllAvailableCottagesUrl = "http://localhost:8080/cottages/getAllAvailableCottages";
    this.getAllCottagesOfOwnerUrl = "http://localhost:8080/cottages/getAllCottagesOfOwner";
    this.removeCottageImgUrl = "http://localhost:8080/cottages/removeCottageImg";
    this.removeCottageUrl = "http://localhost:8080/cottages/removeCottage";
    this.changeCottageUrl = 'http://localhost:8080/cottages/changeCottage';
    this.uploadImgUrl = 'http://localhost:8080/cottages/uploadImg';
    this.getCottageByIdUrl = 'http://localhost:8080/cottages/getCottageById';
    this.addCottageUrl = 'http://localhost:8080/cottages/addCottage';
    this.addHotOfferToCottageUrl = 'http://localhost:8080/cottages/addHotOfferToCottage';
    this.removeHotOfferUrl = 'http://localhost:8080/cottages/removeHotOffer';
    this.deleteHotOfferUrl = 'http://localhost:8080/cottages/deleteHotOffer';
    this.checkIsReservedUrl = 'http://localhost:8080/cottages/checkIsReserved';
    this.searchCottagesByNameUrl = 'http://localhost:8080/cottages/searchCottagesByName';
    this.searchCottagesByAddressUrl = 'http://localhost:8080/cottages/searchCottagesByAddress';
    this.searchCottagesByCostUrl = 'http://localhost:8080/cottages/searchCottagesByCost';
    this.removeCottageByAdministratorUrl = 'http://localhost:8080/cottages/removeCottageByAdministrator';
    this.addSubscribedUserToCottageUrl = 'http://localhost:8080/cottages/addSubscribedUserToCottage';
    this.removeSubscribedUserFromCottageUrl = 'http://localhost:8080/cottages/removeSubscribedUserFromCottage';
    this.getUsersSubscribedCottagesUrl = 'http://localhost:8080/cottages/getUsersSubscribedCottages';
    this.isUserSubscribedToCottageUrl = 'http://localhost:8080/cottages/isUserSubscribedToCottage';
  }

  public getAllCottages(): Observable<Array<Cottage>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  
    return this.http.get<Array<Cottage>>(this.getAllCottagesUrl, {headers: headers, withCredentials: true});
  }

  public getAllAvailableCottages(from: Date, to: Date, numOfGuests: number): Observable<Array<Cottage>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let stringFrom = from.getTime().toString();
    let stringTo = to.getTime().toString();
    let params = new HttpParams().set("from", stringFrom).set("to", stringTo).set("numOfGuests", numOfGuests);  
  
    return this.http.get<Array<Cottage>>(this.getAllAvailableCottagesUrl, {headers: headers, params: params, withCredentials: true});
  }

  public addCottage(cottage: Cottage):Observable<Cottage>{
    return this.http.post<Cottage>(this.addCottageUrl,cottage,{withCredentials: true});
  }

  public upload(file:File):Observable<boolean> {
    const formData:FormData = new FormData();
    formData.append('file', file);

    return this.http.post<boolean>(this.uploadImgUrl, formData,{withCredentials: true});
  } 

  public getAllCottagesOfOwner(): Observable<Array<Cottage>> {
    let user = sessionStorage.getItem('email');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",user);
  
    return this.http.get<Array<Cottage>>(this.getAllCottagesOfOwnerUrl, {headers: headers,params: params,withCredentials: true});
  }  

  public getCottageById(id:number): Observable<Cottage> {
    let cottage = id;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("cottage",cottage);
  
    return this.http.get<Cottage>(this.getCottageByIdUrl, {headers: headers,params: params,withCredentials: true});
  }
  
  public removeCottageImg(cottageToRemove:Cottage ): Observable<any>{
    return this.http.put(this.removeCottageImgUrl,cottageToRemove,{withCredentials: true});
  }

  public removeCottage(cottageToRemove:number ): Observable<any>{
    return this.http.post(this.removeCottageUrl,cottageToRemove,{withCredentials: true});
  }

  public removeCottageByAdministrator(cottageId: number): Observable<Boolean>{
    return this.http.post<Boolean>(this.removeCottageByAdministratorUrl,cottageId,{withCredentials: true});
  }

  public changeCottage(cottageToChange:Cottage): Observable<Boolean>{
   return this.http.put<Boolean>(this.changeCottageUrl,cottageToChange,{withCredentials: true});
  }

  public removeHotOffer(cottageToChange:Cottage): Observable<Boolean>{
    return this.http.put<Boolean>(this.removeHotOfferUrl,cottageToChange,{withCredentials: true});
  }

  public deleteHotOffer(cottageToChange: Cottage): Observable<Boolean>{
    return this.http.put<Boolean>(this.deleteHotOfferUrl, cottageToChange, {withCredentials: true});
  }

  public addHotOfferToCottage(cottageToChange:Cottage): Observable<boolean>{
    return this.http.put<boolean>(this.addHotOfferToCottageUrl,cottageToChange,{withCredentials: true});
  }
  public checkIsReserved(cottageToChange:Cottage): Observable<boolean>{
    return this.http.post<boolean>(this.checkIsReservedUrl,cottageToChange,{withCredentials: true});
  }

  public searchCottagesByName(name: string): Observable<Array<Cottage>> {
    if (!name) {
      name = '';
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("name", name);
  
    return this.http.get<Array<Cottage>>(this.searchCottagesByNameUrl, {headers: headers, params: params});
  }

  public searchCottagesByAddress(address: string): Observable<Array<Cottage>> {
    if (!address) {
      address = '';
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("address", address);
  
    return this.http.get<Array<Cottage>>(this.searchCottagesByAddressUrl, {headers: headers, params: params});
  }

  public searchCottagesByCost(minCost: number, maxCost: number): Observable<Array<Cottage>> {
    if (!minCost) {
      minCost = 0;
    }
    if (!maxCost) {
      maxCost = 100000;
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("minCost", minCost).set("maxCost", maxCost);
  
    return this.http.get<Array<Cottage>>(this.searchCottagesByCostUrl, {headers: headers, params: params});
  }

  public addSubscribedUserToCottage(cottage: Cottage): Observable<boolean> {
    return this.http.post<boolean>(this.addSubscribedUserToCottageUrl, cottage, { withCredentials: true });
  }

  public removeSubscribedUserFromCottage(cottage: Cottage): Observable<boolean> {
    return this.http.put<boolean>(this.removeSubscribedUserFromCottageUrl, cottage, { withCredentials: true });
  }

  public getUsersSubscribedCottages(email: string): Observable<Array<Cottage>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email);
  
    return this.http.get<Array<Cottage>>(this.getUsersSubscribedCottagesUrl, {headers: headers, params: params, withCredentials: true});
  }

  public isUserSubscribedToCottage(email: string, cottageId: number): Observable<boolean> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email).set("cottageId", cottageId);
  
    return this.http.get<boolean>(this.isUserSubscribedToCottageUrl, {headers: headers, params: params, withCredentials: true});
  }

}
