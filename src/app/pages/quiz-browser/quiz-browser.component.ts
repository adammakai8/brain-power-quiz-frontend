import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Game } from 'src/app/model/game';
import { Theme } from 'src/app/model/theme';
import { GameService } from 'src/app/services/game.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-quiz-browser',
  templateUrl: './quiz-browser.component.html',
  styleUrls: ['./quiz-browser.component.scss']
})
export class QuizBrowserComponent implements OnInit {

  form: FormGroup;

  hoveredDate?: NgbDate;

  themes?: Theme[];

  isCollapsed = true;

  games?: Game[];

  gamesFiltered?: Game[];

  constructor(
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private router: Router,
    private themeService: ThemeService,
    private gameService: GameService
  ) {
    this.form = fb.group({
      themes: new FormControl([]),
      name: new FormControl(''),
      playermin: new FormControl(''),
      playermax: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.themeService.getAll().subscribe(themes => this.themes = themes);
    this.gameService.getAll().subscribe(games => {
      this.games = games;
      this.gamesFiltered = this.games;
    });
  }

  toggleThemeSelection(theme: Theme): void {
    const index = this.form.value.themes.indexOf(theme);
    if (index > -1) {
      this.form.value.themes.splice(index, 1);
    } else {
      this.form.value.themes.push(theme);
    }
  }

  onDateSelection(date: NgbDate) {   
    const fromDate = this.form.get('fromDate');
    const toDate = this.form.get('toDate');

    console.log(fromDate);
    console.log(toDate);

    if (!fromDate?.value && !toDate?.value) {
			fromDate?.setValue(date);
		} else if (fromDate?.value && !toDate?.value && date.after(fromDate?.value)) {
			toDate?.setValue(date);
      
		} else {
			toDate?.setValue(undefined);
			fromDate?.setValue(date);
		}
  }

  isHovered(date: NgbDate) {
		return (
			this.form.get('fromDate')?.value && !this.form.get('toDate')?.value && 
        this.hoveredDate && date.after(this.form.get('fromDate')?.value) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.form.get('toDate')?.value && 
      date.after(this.form.get('fromDate')?.value) && date.before(this.form.get('toDate')?.value);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.form.get('fromDate')?.value) ||
			(this.form.get('toDate')?.value && date.equals(this.form.get('toDate')?.value)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  getDateFormatted(date: Date): string {
    return moment(date).format('YYYY. MM. DD.')
  }

  getThemeTooltip(themes?: Theme[]): string {
    if (!themes || themes.length < 2) {
      return '';
    } else {
      return themes.map(theme => theme.text).join(', ')
    }
  }

  search() {
    // TODO implement search filtering
  }

  startGame(gameId: string): void {
    this.gameService.startGame(gameId).subscribe(game => this.router.navigate(['game', game._id]));
  }

  createNewGame() {
    this.router.navigate(['newgame']);
  }
}
