import { Game } from "./game";
import { Question } from "./question";

export class Theme {
    _id?: string;
    text!: string;
    questions?: Question[];
    games?: Game[];

    constructor(object: Theme = {_id: "", text: ""}) {
        this._id = object._id;
        this.text = object.text;
        this.questions = object.questions;
        this.games = object.games;
    } 
}