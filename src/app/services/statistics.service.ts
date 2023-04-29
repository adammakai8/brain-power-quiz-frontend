import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalStatistics } from '../model/statistics/globalstatistics';
import { UserRanklist } from '../model/statistics/ranklist';
import { ThemeCount } from '../model/statistics/themecount';
import { UserStatistics } from '../model/statistics/userstatistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  url = environment.backendUrl + '/statistics';

  getGlobalStatistics(): Observable<GlobalStatistics> {
    return this.http.get(this.url + '/global') as Observable<GlobalStatistics>;
  }

  getRanklist(): Observable<UserRanklist[]> {
    return this.http.get(this.url + '/ranklist') as Observable<UserRanklist[]>;
  }

  getUserFavThemes(userId: string): Observable<ThemeCount[]> {
    return this.http.get(this.url + `/users/${userId}/themes/popular`) as Observable<ThemeCount[]>;
  }

  getUserStatistics(userId: string): Observable<UserStatistics> {
    return this.http.get(this.url + `/users/${userId}`) as Observable<UserStatistics>;
  }

  getGameResults(gameId: string): Observable<UserRanklist[]> {
    return this.http.get(this.url + `/${gameId}/results`) as Observable<UserRanklist[]>;
  }
}
