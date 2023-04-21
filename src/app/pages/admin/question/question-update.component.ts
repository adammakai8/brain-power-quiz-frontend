import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/services/question.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Theme } from 'src/app/model/theme';
import { ThemeService } from 'src/app/services/theme.service';
import { Answer } from 'src/app/model/answer';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-modify.html',
  styleUrls: []
})
export class QuestionUpdateComponent implements OnInit {

    currentThemeNames: string[] = [];
    correctAnswerIndex: number = 0;
    isCreate = false;
    question: Question = new Question();
    themes: Theme[] = [];
    form: FormGroup;

    constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private themeService: ThemeService,
      private questionService: QuestionService
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
        const id = this.route.snapshot.paramMap.get('id')!;
  
        this.themeService.getThemes().subscribe((themes) => this.themes = themes);
        this.questionService.getQuestionByID(id).subscribe((question) => {
          this.question = question;
          this.correctAnswerIndex = this.question.answers.indexOf(this.question.answers.filter((answer) => answer.isCorrect)[0]);
          this.currentThemeNames = this.question.themes!.map((theme) => theme.text);
        });
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
        this.question = new Question(this.form.value);
        this.questionService.updateQuestion(this.question)
          .subscribe({
            next: () => this.router.navigate(['/question']),
            error: (error) => console.error(error)
          });
      } else {
        console.log('invalid form');
      }
    }

}
