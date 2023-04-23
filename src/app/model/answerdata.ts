import { Game } from "./game";
import { Question } from "./question";
import { Theme } from "./theme";
import { User } from "./user";

export class AnswerData {
    _id?: string;
    point!: number;
    user?: User;
    game!: Game;
    question!: Question;
}