import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true,
    },
  ],
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input() ratings: any[] = [
    { stars: 1, text: 'Péssimo' },
    { stars: 2, text: 'Ruim' },
    { stars: 3, text: 'Regular' },
    { stars: 4, text: 'Bom' },
    { stars: 5, text: 'Ótimo!' },
  ];

  ratingText = '';
  displayText = '';

  protected value!: number;
  protected disabled!: boolean;

  // @ts-ignore
  onChanged:(value: number) => {};
  // @ts-ignore
  onTouched: () => void;

  writeValue(value: number): void {
    console.log(`WriteValue`);
    this.onChanged(value)
    this.value = value;
  }

  registerOnChange(fn: any): void {
    console.log('OnChange')
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setRating(rating: any): void {
    if (!this.disabled) {
      this.ratingText = rating.text;
      this.writeValue(rating.stars);
      this.onChanged(rating.stars);
      this.onTouched();
    }
  }
}
