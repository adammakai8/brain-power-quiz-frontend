import { Component, OnInit } from '@angular/core';
import { UserRanklist } from 'src/app/model/statistics/ranklist';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-ranklist',
  templateUrl: './ranklist.component.html',
  styleUrls: ['./ranklist.component.scss']
})
export class RanklistComponent implements OnInit {

  users: UserRanklist[] = [];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statisticsService.getRanklist().subscribe(list => this.users = list.sort((a, b) => b.points - a.points));
  }

}
