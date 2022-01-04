import { Grade } from "./grade";
import { ShipHotOffer } from "./ship-hot-offer";
import { ShipReservation } from "./ship-reservation";
import { ShipServicePrice } from "./ship-service-price";
import { User } from "./user";

export class Ship {
    id: number;
    owner: User;
    name: String;
    type: String;
    length: number;
    engineNumber: String;
    enginePower: number;
    topSpeed: number;
    availableFrom:Date;
    availableTill:Date;
    navigationEquipment: Array<NavigationEquipment>;
    address: String;
    description: String;
    images: Array<String>;
    capacity: number;
    rules: String;
    grades: Array<Grade>;
    fishingEquipment: Array<FishingEquipment>;
    cancelRequirements: String;
    costPerNight: number;
    priceList: Array<ShipServicePrice>
    services: Array<ShipServices>
    hotOffers: Array<ShipHotOffer>
}

export enum NavigationEquipment{
    GPS="GPS",
    Radar="Radar",
    VHFRadio="VHFRadio",
    FishFinder="FishFinder"
}

export enum FishingEquipment{
    Lures="Lures",
    Nets="Nets",
    Rodes="Rodes"
}

export enum ShipServices {
    PetFriendly="PetFriendly",
    Minibar="Minibar",
    HairDryer="HairDryer"
}
