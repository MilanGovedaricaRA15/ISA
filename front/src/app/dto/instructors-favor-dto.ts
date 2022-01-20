import { InstructorsFavor } from "../model/instructors-favor";

export class InstructorsFavorDTO {
    instructorsFavor: InstructorsFavor;
    averageGrade: number;
    totalPrice: number;

    constructor(instructorsFavor: InstructorsFavor, averageGrade: number, totalPrice: number) {
        this.instructorsFavor = instructorsFavor;
        this.averageGrade = averageGrade;
        this.totalPrice = totalPrice;
    }
}

export function getAverageFavorGrade(favor : InstructorsFavor) : number {
    let averageGrade = 0.0;
    
    if (favor.grades) {
        if (favor.grades.length > 0) {
            let totalGrades = 0.0;
            let numOfGrades = 0;
    
            for (let grade of favor.grades) {
                if (grade.seen) {
                    totalGrades += grade.value;
                    numOfGrades += 1;
                }
            }
    
            if (numOfGrades > 0) {
                averageGrade = totalGrades / numOfGrades;
            }
        }
    }
    
    return averageGrade;
}
