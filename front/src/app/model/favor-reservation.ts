import { FavorServices, InstructorsFavor } from "./instructors-favor";
import { Penalty } from "./penalty";
import { Report } from "./report";
import { User } from "./user";

export class FavorReservation {
    id: number;
    availableFrom:Date;
    availableTill:Date;
    cost: number;
    client: User;
    favor: InstructorsFavor;
    services:Array<FavorServices>;
    report:Report;
    penalty:Penalty;
    
    FavorReservation() {}
    
}
