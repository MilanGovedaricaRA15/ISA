import { Ship } from "../model/ship";

export class ShipDTO {
    ship: Ship;
    averageGrade: number;

    constructor(ship: Ship, averageGrade: number) {
        this.ship = ship;
        this.averageGrade = averageGrade;
    }
}

export function getAverageShipGrade(ship : Ship) : number {
    let averageGrade = 0.0;
        
    if (ship.grades.length > 0) {
        let totalGrades = 0.0;

        for (let grade of ship.grades) {
            totalGrades += grade.value;
        }

        averageGrade = totalGrades / ship.grades.length;
    }

    return averageGrade;
}
