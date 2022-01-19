import { User } from "./user";

export class Grade {
    id: number;
    user: User;
    value: number;
    comment: String;
    seen: boolean;
}
