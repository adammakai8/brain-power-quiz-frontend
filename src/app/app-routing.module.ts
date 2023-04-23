import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { QuizSettingsComponent } from './pages/quiz-settings/quiz-settings.component';
import { QuizBrowserComponent } from './pages/quiz-browser/quiz-browser.component';
import { AdminLoginComponent } from './pages/login/adminlogin.component';
import { ThemeCreateComponent } from './pages/admin/theme/theme-create.component';
import { ThemeUpdateComponent } from './pages/admin/theme/theme-update.component';
import { EntityListerComponent } from './pages/admin/entity-lister/entity-lister.component';
import { QuestionCreateComponent } from './pages/admin/question/question-create.component';
import { QuestionUpdateComponent } from './pages/admin/question/question-update.component';
import { AuthGuard } from './authguard/authguard.guard';
import { ReverseGuard } from './authguard/reverse.guard';
import { GameComponent } from './pages/game/game.component';
import { Game } from './model/game';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'theme', component: EntityListerComponent, canActivate: [AuthGuard] },
  { path: 'theme/create', component: ThemeCreateComponent, canActivate: [AuthGuard] },
  { path: 'theme/update/:id', component: ThemeUpdateComponent, canActivate: [AuthGuard] },
  { path: 'question', component: EntityListerComponent, canActivate: [AuthGuard] },
  { path: 'question/create', component: QuestionCreateComponent, canActivate: [AuthGuard] },
  { path: 'question/update/:id', component: QuestionUpdateComponent, canActivate: [AuthGuard] },
  { path: 'forum', component: EntityListerComponent, canActivate: [AuthGuard] },
  { path: 'newgame', component: QuizSettingsComponent, canActivate: [AuthGuard] },
  { path: 'browser', component: QuizBrowserComponent, canActivate: [AuthGuard] },
  { path: 'game/:id', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
