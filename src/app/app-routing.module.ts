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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'theme', component: EntityListerComponent },
  { path: 'theme/create', component: ThemeCreateComponent },
  { path: 'theme/update/:id', component: ThemeUpdateComponent },
  { path: 'question', component: EntityListerComponent },
  { path: 'question/create', component: QuestionCreateComponent },
  { path: 'question/update/:id', component: QuestionUpdateComponent },
  { path: 'newgame', component: QuizSettingsComponent },
  { path: 'browser', component: QuizBrowserComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
