import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCollapseModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { HomeComponent } from './pages/home/home.component';
import { QuizSettingsComponent } from './pages/quiz-settings/quiz-settings.component';
import { GameComponent } from './pages/game/game.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { QuizBrowserComponent } from './pages/quiz-browser/quiz-browser.component';
import { AdminLoginComponent } from './pages/login/adminlogin.component';
import { ThemeCreateComponent } from './pages/admin/theme/theme-create.component';
import { AdminnavbarComponent } from './pages/admin/adminnavbar/adminnavbar.component';
import { TokenInterceptor } from './services/api-interceptor.service';
import { ThemeUpdateComponent } from './pages/admin/theme/theme-update.component';
import { EntityListerComponent } from './pages/admin/entity-lister/entity-lister.component';
import { QuestionCreateComponent } from './pages/admin/question/question-create.component';
import { QuestionUpdateComponent } from './pages/admin/question/question-update.component';
import { QuestionService } from './services/question.service';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ForumBrowserComponent } from './pages/forum-browser/forum-browser.component';
import { RanklistComponent } from './pages/ranklist/ranklist.component';
import { ForumComponent } from './pages/forum/forum.component';
import { UserStatsComponent } from './dialogs/user-stats/user-stats.component';

export let AppInjector: Injector;

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    LoginComponent,
    HomeComponent,
    QuizSettingsComponent,
    GameComponent,
    RegisterComponent,
    QuizBrowserComponent,
    RegisterComponent,
    ThemeCreateComponent,
    ThemeUpdateComponent,
    AdminnavbarComponent,
    EntityListerComponent,
    QuestionCreateComponent,
    QuestionUpdateComponent,
    StatisticsComponent,
    ForumBrowserComponent,
    RanklistComponent,
    UserStatsComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    FormsModule,
    NgbCollapseModule,

    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [
    AuthService,
    ThemeService,
    QuestionService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
