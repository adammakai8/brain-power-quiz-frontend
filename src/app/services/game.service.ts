import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GameCreationData } from '../model/gamecreationdata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }
  
  url = environment.backendUrl + '/games';

  createGame(gameData: GameCreationData): Observable<any> {
    return this.http.post(this.url + '/create', gameData) as Observable<any>;
  }
}
