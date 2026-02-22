import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSchema } from '../../../models/form.model';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicFieldComponent, MatButtonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnChanges {
  @Input() schema!: FormSchema;
  @Output() formSubmit = new EventEmitter<any>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'] && this.schema) {
      this.buildForm();
    }
  }

  private buildForm(): void {
    const group: any = {};
    
    if (this.schema && this.schema.elements) {
      this.schema.elements.forEach(element => {
        const validators = element.required ? [Validators.required] : [];
        
        if (element.type === 'daterange') {
          // Для daterange реєструємо два окремих контроли
          group[`${element.name}_start`] = ['', validators];
          group[`${element.name}_end`] = ['', validators];
        } else {
          group[element.name] = ['', validators];
        }
      });
    }

    this.form = this.fb.group(group);
  }

  private formatDate(val: Date): string {
    const year = val.getFullYear();
    const month = String(val.getMonth() + 1).padStart(2, '0');
    const day = String(val.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const rawValue = this.form.value;
      const formattedValue = { ...rawValue };

      Object.keys(formattedValue).forEach(key => {
        const val = formattedValue[key];
        if (val instanceof Date) {
          formattedValue[key] = this.formatDate(val);
        }
      });

      this.formSubmit.emit(formattedValue);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
