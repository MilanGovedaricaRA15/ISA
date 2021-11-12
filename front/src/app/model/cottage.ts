
import { HotOffer } from './hot-offer';
import { User } from './user';

export class Cottage {
    id:number;
    name:String;
    address:String;
    description:String;
    images:Array<String> ;
    numOfRooms:number;
    numOfBeds:number;
    rules:String;
    services:Array<Services>;
    availableFrom:Date;
    availableTill:Date;
    hotOffers:Array<HotOffer> ;
    costPerNight:number;
    owner:User;

    
}
export enum Services {
    WiFi="WiFi",
    Parking="Parking",
    Pool="Pool"
}
