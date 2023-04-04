import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Theme } from 'src/app/model/theme';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-quiz-browser',
  templateUrl: './quiz-browser.component.html',
  styleUrls: ['./quiz-browser.component.scss']
})
export class QuizBrowserComponent implements OnInit {

  form: FormGroup;

  themes?: Theme[];

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService
  ) {
    this.form = fb.group({
      themes: new FormControl([]),
      name: new FormControl(''),
      playermin: new FormControl(''),
      playermax: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.themeService.getThemes().subscribe(themes => this.themes = themes);
  }

  toggleThemeSelection(theme: Theme): void {
    const index = this.form.value.themes.indexOf(theme);
    if (index > -1) {
      this.form.value.themes.splice(index, 1);
    } else {
      this.form.value.themes.push(theme);
    }
  }

  search() {
    
  }

  createNewGame() {

  }

}
