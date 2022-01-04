
import { Penalty } from "./penalty";
import { Report } from "./report";
import { Ship, ShipServices } from "./ship";
import { User } from "./user";

export class ShipReservation {
    id:number;
    availableFrom:Date;
    availableTill:Date;
    cost:number;
    client:User;
    ship:Ship;
    services:Array<ShipServices>;
    report:Report;
    penalty:Penalty;
}
