import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private usersUrlLogin: string;
  private usersUrlRegister: string;
  private usersUrlGetUserByEmail: string;
  private usersUrlGetLoggedUser: string;
  private usersUrlChangeUser: string;
  private usersUrlChangePasswordUser: string;

  constructor(private http: HttpClient) {
    this.usersUrlLogin = 'http://localhost:8080/users/login';
    this.usersUrlRegister = 'http://localhost:8080/users/register';
    this.usersUrlGetLoggedUser = 'http://localhost:8080/users/getUserByEmail';
    this.usersUrlGetUserByEmail = 'http://localhost:8080/users/getUserByEmail';
    this.usersUrlChangeUser = 'http://localhost:8080/users/changeUser';
    this.usersUrlChangePasswordUser = 'http://localhost:8080/users/changePasswordUser';
  }

  public register(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrlRegister, user,{responseType: 'text' as 'json'});
  }

  public login(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrlLogin, user,{responseType: 'text' as 'json'});
  }

  public change(user: User): Observable<boolean> {
    return this.http.put<boolean>(this.usersUrlChangeUser, user);
  }

  
  
  public changePassword(user: User): Observable<boolean> {
    return this.http.put<boolean>(this.usersUrlChangePasswordUser, user);
  }
  

  public authenticate(email: string): void {
      sessionStorage.setItem('email', email); 
    } 

  public getUserByEmail(email: string): Observable<User> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",email);
    return this.http.get<User>(this.usersUrlGetUserByEmail, {headers: headers, params: params});
  }
 public getLoggedUser(): Observable<User> {
    let user = sessionStorage.getItem('email');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",user);
    return this.http.get<User>(this.usersUrlGetLoggedUser, {headers: headers, params: params});
  }
 public isBoatAdvertiserLoggedIn(): Observable<boolean> {
      return this.getLoggedUser().pipe(map(res => {
      if(res.role.toString() === 'boatAdvertiser'){
          return true;
        }
        else{
          return false;
        }
      }));
  }
 public isCottageAdvertiserLoggedIn(): Observable<boolean> {
    return this.getLoggedUser().pipe(map(res => {
      if(res.role.toString() === 'cottageAdvertiser'){
        return true;
      }
      else{
        return false;
      }
    }));
   
}



}