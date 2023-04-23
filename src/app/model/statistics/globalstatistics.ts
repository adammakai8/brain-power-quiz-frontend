import { StatisticsGroup } from "./statisticsgroup";
import { ThemeCount } from "./themecount";

export class GlobalStatistics {
    popularThemes!: ThemeCount[];
    statisticsByAge!: StatisticsGroup[];
    statisticsByTheme!: StatisticsGroup[];
}