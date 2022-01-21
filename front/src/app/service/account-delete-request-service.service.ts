import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDeleteRequest } from '../model/account-delete-request';

@Injectable({
  providedIn: 'root'
})
export class AccountDeleteRequestService {
  private addAccountDeleteRequestUrl: string;
  private getAllRequestsUrl: string;
  private declineRequestUrl: string;
  private acceptRequestUrl: string;

  constructor(private http: HttpClient) { 
    this.addAccountDeleteRequestUrl = environment.baseUrl+"accountDeleteRequest/addAccountDeleteRequest";
    this.getAllRequestsUrl = environment.baseUrl+'accountDeleteRequest/getAllRequests';
    this.declineRequestUrl = environment.baseUrl+'accountDeleteRequest/declineRequest';
    this.acceptRequestUrl = environment.baseUrl+'accountDeleteRequest/acceptRequest';
  }

  public addAccountDeleteRequest(accountDeleteRequest: AccountDeleteRequest):Observable<boolean>{
    return this.http.post<boolean>(this.addAccountDeleteRequestUrl,accountDeleteRequest,{withCredentials: true});
  }

  public getAllRequests() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Array<AccountDeleteRequest>>(this.getAllRequestsUrl, {headers: headers});
  }

  public acceptRequest(accountDeleteRequest: AccountDeleteRequest): Observable<boolean>{
    return this.http.post<boolean>(this.acceptRequestUrl,accountDeleteRequest);
  }

  public declineRequest(accountDeleteRequest: AccountDeleteRequest): Observable<boolean>{
    return this.http.post<boolean>(this.declineRequestUrl,accountDeleteRequest);
  }
}
