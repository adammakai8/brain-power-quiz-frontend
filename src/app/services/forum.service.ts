import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Forum } from '../model/forum';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }

  url = environment.backendUrl + '/forums';

  getAll(): Observable<Forum[]> {
    return this.http.get<Forum[]>(this.url);
  }

  delete(_id: any) {
    return this.http.delete<any>(this.url + '/delete/' + _id);
  }
}
