import { InstructorsFavor } from "../model/instructors-favor";

export class InstructorsFavorDTO {
    instructorsFavor: InstructorsFavor;
    averageGrade: number;

    constructor(instructorsFavor: InstructorsFavor, averageGrade: number) {
        this.instructorsFavor = instructorsFavor;
        this.averageGrade = averageGrade;
    }
}

export function getAverageFavorGrade(favor : InstructorsFavor) : number {
    let averageGrade = 0.0;
        
    if (favor.grades.length > 0) {
        let totalGrades = 0.0;

        for (let grade of favor.grades) {
            totalGrades += grade.value;
        }

        averageGrade = totalGrades / favor.grades.length;
    }

    return averageGrade;
}
