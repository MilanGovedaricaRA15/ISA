import { Cottage, Services } from "./cottage";
import { Penalty } from "./penalty";
import { Report } from "./report";
import { User } from "./user";

export class CottageReservation {
    id:number;
    availableFrom:Date;
    availableTill:Date;
    cost:number;
    client:User;
    cottage:Cottage;
    services:Array<Services>;
    report:Report;
    penalty:Penalty;
}
