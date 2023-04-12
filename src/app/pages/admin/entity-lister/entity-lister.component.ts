import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { AppInjector } from 'src/app/app.module';
import { QuestionService } from 'src/app/services/question.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-entity-lister',
  templateUrl: './entity-lister.component.html',
  styleUrls: ['./entity-lister.component.scss']
})
export class EntityListerComponent implements OnInit {

  mode: string = "";

  public entities: any[] = [];
  public currentEntities: any[] = [];
  private index: number = 0;
  private length: number = 5;
  protected router: Router = AppInjector.get(Router);
  private themeService: ThemeService = AppInjector.get(ThemeService);
  private questionService: QuestionService = AppInjector.get(QuestionService);
  constructor() {
    this.mode = this.router.url.split("/")[1];
  }

  ngOnInit(): void {
    this.getAll(this.mode);
  }

  /*
  Change the index according to we want the next 'length' themes,
  or the previous. If the value is 0, than a delete happened before,
  and the function checks, that is it need to get the previous themes,
  or not.
  */
  public changeCurrentEntities(value: number) {
      if(value === 1) {
        if((this.index + 1) * this.length >= this.entities.length) return;
        else {
          this.index += 1;
        }
      } else if(value === -1) {
        if(this.index - 1 < 0) return;
        else {
          this.index -= 1;
        }
      } else {
        if(this.index * this.length >= this.entities.length) this.index -= 1;
      }
      this.setCurrentThemes();
  }

  public deleteEntity(_id: any) {
      if(this.mode === "theme") {
          this.themeService.deleteTheme(_id).subscribe({
            next: () => {
              this.entities = this.entities.filter((theme) => theme._id !== _id);
              this.changeCurrentEntities(0);
            },
            error: (error) => {console.error(error);}
          });
      }
      if(this.mode === "question") {
        this.questionService.deleteQuestion(_id).subscribe({
          next: () => {
            this.entities = this.entities.filter((question) => question._id !== _id);
            this.changeCurrentEntities(0);
          },
          error: (error) => {console.error(error);}
        });
      }
      return null;
  }

    protected getEntities() {
        return this.entities;
    }

  protected getCurrentEntities() {
      return this.currentEntities;
  }

  private setCurrentThemes() {
      this.currentEntities = this.entities.slice(this.index * this.length, (this.index + 1) * this.length);
  }

  protected getAll(mode: string) {
      if(mode === "theme") {
          this.themeService.getThemes().subscribe({
              next: (datas) => {
                  datas.forEach(theme => {
                  this.entities.push(theme);
                  if(this.entities.length <= this.length) this.currentEntities.push(theme);
                  });
              },
              error: (error) => {console.warn(error);}
          });
      }
      if(mode === "question") {
        this.questionService.getQuestions().subscribe({
          next: (datas) => {
            datas.forEach(question => {
              this.entities.push(question);
              if(this.entities.length <= this.length) this.currentEntities.push(question);
            })
          },
          error: (error) => {console.error(error);}
        })
      }
  }
}
