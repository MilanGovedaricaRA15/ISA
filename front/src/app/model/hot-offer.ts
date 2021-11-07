import { Services } from "./cottage";

export class HotOffer {
    id:number;
    availableFrom:Date;
    availableTill:Date;
    numOfPeople:number;
    services:Array<Services> ;
    costPerNight:number;
    free:boolean;
}
