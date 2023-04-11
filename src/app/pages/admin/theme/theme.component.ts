import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/app/model/theme';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  themes: Theme[] = [];
  currentThemes: Theme[] = [];
  index: number = 0;
  length: number = 5;

  constructor(
    private service: ThemeService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAll();
  }

  /*
    Change the index according to we want the next 'length' themes,
    or the previous. If the value is 0, than a delete happened before,
    and the function checks, that is it need to get the previous themes,
    or not.
  */
  changeCurrentThemes(value: number) {
    if(value === 1) {
      if((this.index + 1) * this.length >= this.themes.length) return;
      else {
        this.index += 1;
      }
    } else if(value === -1) {
      if(this.index - 1 < 0) return;
      else {
        this.index -= 1;
      }
    } else {
      if(this.index * this.length >= this.themes.length) this.index -= 1;
    }
    this.setCurrentThemes();
  }

  createTheme() {
    this.router.navigate(['/theme/create']);
  }

  deleteTheme(_id: any) {
    this.service.deleteTheme(_id).subscribe({
      next: () => {this.themes = this.themes.filter((theme) => theme._id !== _id); this.changeCurrentThemes(0);},
      error: (error) => {console.warn(error);}
    });
  }

  private getAll() {
    this.service.getThemes().subscribe({
      next: (datas) => {
        datas.forEach(theme => {
          this.themes.push(theme);
          if(this.themes.length <= this.length) this.currentThemes.push(theme);
        });
      },
      error: (error) => {console.warn(error);}
    });
  }

  private setCurrentThemes() {
    this.currentThemes = this.themes.slice(this.index * this.length, (this.index + 1) * this.length);
  }

}
