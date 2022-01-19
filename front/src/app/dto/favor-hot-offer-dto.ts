import { FavorHotOffer } from "../model/favor-hot-offer";
import { InstructorsFavor } from "../model/instructors-favor";

export class FavorHotOfferDTO {
    instructorsFavor: InstructorsFavor;
    favorHotOffer: FavorHotOffer;
    totalPrice: number;

    constructor(instructorsFavor: InstructorsFavor, favorHotOffer: FavorHotOffer, totalPrice: number) {
        this.instructorsFavor = instructorsFavor;
        this.favorHotOffer = favorHotOffer;
        this.totalPrice = totalPrice;
    }
}
