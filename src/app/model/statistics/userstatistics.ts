import { StatisticsGroup } from "./statisticsgroup";

export class UserStatistics {
    averagePoints!: number;
    answersByDifficulty!: StatisticsGroup[];
    answersByTheme!: StatisticsGroup[];
}