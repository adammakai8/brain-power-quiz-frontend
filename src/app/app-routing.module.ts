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
import { GameComponent } from './pages/game/game.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ForumBrowserComponent } from './pages/forum-browser/forum-browser.component';
import { AdminAuthGuard } from './authguard/admin-auth.guard';
import { RanklistComponent } from './pages/ranklist/ranklist.component';
import { ForumComponent } from './pages/forum/forum.component';

const adminRoute: string = 'admin/';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: adminRoute + 'theme', component: EntityListerComponent, canActivate: [AdminAuthGuard] },
  { path: adminRoute + 'theme/create', component: ThemeCreateComponent, canActivate: [AdminAuthGuard] },
  { path: adminRoute + 'theme/update/:id', component: ThemeUpdateComponent, canActivate: [AdminAuthGuard] },
  { path: adminRoute + 'question', component: EntityListerComponent, canActivate: [AdminAuthGuard] },
  { path: adminRoute + 'question/create', component: QuestionCreateComponent, canActivate: [AdminAuthGuard] },
  { path: adminRoute + 'question/update/:id', component: QuestionUpdateComponent, canActivate: [AdminAuthGuard] },
  { path: adminRoute + 'forum', component: EntityListerComponent, canActivate: [AdminAuthGuard] },
  { path: 'forum', component: ForumBrowserComponent, canActivate: [AuthGuard] },
  { path: 'forum/:id', component: ForumComponent, canActivate: [AuthGuard] },
  { path: 'newgame', component: QuizSettingsComponent, canActivate: [AuthGuard] },
  { path: 'browser', component: QuizBrowserComponent, canActivate: [AuthGuard] },
  { path: 'game/:id', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'ranklist', component: RanklistComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
