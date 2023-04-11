import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Theme } from 'src/app/model/theme';
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

  isCollapsed = false;

  constructor(
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private router: Router,
    private themeService: ThemeService
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

  search() {
  }

  createNewGame() {
    this.router.navigate(['newgame']);
  }
}
