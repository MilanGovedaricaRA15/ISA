import { InstructorsFavor } from "./instructors-favor";
import { User } from "./user";

export class FavorReservation {
    id: number;
    availableFrom:Date;
    availableTill:Date;
    cost: number;
    client: User;
    favor: InstructorsFavor;
    
}
