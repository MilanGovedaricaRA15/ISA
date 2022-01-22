import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstructorsFavor } from '../model/instructors-favor';


@Injectable({
  providedIn: 'root'
})
export class InstructorsFavorService {
  
  getAllFavorsUrl: string;
  getAllAvailableFavorsUrl: string;
  deleteFavorUrl: string;
  getFavorByIdUrl: string;
  checkIsReservedUrl: string;
  changeFavorUrl: string;
  removeFavorImgUrl: string;
  uploadImgUrl: string;
  addHotOfferToFavorUrl: string;
  addFavorUrl: string;
  getAllFavorsOfInstructorUrl: string;
  getAllFavorsByInstructorsEmailUrl: string;
  deleteFavorHotOfferUrl: string;
  searchInstructorsFavorsByNameUrl: string;
  searchInstructorsFavorsByAddressUrl: string;

  constructor(private http: HttpClient) {
    this.getAllFavorsUrl = 'http://localhost:8080/favors/getAllFavors';
    this.getAllAvailableFavorsUrl = 'http://localhost:8080/favors/getAllAvailableFavors';
    this.deleteFavorUrl = 'http://localhost:8080/favors/deleteFavor';
    this.getFavorByIdUrl = 'http://localhost:8080/favors/getFavorById';
    this.checkIsReservedUrl = 'http://localhost:8080/favors/checkIsReserved';
    this.changeFavorUrl='http://localhost:8080/favors/changeFavor';
    this.removeFavorImgUrl="http://localhost:8080/favors/removeFavorImg";
    this.uploadImgUrl='http://localhost:8080/favors/uploadImg';
    this.addHotOfferToFavorUrl = 'http://localhost:8080/favors/addHotOfferToFavor';
    this.addFavorUrl = 'http://localhost:8080/favors/addFavor';
    this.getAllFavorsOfInstructorUrl = 'http://localhost:8080/favors/getAllFavorsOfInstructor';
    this.getAllFavorsByInstructorsEmailUrl = 'http://localhost:8080/favors/getAllFavorsByInstructorsEmail';
    this.deleteFavorHotOfferUrl = 'http://localhost:8080/favors/deleteFavorHotOffer';
    this.searchInstructorsFavorsByNameUrl = 'http://localhost:8080/favors/searchInstructorsFavorsByName';
    this.searchInstructorsFavorsByAddressUrl = 'http://localhost:8080/favors/searchInstructorsFavorsByAddress';
  }

  public getAllFavors(): Observable<Array<InstructorsFavor>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<InstructorsFavor>>(this.getAllFavorsUrl, {headers: headers});
  }

  public getAllAvailableFavors(from: Date, to: Date, numOfGuests: number): Observable<Array<InstructorsFavor>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let stringFrom = from.getTime().toString();
    let stringTo = to.getTime().toString();
    let params = new HttpParams().set("from", stringFrom).set("to", stringTo).set("numOfGuests", numOfGuests);  

    return this.http.get<Array<InstructorsFavor>>(this.getAllAvailableFavorsUrl, {headers: headers, params: params});
  }

  public deleteFavor(id:number): Observable<boolean> {
    return this.http.post<boolean>(this.deleteFavorUrl,id);
  }

  public upload(file:File):Observable<boolean> {
    const formData:FormData = new FormData();

     formData.append('file', file);

    return this.http.post<boolean>(this.uploadImgUrl, formData,{withCredentials: true});
    } 

  public getFavorById(id:number): Observable<InstructorsFavor> {
    let favor = id;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("favor",favor);
  
    return this.http.get<InstructorsFavor>(this.getFavorByIdUrl, {headers: headers,params: params,withCredentials: true});
  }

  public checkIsReserved(favorToChange:InstructorsFavor): Observable<boolean>{
    return this.http.post<boolean>(this.checkIsReservedUrl,favorToChange,{withCredentials: true});
   }

   public changeFavor(favorToChange:InstructorsFavor): Observable<Boolean>{
    return this.http.put<Boolean>(this.changeFavorUrl,favorToChange,{withCredentials: true});
   }

   public removeFavorImg(favorToRemove: InstructorsFavor): Observable<any>{
    return this.http.put(this.removeFavorImgUrl,favorToRemove,{withCredentials: true});
   }

   public addHotOfferToFavor(favorToChange:InstructorsFavor): Observable<boolean>{
    return this.http.put<boolean>(this.addHotOfferToFavorUrl,favorToChange,{withCredentials: true});
   }

   public addFavor(favor: InstructorsFavor):Observable<InstructorsFavor>{
    return this.http.post<InstructorsFavor>(this.addFavorUrl,favor,{withCredentials: true});
  }

   public getAllFavorsOfInstructor(): Observable<Array<InstructorsFavor>> {
    let user = sessionStorage.getItem('email');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",user);
  
    return this.http.get<Array<InstructorsFavor>>(this.getAllFavorsOfInstructorUrl, {headers: headers,params: params,withCredentials: true});
  }

  public getAllFavorsByInstructorsEmail(email: string): Observable<Array<InstructorsFavor>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email);
  
    return this.http.get<Array<InstructorsFavor>>(this.getAllFavorsByInstructorsEmailUrl, {headers: headers, params: params, withCredentials: true});
  }

  public deleteFavorHotOffer(favorToChange: InstructorsFavor): Observable<Boolean>{
    return this.http.put<Boolean>(this.deleteFavorHotOfferUrl, favorToChange, {withCredentials: true});
  }

  public searchInstructorsFavorsByName(email: string, name: string): Observable<Array<InstructorsFavor>> {
    if (!name) {
      name = '';
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email).set("name", name);
  
    return this.http.get<Array<InstructorsFavor>>(this.searchInstructorsFavorsByNameUrl, {headers: headers, params: params});
  }

  public searchInstructorsFavorsByAddress(email: string, address: string): Observable<Array<InstructorsFavor>> {
    if (!address) {
      address = '';
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email).set("address", address);
  
    return this.http.get<Array<InstructorsFavor>>(this.searchInstructorsFavorsByAddressUrl, {headers: headers, params: params});
  }
}
