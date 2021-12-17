
import { Ship, ShipServices } from "./ship";

export class ShipHotOffer {
    id:number;
    availableFrom:Date;
    availableTill:Date;
    numOfPeople:number;
    services:Array<ShipServices> ;
    cost:number;
    free:boolean;
}
