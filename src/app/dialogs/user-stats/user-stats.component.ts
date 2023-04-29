import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ThemeCount } from 'src/app/model/statistics/themecount';
import { UserStatistics } from 'src/app/model/statistics/userstatistics';
import { User } from 'src/app/model/user';
import { StatisticsService } from 'src/app/services/statistics.service';

enum Tab {
  DIFF = 'DIFF',
  THEME = 'THEME'
}

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {

  @Input()
  user?: User;

  activeTab: Tab = Tab.DIFF;

  favThemes: ThemeCount[] = [];
  statistics?: UserStatistics;

  constructor(
    private translate: TranslateService,
    private statisticsServie: StatisticsService, 
    public activeModal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.statisticsServie.getUserFavThemes(this.user?._id!)
      .subscribe(themes => this.favThemes = themes.sort((a, b) => b.gameCount - a.gameCount));
    this.statisticsServie.getUserStatistics(this.user?._id!).subscribe(stats => this.statistics = stats);
  }

  tabClicked(clickedTab: string): void {
    this.activeTab = clickedTab as Tab;
  }

  getGroupName(): string {
    return this.translate.instant('statistics.group-table.' + (this.activeTab === 'DIFF' ? 'diff' : 'theme'));
  }

  round(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}
