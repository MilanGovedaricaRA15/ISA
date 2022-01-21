import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  private getAllUsersUrl: string;
  private getAllInstructorsUrl: string;
  private usersUrlLogin: string;
  private usersUrlRegister: string;
  private usersUrlRegisterClient: string;
  private usersUrlGetUserByEmail: string;
  private getInstructorByEmailUrl : string;
  private usersUrlGetLoggedUser: string;
  private usersUrlChangeUser: string;
  private usersUrlChangePasswordUser: string;
  private changeAdministratorsPassword: string;
  private addNewAdmin: string;
  private deleteUserUrl: string;
  private declineUserUrl: string;
  private searchInstructorssByNameUrl: string;
  private acceptUserUrl: string;
  private changePrepaidUrl: string;
  

  constructor(private http: HttpClient) {
    this.getAllUsersUrl = environment.baseUrl+'users/getAllUsers';
    this.getAllInstructorsUrl = environment.baseUrl+'users/getAllInstructors';
    this.usersUrlLogin = environment.baseUrl+'users/login';
    this.usersUrlRegister = environment.baseUrl+'users/register';
    this.usersUrlRegisterClient = environment.baseUrl+'users/registerClient';
    this.usersUrlGetLoggedUser = environment.baseUrl+'users/getUserByEmail';
    this.usersUrlGetUserByEmail = environment.baseUrl+'users/getUserByEmail';
    this.getInstructorByEmailUrl = environment.baseUrl+'users/getInstructorByEmail';
    this.usersUrlChangeUser = environment.baseUrl+'users/changeUser';
    this.usersUrlChangePasswordUser = environment.baseUrl+'users/changePasswordUser';
    this.changeAdministratorsPassword = environment.baseUrl+'users/changeAdministratorsPassword';
    this.addNewAdmin = environment.baseUrl+'users/addAdmin';
    this.deleteUserUrl = environment.baseUrl+'users/deleteUser';
    this.declineUserUrl = environment.baseUrl+'users/declineUser';
    this.searchInstructorssByNameUrl = environment.baseUrl+'users/searchInstructorsByName';
    this.acceptUserUrl = environment.baseUrl+'users/acceptUser';
    this.changePrepaidUrl = environment.baseUrl+'users/changePrepaid';
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

  public registerClient(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrlRegisterClient, user,{responseType: 'text' as 'json',withCredentials: true});
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

  public changeAdminsPassword(user: User) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  
    return this.http.put<string>(this.changeAdministratorsPassword, user, {headers: headers});
  }
  
  public changePrepaid(id: number) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  
    return this.http.put<boolean>(this.changePrepaidUrl, id, {headers: headers});
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

  public isClientLoggedIn(): Observable<boolean> {
    return this.getLoggedUser().pipe(map(res => {
      if(res.role.toString() === 'client'){
        return true;
      }
      else{
        return false;
      }
    }));
  }

  public isInstructorLoggedIn(): Observable<boolean> {
    return this.getLoggedUser().pipe(map(res => {
      if(res.role.toString() === 'instructor'){
        return true;
      }
      else{
        return false;
      }
    }));
  }

  public adminRegistred(user: User): Observable<string> {
    return this.http.post<string>(this.addNewAdmin, user,{responseType: 'text' as 'json'});
  } 

  public removeUser(id:number): Observable<boolean>{
    return this.http.post<boolean>(this.deleteUserUrl,id);
  }

  public declineUser(text:string): Observable<boolean>{
    return this.http.post<boolean>(this.declineUserUrl,text);
  }

  public acceptUser(id:number): Observable<boolean> {
    return this.http.post<boolean>(this.acceptUserUrl,id);
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