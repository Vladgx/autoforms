import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from '../../../services/form-builder.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormElement, FormElementOption } from '../../../models/form.model';

@Component({
  selector: 'app-form-properties',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './form-properties.component.html',
  styleUrl: './form-properties.component.scss'
})
export class FormPropertiesComponent {
  private formBuilderService = inject(FormBuilderService);
  private fb = inject(FormBuilder);

  selectedElement = this.formBuilderService.selectedElement;
  propertiesForm: FormGroup;

  // Використовуємо effect() для відслідковування зміни обраного елемента та заповнення форми
  constructor() {
    this.propertiesForm = this.fb.group({
      label: ['', Validators.required],
      name: ['', Validators.required],
      placeholder: [''],
      required: [false],
      options: this.fb.array([]),
      startDateLabel: [''],
      endDateLabel: ['']
    });

    effect(() => {
      const el = this.selectedElement();
      if (el) {
        this.updateFormWithValue(el);
      }
    });

    // Підписуємось на зміни форми щоб апдейтити елемент в сервісі
    this.propertiesForm.valueChanges.subscribe(value => {
      const el = this.selectedElement();
      if (el && this.propertiesForm.valid) {
        this.formBuilderService.updateElement(el.id, value);
      }
    });
  }

  get optionsArray(): FormArray {
    return this.propertiesForm.get('options') as FormArray;
  }

  hasOptions(type: string | undefined): boolean {
    return type === 'select' || type === 'radio';
  }

  isDaterange(type: string | undefined): boolean {
    return type === 'daterange';
  }

  addOption(): void {
    const optionGroup = this.fb.group({
      label: ['New Option'],
      value: ['newOption']
    });
    this.optionsArray.push(optionGroup);
  }

  removeOption(index: number): void {
    this.optionsArray.removeAt(index);
  }

  private updateFormWithValue(el: FormElement): void {
    // Встановлюємо значення без triggerEvent щоб уникнути loop
    this.propertiesForm.patchValue({
      label: el.label,
      name: el.name,
      placeholder: el.placeholder || '',
      required: el.required || false,
      startDateLabel: el.startDateLabel || '',
      endDateLabel: el.endDateLabel || ''
    }, { emitEvent: false });

    // Оновлюємо FormArray для опцій
    this.optionsArray.clear({ emitEvent: false });
    if (this.hasOptions(el.type) && el.options) {
      el.options.forEach(opt => {
        this.optionsArray.push(this.fb.group({
          label: [opt.label],
          value: [opt.value]
        }), { emitEvent: false });
      });
    }
  }
}
