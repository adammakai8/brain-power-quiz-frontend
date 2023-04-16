import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Theme } from 'src/app/model/theme';
import { ThemeService } from 'src/app/services/theme.service';

enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  CUSTOM = 'CUSTOM'
}

function sumQuestionsValid(control: AbstractControl): ValidationErrors | null {
  if (control.parent?.get('easyQuestions')?.value +
    control.parent?.get('mediumQuestions')?.value +
    control.parent?.get('hardQuestions')?.value !== 10) {     
      return { invalid: true };
    } else {
      return null;
    }
}

function themesNotEmpty(control: AbstractControl): ValidationErrors | null {
  if (!control.value || control.value.length === 0) {
    return { required: true };
  }
  return null;
}

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.scss']
})
export class QuizSettingsComponent implements OnInit {

  form: FormGroup;

  themes?: Theme[];

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService
  ) {
    this.form = fb.group({
      maximalPlayerNumber: new FormControl(5, [Validators.max(10), Validators.min(1)]),
      closeDate: new FormControl(moment().format('YYYY. MM. DD.'), [Validators.required]),
      themes: new FormControl([], [themesNotEmpty]),
      easyQuestions: new FormControl(3, [Validators.max(10), sumQuestionsValid]),
      mediumQuestions: new FormControl(7, [Validators.max(10), sumQuestionsValid]),
      hardQuestions: new FormControl(0, [Validators.max(10), sumQuestionsValid])
    });
   }

  ngOnInit(): void {
    this.themeService.getThemes().subscribe(
      themes => this.themes = themes
    );
    this.disableNumberInputs();
  }

  createGame(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      //formValue.closeDate = formValue.closeDate
    }
    // TODO: implement game creation
  }

  toggleThemeSelection(theme: Theme): void {
    const index = this.form.value.themes.indexOf(theme);
    if (index > -1) {
      this.form.value.themes.splice(index, 1);
    } else {
      this.form.value.themes.push(theme);
    }
    this.form.controls['themes'].updateValueAndValidity();
  }

  setDifficulty(event: any): void {
    switch (event.target.value) {
      case Difficulty.EASY:
        this.form.get('easyQuestions')?.setValue(7);
        this.form.get('mediumQuestions')?.setValue(3);
        this.form.get('hardQuestions')?.setValue(0);

        this.disableNumberInputs();
        break;
      case Difficulty.MEDIUM:
        this.form.get('easyQuestions')?.setValue(2);
        this.form.get('mediumQuestions')?.setValue(6);
        this.form.get('hardQuestions')?.setValue(2);

        this.disableNumberInputs();
        break;
      case Difficulty.HARD:
        this.form.get('easyQuestions')?.setValue(0);
        this.form.get('mediumQuestions')?.setValue(3);
        this.form.get('hardQuestions')?.setValue(7);

        this.disableNumberInputs();
        break;
      case Difficulty.CUSTOM:
        this.form.get('easyQuestions')?.enable();
        this.form.get('mediumQuestions')?.enable();
        this.form.get('hardQuestions')?.enable();
    }
  }

  private disableNumberInputs(): void {
    this.form.get('easyQuestions')?.disable();
    this.form.get('mediumQuestions')?.disable();
    this.form.get('hardQuestions')?.disable();
  }
}
