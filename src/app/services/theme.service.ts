import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Theme } from '../model/theme';

@Injectable()
export class ThemeService {

  constructor() { }

  getThemes(): Observable<Theme[]> {
    // TODO: replace mock with actual functionality
    return of([
      { text: "Irodalom" },
      { text: "Történelem" },
      { text: "Matematika" },
      { text: "Sport" },
      { text: "Kémia" },
      { text: "Fizika" },
      { text: "Földrajz" },
      { text: "Hittan" }
    ])
  }
}
