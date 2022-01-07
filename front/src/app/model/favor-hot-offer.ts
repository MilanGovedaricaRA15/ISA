import { FavorServices, InstructorsFavor } from "./instructors-favor";

export class FavorHotOffer {
    id: number;
    availaibleFrom: Date;
    place: String;
    during: number;
    numOfPersons: number;
    services: Array<FavorServices>;
    cost: number;
    free: Boolean;
}
