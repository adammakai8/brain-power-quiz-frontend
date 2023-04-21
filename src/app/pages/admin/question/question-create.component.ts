import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/model/question';
import { Theme } from 'src/app/model/theme';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-modify.html',
  styleUrls: []
})
export class QuestionCreateComponent implements OnInit {

    currentThemeNames: string[] = [];
    correctAnswerIndex: number = 0;
    isCreate = true;
    question: Question = new Question();
    themes: Theme[] = [];
    form: FormGroup;

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private questionService: QuestionService,
      private themeService: ThemeService
    ) {
      this.form = this.fb.group({
        text: ['', Validators.required],
        difficulty: ['', Validators.required],
        answer1: ['', Validators.required],
        answer2: ['', Validators.required],
        answer3: ['', Validators.required],
        answer4: ['', Validators.required],
        checkAnswer: [this.correctAnswerIndex.toString(), [Validators.required]],
        checkThemes: fb.array([], [Validators.required, Validators.minLength(1)])
      });
    }
  
    ngOnInit(): void {
      this.themeService.getThemes().subscribe((themes) => this.themes = themes);
    }

    onCheckboxChange(e: any) {
      const checkThemes: FormArray = this.form.get('checkThemes') as FormArray;
      if (e.target.checked) {
        checkThemes.push(new FormControl(e.target.value));
      } else {
        let i: number = 0;
        checkThemes.controls.forEach((item: AbstractControl) => {
          if (item.value == e.target.value) {
            checkThemes.removeAt(i);
            return;
          }
          i++;
        });
      }
    }

    update() {
      if (this.form.valid) {
        let form_value = this.form.value;
        form_value.checkThemes = this.themes.filter(theme => form_value.checkThemes.includes(theme.text));
        this.question = new Question(form_value);
        console.log(this.question);
        this.questionService.createQuestion(this.question)
          .subscribe({
            next: () => this.router.navigate(['/question']),
            error: (error) => console.error(error)
          });
      } else {
        console.log('invalid form');
        
      }
    }

}
