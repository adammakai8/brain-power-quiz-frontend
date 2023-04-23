import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Answer } from 'src/app/model/answer';
import { Game } from 'src/app/model/game';
import { Question } from 'src/app/model/question';
import { AnswerData } from 'src/app/model/answerdata';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game?: Game;
  questions?: Question[];

  quizProgress: string = `${0}%`;
  counterText: string = '';

  pointSum: number = 0;
  lastPoint: number = 0;

  correctAnswer?: Answer;
  wrongAnswer?: Answer;

  questionStatistics: AnswerData[] = [];

  currentQuestionIndex: number = -1;
  get currentQuestion(): Question {
    return this.questions![this.currentQuestionIndex];
  }

  private timeStart?: Moment;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService, 
    private translate: TranslateService,
    private router: Router
    ) { }

  ngOnInit(): void {
    addEventListener('beforeunload', (event) => {
      setTimeout(()=> {}, 3000);
      // TODO: this is not working because of chrome & firefox bullsh*t
      if (!confirm(this.translate.instant('game.quit-confirm'))) {
        event.preventDefault();
      }
    });
    this.route.params.subscribe(params => this.initQuiz(params['id']))
  }

  chooseAnswer(choice: Answer): void {
    if (!!this.correctAnswer) return;

    if (choice.isCorrect) {
      this.correctAnswer = choice;
      this.lastPoint = this.calculatePoints();      
      this.pointSum += this.lastPoint;
    } else {
      this.wrongAnswer = choice;
      this.correctAnswer = this.currentQuestion.answers.find(ans => ans.isCorrect);
      this.lastPoint = 0;
    }

    this.questionStatistics.push({
      point: this.lastPoint,
      game: this.game!,
      question: this.currentQuestion
    });
  }

  nextQuestion(): void {
    if (!!this.correctAnswer || confirm(this.translate.instant('game.next-confirm'))) {
      if (this.isLastQuestion()) {
        this.submitQuiz();
        return;
      }
      
      // reset corresponding values
      this.lastPoint = 0;
      this.correctAnswer = undefined;
      this.wrongAnswer = undefined;

      this.questionCounterIncrement();
      this.resetClock();
    }
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex + 1 === this.questions?.length;
  }

  private initQuiz(gameId: string): void {
    this.gameService.getById(gameId).subscribe(game => {
      this.game = game;
      this.questions = _.shuffle(game.questions);
      this.questionCounterIncrement();
      this.resetClock();
    });
  }

  private submitQuiz(): void {
    this.gameService.submitAnswers(this.questionStatistics).subscribe(() => this.router.navigate(['home']));
  }

  private calculatePoints() {
    const elapsedTime = moment().diff(this.timeStart, 'milliseconds');
    const difficulty = this.currentQuestion.difficulty + 1;
    
    return Math.ceil((-200 / (1 + Math.pow(Math.E, -elapsedTime / 3200)) + 200) * difficulty);
  }

  private questionCounterIncrement(): void {
    this.currentQuestionIndex++;
    this.quizProgress = `${(this.currentQuestionIndex + 1) * 10}%`;
    this.counterText = 
      this.translate.instant('game.question-counter', { count: this.currentQuestionIndex + 1, max: this.questions?.length });
    this.questions![this.currentQuestionIndex].answers = _.shuffle(this.questions![this.currentQuestionIndex].answers);
  }

  private resetClock(): void {
    this.timeStart = moment();
  }
}
