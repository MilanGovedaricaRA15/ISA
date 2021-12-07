import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDeleteRequest } from '../model/account-delete-request';

@Injectable({
  providedIn: 'root'
})
export class AccountDeleteRequestService {
  private addAccountDeleteRequestUrl: string;

  constructor(private http: HttpClient) { 
    this.addAccountDeleteRequestUrl = "http://localhost:8080/accountDeleteRequest/addAccountDeleteRequest";
  }

  public addAccountDeleteRequest(accountDeleteRequest: AccountDeleteRequest):Observable<boolean>{
    return this.http.post<boolean>(this.addAccountDeleteRequestUrl,accountDeleteRequest,{withCredentials: true});
  }


}
