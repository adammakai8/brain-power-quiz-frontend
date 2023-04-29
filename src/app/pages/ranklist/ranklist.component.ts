import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStatsComponent } from 'src/app/dialogs/user-stats/user-stats.component';
import { UserRanklist } from 'src/app/model/statistics/ranklist';
import { User } from 'src/app/model/user';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-ranklist',
  templateUrl: './ranklist.component.html',
  styleUrls: ['./ranklist.component.scss']
})
export class RanklistComponent implements OnInit {

  users: UserRanklist[] = [];
  selectedUser?: User;

  constructor(private statisticsService: StatisticsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.statisticsService.getRanklist().subscribe(list => this.users = list.sort((a, b) => b.points - a.points));
  }

  openUserStatistics(user: User): void {
    const modalRef = this.modalService.open(UserStatsComponent, { centered: true, size: 'xl' });
    modalRef.componentInstance.user = user;
  }

}
