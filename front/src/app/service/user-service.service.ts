import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private getAllUsersUrl: string;
  private getAllInstructorsUrl: string;
  private usersUrlLogin: string;
  private usersUrlRegister: string;
  private usersUrlGetUserByEmail: string;
  private getInstructorByEmailUrl : string;
  private usersUrlGetLoggedUser: string;
  private usersUrlChangeUser: string;
  private usersUrlChangePasswordUser: string;
  private searchInstructorssByNameUrl: string;

  constructor(private http: HttpClient) {
    this.getAllUsersUrl = 'http://localhost:8080/users/getAllUsers';
    this.getAllInstructorsUrl = 'http://localhost:8080/users/getAllInstructors';
    this.usersUrlLogin = 'http://localhost:8080/users/login';
    this.usersUrlRegister = 'http://localhost:8080/users/register';
    this.usersUrlGetLoggedUser = 'http://localhost:8080/users/getUserByEmail';
    this.usersUrlGetUserByEmail = 'http://localhost:8080/users/getUserByEmail';
    this.getInstructorByEmailUrl = 'http://localhost:8080/users/getInstructorByEmail';
    this.usersUrlChangeUser = 'http://localhost:8080/users/changeUser';
    this.usersUrlChangePasswordUser = 'http://localhost:8080/users/changePasswordUser';
    this.searchInstructorssByNameUrl = 'http://localhost:8080/users/searchInstructorsByName';
  }

  public getAllUsers(): Observable<Array<User>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<User>>(this.getAllUsersUrl, {headers: headers});
  }

  public getAllInstructors(): Observable<Array<User>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<User>>(this.getAllInstructorsUrl, {headers: headers});
  }

  public register(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrlRegister, user,{responseType: 'text' as 'json',withCredentials: true});
  }

  public login(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrlLogin, user,{responseType: 'text' as 'json',withCredentials: true});
  }

  public change(user: User): Observable<boolean> {
    return this.http.put<boolean>(this.usersUrlChangeUser, user,{withCredentials: true});
  }

  
  
  public changePassword(user: User,password:string): Observable<boolean> {
    let users = new Array<User>()
    users.push(user)
    let user1 = JSON.parse(JSON.stringify(user));
    user1.password = password;
    users.push(user1)
    return this.http.put<boolean>(this.usersUrlChangePasswordUser, users,{withCredentials: true});
  }
  

  public authenticate(email: string): void {
      sessionStorage.setItem('email', email); 
    } 

  public getUserByEmail(email: string): Observable<User> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",email);
    return this.http.get<User>(this.usersUrlGetUserByEmail, {headers: headers, params: params,withCredentials: true});
  }

  public getInstructorByEmail(email: string): Observable<User> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email", email);

    return this.http.get<User>(this.getInstructorByEmailUrl, {headers: headers, params: params});
  }

 public getLoggedUser(): Observable<User> {
    let user = sessionStorage.getItem('email');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("email",user);
    return this.http.get<User>(this.usersUrlGetLoggedUser, {headers: headers, params: params,withCredentials: true});
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

  public searchInstructorssByName(firstName: string, lastName: string): Observable<Array<User>> {
    if (!firstName) {
      firstName = "";
    }
    if (!lastName) {
      lastName = "";
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("firstName", firstName).set("lastName", lastName);

    return this.http.get<Array<User>>(this.searchInstructorssByNameUrl, {headers: headers, params: params});
}

}