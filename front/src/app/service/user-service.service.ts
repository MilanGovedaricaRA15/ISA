import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Role, User } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private usersUrlLogin: string;
  private usersUrlRegister: string;
  private usersUrlGetUserByEmail: string;
  private usersUrlGetLoggedUser: string;

  constructor(private http: HttpClient) {
    this.usersUrlLogin = 'http://localhost:8080/users/login';
    this.usersUrlRegister = 'http://localhost:8080/users/register';
    this.usersUrlGetLoggedUser = 'http://localhost:8080/users/getUserByEmail'
    this.usersUrlGetUserByEmail = 'http://localhost:8080/users/getUserByEmail'
  }

  public register(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrlRegister, user,{responseType: 'text' as 'json'});
  }

  public login(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrlLogin, user,{responseType: 'text' as 'json'});
  }
  

  public authenticate(email: string): void {
      sessionStorage.setItem('email', email); 
    } 

  public getUserByEmail(email: string): User {
    let params = new HttpParams().set("email",email);
    let userObject : User;
    this.http.get<User>(this.usersUrlGetUserByEmail, {params: params}).subscribe(res => userObject = res);
    return userObject;
  }
  public getLoggedUser(): User {
    let user = sessionStorage.getItem('email');
    let params = new HttpParams().set("email",user);
    let userObject: User;
    this.http.get<User>(this.usersUrlGetLoggedUser, {params: params}).subscribe(res => userObject = res);
    return userObject;
  }
  public isBoatAdvertiserLoggedIn(): boolean {
      if(this.getLoggedUser().role === Role.boatAdvertiser){
        return true;
      }
      else{
        return false;
      }
  }
  public isCottageAdvertiserLoggedIn(): boolean {
    if(this.getLoggedUser().role === Role.cottageAdvertiser){
      return true;
    }
    else{
      return false;
    }
}



}