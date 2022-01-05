import { Grade } from "./grade";
import { User } from "./user";

export class InstructorsFavor {
    id: number;
    instructor: User;
    name: string;
    address: string;
    description: string;
    grades: Array<Grade>;

}
