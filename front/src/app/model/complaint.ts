import { Cottage } from "./cottage";
import { Ship } from "./ship";
import { User } from "./user";

export class Complaint {
    id:number;
    author: User;
    text:string;
    complaintUser: User;
    complaintCottage: Cottage;
    complaintShip: Ship;
    answer: string;
}
