import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppInjector } from 'src/app/app.module';
import { Forum } from 'src/app/model/forum';
import { Question } from 'src/app/model/question';
import { Theme } from 'src/app/model/theme';
import { ForumService } from 'src/app/services/forum.service';
import { QuestionService } from 'src/app/services/question.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-entity-lister',
  templateUrl: './entity-lister.component.html',
  styleUrls: ['./entity-lister.component.scss']
})
export class EntityListerComponent implements OnInit {

  mode: string = "";

  public isLoading: Promise<boolean> | undefined;
  public entities: any[] = [];
  public currentEntities: any[] = [];
  private index: number = 0;
  private length: number = 5;
  protected router: Router = AppInjector.get(Router);
  private themeService: ThemeService = AppInjector.get(ThemeService);
  private questionService: QuestionService = AppInjector.get(QuestionService);
  private forumService: ForumService = AppInjector.get(ForumService);
  constructor() {
    this.mode = this.router.url.split("/")[1];
  }

  ngOnInit() {
    this.getAll();
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
      }
      if(value === 2) {
        this.index = Math.floor(this.entities.length / this.length);
      }
      if(value === -1) {
        if(this.index - 1 < 0) return;
        else {
          this.index -= 1;
        }
      }
      if(value === 0) {
        if(this.index * this.length >= this.entities.length) this.index -= 1;
      }
      this.setCurrentThemes();
  }

  public deleteEntity(_id: any) {
    this.getServiceByMode()!.delete(_id).subscribe({
      next: () => {
        this.entities = this.entities.filter((theme) => theme._id !== _id);
        this.changeCurrentEntities(0);
      },
      error: (error) => {console.error(error);}
    })
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

  private getServiceByMode() {
    if(this.mode === "theme") return this.themeService;
    if(this.mode === "question") return this.questionService;
    if(this.mode === "forum") return this.forumService;
    return null;
  }

  private getAllEntityByMode(): Observable<any> | null {
    if(this.mode === "theme") return this.themeService.getAll();
    if(this.mode === "question") return this.questionService.getAll();
    if(this.mode === "forum") return this.forumService.getAll();
    return null;
  }

  protected getAll() {
    this.getAllEntityByMode()!.subscribe({
        next: (datas: Theme[] | Question[] | Forum[]) => {
            datas.forEach(entity => {
            this.entities.push(entity);
            if(this.entities.length <= this.length) this.currentEntities.push(entity);
            });
        },
        error: (error: any) => {
          console.warn(error);
        },
        complete: () => {
          this.isLoading = Promise.resolve(true);
        }
    });
  }
}
