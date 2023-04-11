import { Question } from "./question";
import { Theme } from "./theme";

export class Game {
    _id?: string;
    name!: string;
    maximalPlayerNumber!: number;
    closeDate!: Date;
    themes?: Theme[];
    question?: Question[];
}