import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Administrator } from '../model/administrator';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  private administratorsUrlLogin: string;
  private administratorsUrlRegister: string;
  private administratorsUrlChangeAdministrator: string;
  private administratorsUrlChangePasswordAdministrator: string;

  constructor(private http: HttpClient) {
      this.administratorsUrlLogin = 'http://localhost:8080/administrators/login';
      this.administratorsUrlRegister = 'http://localhost:8080/administrators/register';
      this.administratorsUrlChangeAdministrator = 'http://localhost:8080/administrators/changeAdministrator';
      this.administratorsUrlChangePasswordAdministrator = 'http://localhost:8080/administrators/changePasswordAdministrator';
    }

    public register(administrator: Administrator): Observable<string> {
      return this.http.post<string>(this.administratorsUrlRegister, administrator,{responseType: 'text' as 'json'});
    }
  
    public login(administrator: Administrator): Observable<string> {
      return this.http.post<string>(this.administratorsUrlLogin, administrator,{responseType: 'text' as 'json'});
    }
  
    public change(administrator: Administrator): Observable<boolean> {
      return this.http.put<boolean>(this.administratorsUrlChangeAdministrator, administrator);
    }
    
    
    public changePassword(administrator: Administrator,password:string): Observable<boolean> {
      let administrators = new Array<Administrator>()
      administrators.push(administrator)
      let administrator1 = JSON.parse(JSON.stringify(administrator));
      administrator1.password = password;
      administrators.push(administrator1)
      return this.http.put<boolean>(this.administratorsUrlChangePasswordAdministrator, administrators);
    }

    // public getLoggedUser(): Observable<Administrator> {
    //   //let user = sessionStorage.getItem('email');
    //   let headers = new HttpHeaders();
    //   headers.append('Content-Type', 'application/json');
    //   let params = new HttpParams().set("email",user);
    //   return this.http.get<Administrator>(this.usersUrlGetLoggedUser, {headers: headers, params: params});
    // }
}
