import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [
    {provide: 'component', useValue: 'questions'}
  ]
})
export class QuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
