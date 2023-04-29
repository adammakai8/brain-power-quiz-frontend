import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ForumComment } from '../model/forumcomment';
import { ForumCommentRequest } from '../model/request/forumcommentrequest';

@Injectable({
  providedIn: 'root'
})
export class ForumCommentService {
  constructor(private http: HttpClient) { }

  url = environment.backendUrl + '/forumComments';

  getAll(): Observable<ForumComment[]> {
    return this.http.get<ForumComment[]>(this.url);
  }

  getForumCommentByID(id: string) {
    return this.http.get<ForumComment>(this.url + '/' + id);
  }

  create(forum: ForumCommentRequest) {
    return this.http.post<ForumComment>(this.url + '/create', forum);
  }

  update(forum: ForumComment) {
    return this.http.put<ForumComment>(this.url + '/update', forum);
  }

  delete(_id: any) {
    return this.http.delete<any>(this.url + '/delete/' + _id);
  }
}
