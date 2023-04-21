import { Answer } from "./answer";
import { Game } from "./game";
import { Theme } from "./theme";

export class Question {
    _id?: string;
    text!: string;
    difficulty!: number;
    answers!: Answer[];
    themes?: Theme[];
    games?: Game[];

    constructor(_id: string | null = null, formData: {text: string, difficulty: number, answer1: string, answer2: string, answer3: string, answer4: string, checkAnswer: number, checkThemes: Theme[]}
        = {text: "", difficulty: 1, answer1: "", answer2: "", answer3: "", answer4: "", checkAnswer: 0, checkThemes: []}) {
        if(_id !== null) this._id = _id;
        this.text = formData.text;
        this.difficulty = formData.difficulty;
        this.answers = [
            {text: formData.answer1, isCorrect: false},
            {text: formData.answer2, isCorrect: false},
            {text: formData.answer3, isCorrect: false},
            {text: formData.answer4, isCorrect: false}
        ];
        this.answers[formData.checkAnswer].isCorrect = true;
        this.themes = formData.checkThemes;
    }
}