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
