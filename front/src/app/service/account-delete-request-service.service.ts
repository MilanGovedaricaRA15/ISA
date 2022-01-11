import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDeleteRequest } from '../model/account-delete-request';

@Injectable({
  providedIn: 'root'
})
export class AccountDeleteRequestService {
  private addAccountDeleteRequestUrl: string;
  private getAllRequestsUrl: string;
  private deleteRequestUrl: string;

  constructor(private http: HttpClient) { 
    this.addAccountDeleteRequestUrl = "http://localhost:8080/accountDeleteRequest/addAccountDeleteRequest";
    this.getAllRequestsUrl = 'http://localhost:8080/accountDeleteRequest/getAllRequests';
    this.deleteRequestUrl = 'http://localhost:8080/accountDeleteRequest/deleteRequest';
  }

  public addAccountDeleteRequest(accountDeleteRequest: AccountDeleteRequest):Observable<boolean>{
    return this.http.post<boolean>(this.addAccountDeleteRequestUrl,accountDeleteRequest,{withCredentials: true});
  }

  public getAllRequests() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<AccountDeleteRequest>>(this.getAllRequestsUrl, {headers: headers});
  }

  public deleteRequest(id:number): Observable<boolean>{
    return this.http.post<boolean>(this.deleteRequestUrl,id);
  }
}
