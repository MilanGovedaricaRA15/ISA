import { Cottage } from "../model/cottage";

export class CottageDTO {
    cottage: Cottage;
    averageGrade: number;
    totalPrice: number;

    constructor(cottage: Cottage, averageGrade: number, totalPrice: number) {
        this.cottage = cottage;
        this.averageGrade = averageGrade;
        this.totalPrice = totalPrice;
    }
}

export function getAverageCottageGrade(cottage : Cottage) : number {
    let averageGrade = 0.0;
        
    if (cottage.grades.length > 0) {
        let totalGrades = 0.0;

        for (let grade of cottage.grades) {
            totalGrades += grade.value;
        }

        averageGrade = totalGrades / cottage.grades.length;
    }

    return averageGrade;
}
