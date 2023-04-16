import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      birthYear: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  register(): void {
    if (this.form.valid) {
      this.service.register(this.form.value)
        .subscribe(() => this.router.navigate(['home']));
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }

}
