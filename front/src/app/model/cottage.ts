import { Grade } from './grade';
import { HotOffer } from './hot-offer';
import { ServicePrice } from './service-price';
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
    grades: Array<Grade>;
    hotOffers:Array<HotOffer>;
    costPerNight:number;
    owner:User;
    priceList:Array<ServicePrice>;
}

export enum Services {
    WiFi="WiFi",
    Parking="Parking",
    Pool="Pool"
}
