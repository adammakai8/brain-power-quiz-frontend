import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Theme } from 'src/app/model/theme';

@Component({
  selector: 'app-theme-create',
  templateUrl: './theme-modify.html',
  styleUrls: []
})
export class ThemeCreateComponent implements OnInit {

    isCreate = true;
    theme: Theme = new Theme();
    form: FormGroup;

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private service: ThemeService
    ) {
      this.form = this.fb.group({
        text: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      
    }

    update() {
      if (this.form.valid) {
        this.service.createTheme(this.form.value)
          .subscribe({
            next: () => this.router.navigate(['/theme']),
            error: (error) => console.error(error)
          });
      } else {
        console.log('invalid form');
        
      }
    }

}
