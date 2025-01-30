import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StarRatingComponent } from './star-rating/star-rating.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InlineEditComponent } from './inline-edit/inline-edit.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    StarRatingComponent,
    ReactiveFormsModule,
    InlineEditComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'control-acess-value';

  private formBuilder: FormBuilder = inject(FormBuilder);

  protected formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      rating: new FormControl(
        { value: null, disabled: false },
        Validators.required,
      ),
      comment: new FormControl(``),
    });
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
  }
}
