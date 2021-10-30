import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private usersUrlLogin: string;
  private usersUrlRegister: string;

  constructor(private http: HttpClient) {
    this.usersUrlLogin = 'http://localhost:8080/users/login';
    this.usersUrlRegister = 'http://localhost:8080/users/register';
  }

  public register(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrlRegister, user,{responseType: 'text' as 'json'});
  }

  public login(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrlLogin, user,{responseType: 'text' as 'json'});
  }

}