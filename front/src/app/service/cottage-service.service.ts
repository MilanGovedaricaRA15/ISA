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
  private getCottageByIdUrl: string;
  private removeCottageImgUrl: string;
  private getAllCottagesOfOwnerUrl: string;
  private changeCottageUrl: string;
  private removeHotOfferUrl: string;
  private uploadImgUrl: string;
  private removeCottageUrl: string;
  private addCottageUrl: string;
  private addHotOfferToCottageUrl: string;
  private checkIsReservedUrl: string;

  

  constructor(private http: HttpClient) { 
    this.getAllCottagesUrl="http://localhost:8080/cottages/getAllCottages";
    this.getAllCottagesOfOwnerUrl="http://localhost:8080/cottages/getAllCottagesOfOwner";
    this.removeCottageImgUrl="http://localhost:8080/cottages/removeCottageImg";
    this.removeCottageUrl="http://localhost:8080/cottages/removeCottage";
    this.changeCottageUrl='http://localhost:8080/cottages/changeCottage';
    this.uploadImgUrl='http://localhost:8080/cottages/uploadImg';
    this.getCottageByIdUrl = 'http://localhost:8080/cottages/getCottageById';
    this.addCottageUrl = 'http://localhost:8080/cottages/addCottage';
    this.addHotOfferToCottageUrl = 'http://localhost:8080/cottages/addHotOfferToCottage';
    this.removeHotOfferUrl = 'http://localhost:8080/cottages/removeHotOffer';
    this.checkIsReservedUrl = 'http://localhost:8080/cottages/checkIsReserved';
  }

  public getAllCottages(): Observable<Array<Cottage>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  
    return this.http.get<Array<Cottage>>(this.getAllCottagesUrl, {headers: headers,withCredentials: true});
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

  public changeCottage(cottageToChange:Cottage): Observable<Boolean>{
   return this.http.put<Boolean>(this.changeCottageUrl,cottageToChange,{withCredentials: true});
  }

  public removeHotOffer(cottageToChange:Cottage): Observable<Boolean>{
    return this.http.put<Boolean>(this.removeHotOfferUrl,cottageToChange,{withCredentials: true});
   }

  public addHotOfferToCottage(cottageToChange:Cottage): Observable<boolean>{
    return this.http.put<boolean>(this.addHotOfferToCottageUrl,cottageToChange,{withCredentials: true});
   }
  public checkIsReserved(cottageToChange:Cottage): Observable<boolean>{
    return this.http.post<boolean>(this.checkIsReservedUrl,cottageToChange,{withCredentials: true});
   }

}
