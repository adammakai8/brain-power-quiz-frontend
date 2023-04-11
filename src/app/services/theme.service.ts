import { Injectable } from '@angular/core';
import { Theme } from '../model/theme';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ThemeService {

  constructor(private http: HttpClient) { }

  url = environment.backendUrl + '/themes';

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.url);
  }

  getThemeByID(_id: string): Observable<Theme> {
    return this.http.get<Theme>(this.url + '/' + _id);
  }

  createTheme(theme: Theme) {
    return this.http.post<Theme>(this.url + '/create', theme);
  }

  updateTheme(theme: Theme) {
    return this.http.put<Theme>(this.url + '/update', theme);
  }

  deleteTheme(_id: any) {
    return this.http.delete<any>(this.url + '/delete/' + _id);
  }
}
