import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private allUsersUrl: string;
  private usersUrlLogin: string;
  private usersUrlRegister: string;
  private usersUrlGetUserByEmail: string;
  private usersUrlGetLoggedUser: string;
  private usersUrlChangeUser: string;
  private usersUrlChangePasswordUser: string;
  private changeAdministratorsPassword: string;

  constructor(private http: HttpClient) {
    this.allUsersUrl = 'http://localhost:8080/users/getAllUsers';
    this.usersUrlLogin = 'http://localhost:8080/users/login';
    this.usersUrlRegister = 'http://localhost:8080/users/register';
    this.usersUrlGetLoggedUser = 'http://localhost:8080/users/getUserByEmail';
    this.usersUrlGetUserByEmail = 'http://localhost:8080/users/getUserByEmail';
    this.usersUrlChangeUser = 'http://localhost:8080/users/changeUser';
    this.usersUrlChangePasswordUser = 'http://localhost:8080/users/changePasswordUser';
    this.changeAdministratorsPassword = 'http://localhost:8080/users/changeAdministratorsPassword';
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

  public getAllUsers(): Observable<Array<User>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  
    return this.http.get<Array<User>>(this.allUsersUrl, {headers: headers});
  }
  
  public changePassword(user: User,password:string): Observable<boolean> {
    let users = new Array<User>()
    users.push(user)
    let user1 = JSON.parse(JSON.stringify(user));
    user1.password = password;
    users.push(user1)
    return this.http.put<boolean>(this.usersUrlChangePasswordUser, users);
  }

  public changeAdminsPassword(user: User) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  
    return this.http.put<string>(this.changeAdministratorsPassword, user, {headers: headers});
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
  public isAdministratorLoggedIn(): Observable<boolean> {
    return this.getLoggedUser().pipe(map(res => {
      if(res.role.toString() === 'administrator'){
        return true;
      }
      else{
        return false;
      }
    }));
  }
  public isSuperiorAdministratorLoggedIn(): Observable<boolean> {
    return this.getLoggedUser().pipe(map(res => {
      if(res.role.toString() === 'administratorSuperior'){
        return true;
      }
      else{
        return false;
      }
    }));
  }
  public isNewAdministratorLoggedIn(): Observable<boolean> {
    return this.getLoggedUser().pipe(map(res => {
      if(res.role.toString() === 'administratorFirstLogged'){
        return true;
      }
      else{
        return false;
      }
    }));
  }


}