import { Theme } from "./theme";

export class GameCreationData {
    name!: string;
    maximalPlayerNumber!: number;
    closeDate!: string;
    themes!: Theme[];
    easyQuestions!: number;
    mediumQuestions!: number;
    hardQuestions!: number; 
}