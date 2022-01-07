import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstructorsFavor } from '../model/instructors-favor';


@Injectable({
  providedIn: 'root'
})
export class InstructorsFavorService {
  
  getAllFavorsUrl: string;
  deleteFavorUrl: string;
  getFavorByIdUrl: string;
  checkIsReservedUrl: string;
  changeFavorUrl: string;
  removeFavorImgUrl: string;
  uploadImgUrl: string;

  constructor(private http: HttpClient) {
    this.getAllFavorsUrl = 'http://localhost:8080/favors/getAllFavors';
    this.deleteFavorUrl = 'http://localhost:8080/favors/deleteFavor';
    this.getFavorByIdUrl = 'http://localhost:8080/favors/getFavorById';
    this.checkIsReservedUrl = 'http://localhost:8080/favors/checkIsReserved';
    this.changeFavorUrl='http://localhost:8080/favors/changeFavor';
    this.removeFavorImgUrl="http://localhost:8080/favors/removeFavorImg";
    this.uploadImgUrl='http://localhost:8080/favors/uploadImg';
  }

  public getAllFavors(): Observable<Array<InstructorsFavor>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<InstructorsFavor>>(this.getAllFavorsUrl, {headers: headers});
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
}