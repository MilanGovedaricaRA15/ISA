import { Grade } from "./grade";
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
    navigationEquipment: NavigationEquipment;
    address: String;
    description: String;
    images: Array<String>;
    capacity: number;
    rules: Array<String>;
    grades: Array<Grade>;
}

export enum NavigationEquipment{
    GPS="GPS",
    Radar="Radar",
    VHF_radio="VHF radio",
    Fish_finder="Fishfinder"
}
