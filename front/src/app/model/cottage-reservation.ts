import { Cottage, Services } from "./cottage";
import { User } from "./user";

export class CottageReservation {
    id:number;
    availableFrom:Date;
    availableTill:Date;
    cost:number;
    client:User;
    cottage:Cottage;
    services:Array<Services> ;
}
