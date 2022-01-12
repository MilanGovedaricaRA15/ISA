import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from '../model/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private getAllGradesUrl: string;
  private acceptGradeUrl: string;
  private deleteGradeUrl: string;

  constructor(private http: HttpClient) { 
    this.getAllGradesUrl = 'http://localhost:8080//grades/getAllGrades';
    this.acceptGradeUrl = 'http://localhost:8080//grades/acceptGrade';
    this.deleteGradeUrl = 'http://localhost:8080//grades/deleteGrade';
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
}
