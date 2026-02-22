import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormItemType } from '../../../models/form.model';
import { FormBuilderService } from '../../../services/form-builder.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-form-palette',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './form-palette.component.html',
  styleUrl: './form-palette.component.scss'
})
export class FormPaletteComponent {
  
  availableControls: { type: FormItemType, label: string, icon: string }[] = [
    { type: 'input', label: 'Текстове поле', icon: 'short_text' },
    { type: 'textarea', label: 'Багаторядковий текст', icon: 'notes' },
    { type: 'select', label: 'Випадаючий список', icon: 'arrow_drop_down_circle' },
    { type: 'checkbox', label: 'Чекбокс', icon: 'check_box' },
    { type: 'radio', label: 'Радіо кнопки', icon: 'radio_button_checked' },
    { type: 'datepicker', label: 'Вибір дати', icon: 'calendar_today' },
    { type: 'daterange', label: 'Період', icon: 'date_range' }
  ];

  constructor(private formBuilderService: FormBuilderService) {}

  public addElement(type: FormItemType): void {
    this.formBuilderService.addElement(type);
  }
}
