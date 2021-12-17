
import { Ship, ShipServices } from "./ship";
import { User } from "./user";

export class ShipReservation {
    id:number;
    availableFrom:Date;
    availableTill:Date;
    cost:number;
    client:User;
    ship:Ship;
    services:Array<ShipServices> ;
}
