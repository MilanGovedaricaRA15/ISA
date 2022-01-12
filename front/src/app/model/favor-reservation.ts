import { InstructorsFavor } from "./instructors-favor";
import { Report } from "./report";
import { User } from "./user";

export class FavorReservation {
    id: number;
    availableFrom:Date;
    availableTill:Date;
    cost: number;
    client: User;
    favor: InstructorsFavor;
    report:Report;

    FavorReservation() {}
    
}
