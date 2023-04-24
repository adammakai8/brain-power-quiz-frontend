import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StatisticsGroup } from 'src/app/model/statistics/statisticsgroup';
import { ThemeCount } from 'src/app/model/statistics/themecount';
import { StatisticsService } from 'src/app/services/statistics.service';

enum Tab {
  AGE = 'AGE',
  THEME = 'THEME'
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  activeTab: Tab = Tab.AGE;

  popularThemes: ThemeCount[] = [];
  statisticsByAge: StatisticsGroup[] = [];
  statisticsByTheme: StatisticsGroup[] = [];

  constructor(
    private translate: TranslateService,
    private statisticsService: StatisticsService
    ) { }

  ngOnInit(): void {
    this.statisticsService.getGlobalStatistics().subscribe(stats => {
      this.popularThemes = stats.popularThemes.sort((a, b) => b.gameCount - a.gameCount);
      this.statisticsByAge = stats.statisticsByAge;
      this.statisticsByTheme = stats.statisticsByTheme;
    });
  }

  tabClicked(clickedTab: string): void {
    this.activeTab = clickedTab as Tab;
  }

  getGroupName(): string {
    return this.translate.instant('statistics.group-table.' + (this.activeTab === 'AGE' ? 'age' : 'theme'));
  }
}
