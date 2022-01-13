import { User } from "./user";

export class Complaint {
    id:number;
    author: User;
    complaintUser: User;
    text:string;
    answer: string;
}
