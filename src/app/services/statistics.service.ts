import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalStatistics } from '../model/statistics/globalstatistics';
import { UserRanklist } from '../model/statistics/ranklist';

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
}
