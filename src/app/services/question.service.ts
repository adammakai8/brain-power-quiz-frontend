import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  url = environment.backendUrl + '/questions';

  getAll(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url);
  }

  getQuestionByID(_id: string): Observable<Question> {
    return this.http.get<Question>(this.url + '/' + _id);
  }

  createQuestion(question: Question) {
    console.log(question);
    return this.http.post<Question>(this.url + '/create', question);
  }

  updateQuestion(question: Question) {
    return this.http.put<Question>(this.url + '/update', question);
  }

  delete(_id: any) {
    return this.http.delete<any>(this.url + '/delete/' + _id);
  }
}
