import { Game } from "./game";
import { Question } from "./question";
import { Theme } from "./theme";

export class QuestionStatistic {
    _id?: string;
    point!: number;
    question!: Question;
    game!: Game;
    themes!: Theme[];
}