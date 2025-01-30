import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InlineEditComponent } from './inline-edit.component';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-inline-edit-test',
  standalone: true,
  template: `
    <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
      <app-inline-edit formControlName="test"></app-inline-edit>
    </form>
  `,
  imports: [InlineEditComponent, ReactiveFormsModule],
})
class InlineEditTestComponent {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      test: this.formBuilder.control(''),
    });
  }

  onSubmit(): void {}
}

fdescribe('InlineEditComponent', () => {
  let component: InlineEditTestComponent;
  let fixture: ComponentFixture<InlineEditTestComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InlineEditComponent, InlineEditTestComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(InlineEditTestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the input value by formGroup from inline-edit', () => {
    fixture.detectChanges();

    const componentInstance = debugElement.query(
      By.directive(InlineEditComponent),
    ).componentInstance;
    component.formGroup.get('test')?.setValue('test');

    fixture.detectChanges();

    const inputElement = debugElement.query(By.css('input'));
    inputElement.triggerEventHandler('input', null);

    expect(componentInstance.value).toBe('test');
    expect(inputElement.nativeElement.value).toBe('test');
  });

  it('should validate the input value by nativeElement from inline-edit', () => {
    fixture.detectChanges();

    const inputElement = debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.formGroup.get('test')?.value).toBe('new value');
  });
});
