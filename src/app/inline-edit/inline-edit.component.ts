import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
@Component({
  selector: 'app-inline-edit',
  standalone: true,
  imports: [],
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

  // @ts-ignore
  onChanged: (value: any) => console.log;
  // @ts-ignore
  onTouched: () => void;

  writeValue(value: string): void {
    console.log('Write Value');
    this.value = value;
    // this.onChanged(value);
  }

  registerOnChange(fn: any): void {
    console.log('Register On Change');
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onInputChanged(value: string): void {
    console.log('Input Changed', value);
    this.value = value.replace(/[^A-Z0-9]+/ig, "_");
    this.onChanged(value);
  }
}
