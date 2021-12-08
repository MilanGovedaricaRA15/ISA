import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ship } from "../model/ship";

@Injectable({
    providedIn: 'root'
})
export class ShipService {
    private getAllShipsUrl: string;
    private getShipByIdUrl: string;
    private searchShipsByNameUrl: string;

    constructor(private http: HttpClient) { 
        this.getAllShipsUrl="http://localhost:8080/ships/getAllShips";
        this.getShipByIdUrl = 'http://localhost:8080/ships/getShipById';
        this.searchShipsByNameUrl = 'http://localhost:8080/ships/searchShipsByName';
    }

    public getAllShips(): Observable<Array<Ship>> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.get<Array<Ship>>(this.getAllShipsUrl, {headers: headers});
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
}
