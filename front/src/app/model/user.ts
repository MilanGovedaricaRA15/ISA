import { Grade } from "./grade";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    address: string;
    country: string;
    city: string;
    role: Role;
    password: string;
    reason: string;
    verified: boolean;
    prepaid: boolean;
    type: Type;
    points: number;
    grades: Array<Grade>;
}

export enum Role {
    cottageAdvertiser,
    boatAdvertiser,
    instructor,
    administratorSuperior,
    administratorFirstLogged,
    administrator,
    client
}

export enum Type {
    Regular,
    Silver,
    Gold
}
