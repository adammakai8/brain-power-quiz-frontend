import { Question } from "./question";
import { Theme } from "./theme";
import { User } from "./user";

export class Game {
    _id?: string;
    name!: string;
    maximalPlayerNumber!: number;
    closeDate!: Date;
    themes?: Theme[];
    players?: User[];
    question?: Question[];
}