import { FavorServices, InstructorsFavor } from "./instructors-favor";

export class FavorHotOffer {
    id: number;
    availableFrom: Date;
    availableTill: Date;
    place: String;
    numOfPersons: number;
    services: Array<FavorServices>;
    cost: number;
    free: Boolean;
}
