import {ChangeDetectionStrategy, Component, forwardRef, inject} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
@Component({
  selector: 'app-inline-edit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './inline-edit.component.html',
  styleUrl: './inline-edit.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InlineEditComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineEditComponent implements ControlValueAccessor {
  protected value!: string;
  protected disabled!: boolean;

  private ngControl = inject(NgControl);

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  // @ts-ignore
  onChange?: (value: any) => {};
  // @ts-ignore
  onTouched?: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
