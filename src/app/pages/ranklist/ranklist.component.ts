import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStatsComponent } from 'src/app/dialogs/user-stats/user-stats.component';
import { UserRanklist } from 'src/app/model/statistics/ranklist';
import { User } from 'src/app/model/user';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-ranklist',
  templateUrl: './ranklist.component.html',
  styleUrls: ['./ranklist.component.scss']
})
export class RanklistComponent implements OnInit {

  users: UserRanklist[] = [];
  selectedUser?: User;
  currentUsername?: string;

  constructor(private statisticsService: StatisticsService, private modalService: NgbModal, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.statisticsService.getRanklist().subscribe(list => this.users = list.sort((a, b) => b.points - a.points));
    this.currentUsername = this.tokenService.getAuthor();
  }

  openUserStatistics(user: User): void {
    const modalRef = this.modalService.open(UserStatsComponent, { centered: true, size: 'xl' });
    modalRef.componentInstance.user = user;
  }

  isCurrentUser(username: string): boolean {
    return this.currentUsername === username;
  }
}
