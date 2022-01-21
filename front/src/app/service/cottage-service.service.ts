import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
  private removeCottageByAdministratorUrl: string;

  constructor(private http: HttpClient) { 
    this.getAllCottagesUrl = environment.baseUrl+"cottages/getAllCottages";
    this.getAllAvailableCottagesUrl = environment.baseUrl+"cottages/getAllAvailableCottages";
    this.getAllCottagesOfOwnerUrl = environment.baseUrl+"cottages/getAllCottagesOfOwner";
    this.removeCottageImgUrl = environment.baseUrl+"cottages/removeCottageImg";
    this.removeCottageUrl = environment.baseUrl+"cottages/removeCottage";
    this.changeCottageUrl = environment.baseUrl+'cottages/changeCottage';
    this.uploadImgUrl = environment.baseUrl+'cottages/uploadImg';
    this.getCottageByIdUrl = environment.baseUrl+'cottages/getCottageById';
    this.addCottageUrl = environment.baseUrl+'cottages/addCottage';
    this.addHotOfferToCottageUrl = environment.baseUrl+'cottages/addHotOfferToCottage';
    this.removeHotOfferUrl = environment.baseUrl+'cottages/removeHotOffer';
    this.deleteHotOfferUrl = environment.baseUrl+'cottages/deleteHotOffer';
    this.checkIsReservedUrl = environment.baseUrl+'cottages/checkIsReserved';
    this.searchCottagesByNameUrl = environment.baseUrl+'cottages/searchCottagesByName';
    this.removeCottageByAdministratorUrl = environment.baseUrl+'cottages/removeCottageByAdministrator';
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
    let cottage = name;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("name", cottage);
  
    return this.http.get<Array<Cottage>>(this.searchCottagesByNameUrl, {headers: headers, params: params});
  }

}
