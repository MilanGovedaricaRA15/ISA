import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Ship } from "../model/ship";

@Injectable({
    providedIn: 'root'
})
export class ShipService {
    private getAllShipsUrl: string;
    private getAllAvailableShipsUrl: string;
    private getShipByIdUrl: string;
    private searchShipsByNameUrl: string;
    private getShipAverageGradeUrl: string;
    private removeShipImgUrl: string;
    private getAllShipsOfOwnerUrl: string;
    private changeShipUrl: string;
    private removeShipHotOfferUrl: string;
    private deleteShipHotOfferUrl: string;
    private uploadImgUrl: string;
    private removeShipUrl: string;
    private addShipUrl: string;
    private addShipHotOfferToShipUrl: string;
    private checkIsReservedUrl: string;
    private removeShipByAdministratorUrl: string;

    constructor(private http: HttpClient) { 
        this.getAllShipsUrl = environment.baseUrl+"ships/getAllShips";
        this.getAllAvailableShipsUrl = environment.baseUrl+"ships/getAllAvailableShips";
        this.getShipByIdUrl = environment.baseUrl+'ships/getShipById';
        this.searchShipsByNameUrl = environment.baseUrl+'ships/searchShipsByName';
        this.getShipAverageGradeUrl = environment.baseUrl+'ships/getShipAverageGrade';
        this.removeShipImgUrl = environment.baseUrl+'ships/removeShipImg';
        this.getAllShipsOfOwnerUrl = environment.baseUrl+'ships/getAllShipsOfOwner';
        this.changeShipUrl = environment.baseUrl+'ships/changeShip';
        this.removeShipHotOfferUrl = environment.baseUrl+'ships/removeHotOffer';
        this.deleteShipHotOfferUrl = environment.baseUrl+'ships/deleteShipHotOffer';
        this.uploadImgUrl = environment.baseUrl+'ships/uploadImg';
        this.removeShipUrl = environment.baseUrl+'ships/removeShip';
        this.addShipUrl = environment.baseUrl+'ships/addShip';
        this.addShipHotOfferToShipUrl = environment.baseUrl+'ships/addHotOfferToShip';
        this.checkIsReservedUrl = environment.baseUrl+'ships/checkIsReserved';
        this.removeShipByAdministratorUrl = environment.baseUrl+'ships/removeShipByAdministrator'
    }

    public getAllShips(): Observable<Array<Ship>> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.get<Array<Ship>>(this.getAllShipsUrl, {headers: headers});
    }

    public getAllAvailableShips(from: Date, to: Date, numOfGuests: number): Observable<Array<Ship>> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      let stringFrom = from.getTime().toString();
      let stringTo = to.getTime().toString();
      let params = new HttpParams().set("from", stringFrom).set("to", stringTo).set("numOfGuests", numOfGuests);  

      return this.http.get<Array<Ship>>(this.getAllAvailableShipsUrl, {headers: headers, params: params});
  }

    public getShipById(id: number): Observable<Ship> {
        let ship = id;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let params = new HttpParams().set("ship", ship);

        return this.http.get<Ship>(this.getShipByIdUrl, {headers: headers, params: params});
    }

    public searchShipsByName(name: string): Observable<Array<Ship>> {
        let ship = name;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let params = new HttpParams().set("name", ship);
  
        return this.http.get<Array<Ship>>(this.searchShipsByNameUrl, {headers: headers, params: params});
    }

    public getShipAverageGrade(id: number): Observable<number> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let params = new HttpParams().set("id", id);

        return this.http.get<number>(this.getShipAverageGradeUrl, {headers: headers, params: params});
    }

    public addShip(ship: Ship):Observable<Ship>{
        return this.http.post<Ship>(this.addShipUrl,ship,{withCredentials: true});
      }
    
    public upload(file:File):Observable<boolean> {
        const formData:FormData = new FormData();
    
         formData.append('file', file);
    
        return this.http.post<boolean>(this.uploadImgUrl, formData,{withCredentials: true});
    } 
    
    public getAllShipsOfOwner(): Observable<Array<Ship>> {
      let user = sessionStorage.getItem('email');
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      let params = new HttpParams().set("email",user);
    
      return this.http.get<Array<Ship>>(this.getAllShipsOfOwnerUrl, {headers: headers,params: params,withCredentials: true});
    }
      
    public removeShipImg(shipToRemove:Ship ): Observable<any>{
      return this.http.put(this.removeShipImgUrl,shipToRemove,{withCredentials: true});
    }
  
    public removeShip(shipToRemove:number ): Observable<any>{
      return this.http.post(this.removeShipUrl,shipToRemove,{withCredentials: true});
    }

    public removeShipByAdministrator(shipId: number): Observable<Boolean>{
      return this.http.post<Boolean>(this.removeShipByAdministratorUrl,shipId,{withCredentials: true});
    }
    
    public changeShip(shipToChange:Ship): Observable<Boolean>{
      return this.http.put<Boolean>(this.changeShipUrl,shipToChange,{withCredentials: true});
    }
    
    public removeShipHotOffer(shipToChange:Ship): Observable<Boolean>{
      return this.http.put<Boolean>(this.removeShipHotOfferUrl,shipToChange,{withCredentials: true});
    }

    public deleteShipHotOffer(shipToChange: Ship): Observable<Boolean>{
      return this.http.put<Boolean>(this.deleteShipHotOfferUrl, shipToChange, {withCredentials: true});
    }
    
    public addShipHotOfferToShip(shipToChange:Ship): Observable<boolean>{
      return this.http.put<boolean>(this.addShipHotOfferToShipUrl,shipToChange,{withCredentials: true});
    }

    public checkIsReserved(shipToChange:Ship): Observable<boolean>{
      return this.http.post<boolean>(this.checkIsReservedUrl,shipToChange,{withCredentials: true});
    }
    

    
}
