import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cottage } from '../model/cottage';
import { Grade } from '../model/grade';
import { Ship } from '../model/ship';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private getAllGradesUrl: string;
  private acceptGradeUrl: string;
  private deleteGradeUrl: string;
  private addGradeToCottageUrl: string;
  private addGradeToShipUrl: string;
  private addGradeToUserUrl: string;

  constructor(private http: HttpClient) { 
    this.getAllGradesUrl = environment.baseUrl+'/grades/getAllGrades';
    this.acceptGradeUrl = environment.baseUrl+'/grades/acceptGrade';
    this.deleteGradeUrl = environment.baseUrl+'/grades/deleteGrade';
    this.addGradeToCottageUrl = environment.baseUrl+'/grades/addGradeToCottage';
    this.addGradeToShipUrl = environment.baseUrl+'/grades/addGradeToShip';
    this.addGradeToUserUrl = environment.baseUrl+'/grades/addGradeToUser';
  }

  public getAllGrades(): Observable<Array<Grade>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.http.get<Array<Grade>>(this.getAllGradesUrl, {headers: headers});
  }

  public acceptGrade(id:number): Observable<boolean> {
    return this.http.post<boolean>(this.acceptGradeUrl,id);
  }

  public removeGrade(id:number): Observable<boolean>{
    return this.http.post<boolean>(this.deleteGradeUrl,id);
  }

  public addGradeToCottage(cottage: Cottage): Observable<boolean> {
    return this.http.post<boolean>(this.addGradeToCottageUrl, cottage, {withCredentials: true});
  }

  public addGradeToShip(ship: Ship): Observable<boolean> {
    return this.http.post<boolean>(this.addGradeToShipUrl, ship, {withCredentials: true});
  }

  public addGradeToUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(this.addGradeToUserUrl, user, {withCredentials: true});
  }
}
