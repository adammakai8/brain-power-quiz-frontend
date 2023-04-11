import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  form: FormGroup;
  isAdmin=true;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  login(): void {
    if (this.form.valid) {
      this.service.login(this.form.value)
        .subscribe(() => this.router.navigate(['theme']));
    } else {
      console.log('invalid form');
      
    }
  }

  navigateToRegister(): void {}
}
