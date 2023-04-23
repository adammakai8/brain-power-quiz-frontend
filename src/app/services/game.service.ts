import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GameCreationData } from '../model/gamecreationdata';
import { Observable } from 'rxjs';
import { Game } from '../model/game';
import { AnswerData } from '../model/answerdata';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }
  
  url = environment.backendUrl + '/games';

  getById(id: string): Observable<Game> {
    return this.http.get(this.url + `/${id}`) as Observable<Game>;
  }

  createGame(gameData: GameCreationData): Observable<any> {
    return this.http.post(this.url + '/create', gameData) as Observable<any>;
  }

  playedGameIds(): Observable<string[]> {
    return this.http.get(this.url + `/played`) as Observable<string[]>;
  }

  submitAnswers(answers: AnswerData[]): Observable<any> {
    return this.http.post(this.url + '/submit', answers);
  }

  getAll(): Observable<Game[]> {
    return this.http.get(this.url) as Observable<Game[]>;
  }

  startGame(gameId: string): Observable<Game> {
    return this.http.post(this.url + `/start/${gameId}`, {}) as Observable<Game>;
  }
}
