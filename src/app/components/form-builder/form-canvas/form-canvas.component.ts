import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from '../../../services/form-builder.service';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormItemType, FormElement } from '../../../models/form.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-canvas',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatIconModule, MatButtonModule],
  templateUrl: './form-canvas.component.html',
  styleUrl: './form-canvas.component.scss'
})
export class FormCanvasComponent {
  private formBuilderService = inject(FormBuilderService);

  // Отримуємо елементи з сервісу Signals
  elements = this.formBuilderService.elements;
  selectedElement = this.formBuilderService.selectedElement;

  constructor() {}

  selectElement(id: string, event: Event): void {
    event.stopPropagation();
    this.formBuilderService.selectElement(id);
  }

  deselectAll(event: Event): void {
    this.formBuilderService.selectElement(null);
  }

  removeElement(id: string, event: Event): void {
    event.stopPropagation();
    this.formBuilderService.removeElement(id);
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      // Переміщення в межах Canvas (сортування)
      this.formBuilderService.moveElement(event.previousIndex, event.currentIndex);
    } else {
      // Додавання нового елемента з Палітри
      const controlData = event.item.data as { type: FormItemType, label: string, icon: string };
      if (controlData && controlData.type) {
        this.formBuilderService.addElement(controlData.type);
        // Оскільки елемент завжди додається в кінець масиву в сервісі,
        // а ми кинули його у визначену позицію, треба перемістити його.
        // Переміщуємо з останньої позиції (length-1) на currentIndex:
        setTimeout(() => {
           const length = this.elements().length;
           if (length > 1 && event.currentIndex < length - 1) {
             this.formBuilderService.moveElement(length - 1, event.currentIndex);
           }
        });
      }
    }
  }

  getIconForType(type: FormItemType): string {
    const icons: Record<FormItemType, string> = {
      'input': 'short_text',
      'textarea': 'notes',
      'select': 'arrow_drop_down_circle',
      'checkbox': 'check_box',
      'radio': 'radio_button_checked',
      'datepicker': 'calendar_today',
      'daterange': 'date_range'
    };
    return icons[type] || 'code';
  }
}
