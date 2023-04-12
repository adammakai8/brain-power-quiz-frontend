import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/services/question.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Theme } from 'src/app/model/theme';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-modify.html',
  styleUrls: []
})
export class QuestionUpdateComponent implements OnInit {

    isCreate = false;
    question: Question = new Question();
    themes: Theme[] = [];
    form: FormGroup;

    constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private service: QuestionService
    ) {
      this.form = this.fb.group({
        text: ['', Validators.required],
        difficulty: ['', Validators.required],
        answer1: ['', Validators.required],
        answer2: ['', Validators.required],
        answer3: ['', Validators.required],
        answer4: ['', Validators.required],
        checkAnswer: ['answer1', [Validators.required]],
        checkThemes: fb.array([], [Validators.required, Validators.minLength(1)])
      });
    }
  
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')!;
  
        this.service.getQuestionByID(id).subscribe((question) => this.question = question);
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
        this.service.updateQuestion(this.question)
          .subscribe({
            next: () => this.router.navigate(['/question']),
            error: (error) => console.error(error)
          });
      } else {
        console.log('invalid form');
      }
    }

}
