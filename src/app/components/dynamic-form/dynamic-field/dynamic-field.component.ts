import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormElement } from '../../../models/form.model';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './dynamic-field.component.html',
  styleUrl: './dynamic-field.component.scss'
})
export class DynamicFieldComponent {
  @Input() field!: FormElement;
  @Input() formName!: FormGroup;

  get isValid(): boolean {
    return this.formName.controls[this.field.name].valid;
  }
}
