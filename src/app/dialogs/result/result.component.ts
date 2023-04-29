import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from 'src/app/model/game';
import { UserRanklist } from 'src/app/model/statistics/ranklist';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input()
  game?: Game;

  @Input()
  isClosed?: boolean;

  rankings: UserRanklist[] = [];

  username?: string;

  constructor(
    private statisticsService: StatisticsService, 
    private tokenService: TokenService, 
    public activeModal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.statisticsService.getGameResults(this.game!._id!).subscribe(results => this.rankings = results.sort((a, b) => b.points - a.points));
    this.username = this.tokenService.getAuthor();
  }

  isCurrentUser(username: string): boolean {
    return this.username === username;
  }

  emptyRowSequence(): any[] {
    return Array(this.game!.maximalPlayerNumber - (!this.game!.players ? 0 : this.game!.players.length));
  }
}
