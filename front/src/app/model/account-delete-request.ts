import { User } from "./user";

export class AccountDeleteRequest {
    id:number;
    user: User;
    seen: boolean;
    reason: string;

}
