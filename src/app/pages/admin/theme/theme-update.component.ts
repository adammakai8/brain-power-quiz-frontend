import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/model/theme';
import { ThemeService } from 'src/app/services/theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-theme-update',
  templateUrl: './theme-modify.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeUpdateComponent implements OnInit {

    isCreate = false;
    theme: Theme = new Theme();
    form: FormGroup;

    constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private service: ThemeService
    ) {
      this.form = this.fb.group({
        text: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')!;
  
        this.service.getThemeByID(id).subscribe((theme) => this.theme = new Theme(theme));
    }

    update() {
      if (this.form.valid) {
        this.theme.text = this.form.value.text;
        console.log(this.theme);
        this.service.updateTheme(this.theme)
          .subscribe({
            next: () => this.router.navigate(['/theme']),
            error: (error) => console.error(error)
          });
      } else {
        console.log('invalid form');
        
      }
    }

}
