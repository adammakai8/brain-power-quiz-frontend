import { Question } from "./question";

export class Theme {
    _id?: string;
    text!: string;
    questions?: Question[];
    games?: any[];  // TODO: Game type
}