import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Forum } from '../model/forum';
import { ForumRequest } from '../model/request/forumrequest';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  constructor(private http: HttpClient) { }

  url = environment.backendUrl + '/forums';

  getAll(): Observable<Forum[]> {
    return this.http.get<Forum[]>(this.url);
  }

  getForumByID(id: string) {
    return this.http.get<Forum>(this.url + '/' + id);
  }

  create(forum: ForumRequest) {
    return this.http.post<Forum>(this.url + '/create', forum);
  }

  update(forum: Forum) {
    return this.http.put<Forum>(this.url + '/update', forum);
  }

  delete(_id: any) {
    return this.http.delete<any>(this.url + '/delete/' + _id);
  }
}
