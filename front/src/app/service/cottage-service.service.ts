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
  private uploadImgUrl: string;
  private removeCottageUrl: string;
  private addCottageUrl: string;
  private addHotOfferToCottageUrl: string;
  private searchCottagesByNameUrl: string;
  

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
    this.searchCottagesByNameUrl = 'http://localhost:8080/cottages/searchCottagesByName';
  }

  public getAllCottages(): Observable<Array<Cottage>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  
    return this.http.get<Array<Cottage>>(this.getAllCottagesUrl, {headers: headers});
  }

  public addCottage(cottage: Cottage):Observable<Cottage>{
    return this.http.post<Cottage>(this.addCottageUrl,cottage);
  }

  public upload(file:File):Observable<boolean> {
    const formData:FormData = new FormData();

     formData.append('file', file);

    return this.http.post<boolean>(this.uploadImgUrl, formData);
    } 

  public getAllCottagesOfOwner(): Observable<Array<Cottage>> {
    let user = sessionStorage.getItem('email');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",user);
  
    return this.http.get<Array<Cottage>>(this.getAllCottagesOfOwnerUrl, {headers: headers,params: params});
  }

  

  public getCottageById(id:number): Observable<Cottage> {
    let cottage = id;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("cottage",cottage);
  
    return this.http.get<Cottage>(this.getCottageByIdUrl, {headers: headers,params: params});
  }
  
  public removeCottageImg(cottageToRemove:Cottage ): Observable<any>{
    return this.http.put(this.removeCottageImgUrl,cottageToRemove);
  }

  public removeCottage(cottageToRemove:number ): Observable<any>{
    return this.http.post(this.removeCottageUrl,cottageToRemove);
  }

  public changeCottage(cottageToChange:Cottage): Observable<any>{
   return this.http.put(this.changeCottageUrl,cottageToChange);
  }

  public addHotOfferToCottage(cottageToChange:Cottage): Observable<boolean>{
    return this.http.put<boolean>(this.addHotOfferToCottageUrl,cottageToChange);
   }

   public searchCottagesByName(name: string): Observable<Array<Cottage>> {
    let cottage = name;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("name", cottage);
  
    return this.http.get<Array<Cottage>>(this.searchCottagesByNameUrl, {headers: headers, params: params});
  }

}
