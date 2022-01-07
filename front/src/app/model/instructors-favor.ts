import { FavorHotOffer } from "./favor-hot-offer";
import { FavorServicePrice } from "./favor-service-price";
import { Grade } from "./grade";
import { User } from "./user";

export class InstructorsFavor {
    id: number;
    instructor: User;
    name: string;
    address: string;
    description: string;
    grades: Array<Grade>;
    images: Array<String>;
    numOfPersons: number;
    hotOffers: Array<FavorHotOffer>;
    rules: String;
    services: Array<FavorServices>;
    priceList: Array<FavorServicePrice>;
    cost: number;
    availableFrom:Date;
    availableTill:Date;
    cancellationCondition: string;
}

export enum FavorServices {
    Boat="Boat",
    FishingRod="FishingRod"
}
