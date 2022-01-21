import { User } from "../model/user";

export class InstructorDTO {
    instructor: User;
    averageGrade: number;

    constructor(instructor: User, averageGrade: number) {
        this.instructor = instructor;
        this.averageGrade = averageGrade;
    }
}

export function getAverageInstructorGrade(instructor : User) : number {
    let averageGrade = 0.0;
        
    if (instructor.grades.length > 0) {
        let totalGrades = 0.0;
        let numOfGrades = 0;

        for (let grade of instructor.grades) {
            if (grade.seen) {
                totalGrades += grade.value;
                numOfGrades += 1;
            }
        }

        if (numOfGrades > 0) {
            averageGrade = totalGrades / numOfGrades;
        }
    }

    return averageGrade;
}
