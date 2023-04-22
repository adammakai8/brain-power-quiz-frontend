import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Theme } from 'src/app/model/theme';
import { GameService } from 'src/app/services/game.service';
import { ThemeService } from 'src/app/services/theme.service';
import * as _ from "lodash";

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

  @ViewChild('customOption')
  cutomOptionRadio!: ElementRef;

  minDate: NgbDateStruct;

  form: FormGroup;

  themes?: Theme[];

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private gameService: GameService,
    private router: Router
  ) {
    this.form = fb.group({
      name: new FormControl('', [Validators.required]),
      maximalPlayerNumber: new FormControl(5, [Validators.max(10), Validators.min(1)]),
      closeDate: new FormControl(moment().format('YYYY. MM. DD.'), [Validators.required]),
      themes: new FormControl([], [themesNotEmpty]),
      easyQuestions: new FormControl(3, [Validators.max(7), sumQuestionsValid]),
      mediumQuestions: new FormControl(7, [Validators.max(7), sumQuestionsValid]),
      hardQuestions: new FormControl(0, [Validators.max(7), sumQuestionsValid]),
    });
    const currentDay = new Date();
    this.minDate = { year: currentDay.getFullYear(), month: currentDay.getMonth() + 1, day: currentDay.getDate() };
   }

  ngOnInit(): void {
    this.themeService.getAll().subscribe(
      themes => this.themes = themes
    );
  }

  createGame(): void {
    if (this.form.valid) {
      const formValue = _.cloneDeep(this.form.value);
      console.log(formValue);
      formValue.closeDate = 
      `${formValue.closeDate.year}-${formValue.closeDate.month < 10 ? '0' : ''}${formValue.closeDate.month}-${formValue.closeDate.day}`
      this.gameService.createGame(formValue).subscribe(() => this.router.navigate(['browser']));
    }
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
        break;
      case Difficulty.MEDIUM:
        this.form.get('easyQuestions')?.setValue(2);
        this.form.get('mediumQuestions')?.setValue(6);
        this.form.get('hardQuestions')?.setValue(2);
        break;
      case Difficulty.HARD:
        this.form.get('easyQuestions')?.setValue(0);
        this.form.get('mediumQuestions')?.setValue(3);
        this.form.get('hardQuestions')?.setValue(7);
        break;
    }
    this.form.get('easyQuestions')?.updateValueAndValidity();
    this.form.get('mediumQuestions')?.updateValueAndValidity();
    this.form.get('hardQuestions')?.updateValueAndValidity();
  }

  handleInputChange(): void {
    this.cutomOptionRadio.nativeElement.checked = true;
    this.form.get('easyQuestions')?.updateValueAndValidity();
    this.form.get('mediumQuestions')?.updateValueAndValidity();
    this.form.get('hardQuestions')?.updateValueAndValidity();
  }
}
