import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { QuizSettingsComponent } from './pages/quiz-settings/quiz-settings.component';
import { AdminLoginComponent } from './pages/login/adminlogin.component';
import { ThemeComponent } from './pages/admin/theme/theme.component';
import { QuestionComponent } from './pages/admin/question/question.component';
import { ThemeCreateComponent } from './pages/admin/theme/theme-create.component';
import { ThemeUpdateComponent } from './pages/admin/theme/theme-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'theme', component: ThemeComponent },
  { path: 'theme/create', component: ThemeCreateComponent },
  { path: 'theme/update/:id', component: ThemeUpdateComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'newgame', component: QuizSettingsComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
