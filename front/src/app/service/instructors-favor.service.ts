import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstructorsFavor } from '../model/instructors-favor';


@Injectable({
  providedIn: 'root'
})
export class InstructorsFavorService {
  
  getAllFavorsUrl: string;
  deleteFavorUrl: string;

  constructor(private http: HttpClient) {
    this.getAllFavorsUrl = 'http://localhost:8080/favors/getAllFavors';
    this.deleteFavorUrl = 'http://localhost:8080/favors/deleteFavor'
  }

  public getAllFavors(): Observable<Array<InstructorsFavor>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<InstructorsFavor>>(this.getAllFavorsUrl, {headers: headers});
  }

  public deleteFavor(id:number): Observable<boolean> {
    return this.http.post<boolean>(this.deleteFavorUrl,id);
  }
}
