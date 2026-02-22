import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from '../../../services/form-builder.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormPreviewComponent } from '../../form-preview/form-preview.component';

@Component({
  selector: 'app-json-viewer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './json-viewer.component.html',
  styleUrl: './json-viewer.component.scss'
})
export class JsonViewerComponent {
  private formBuilderService = inject(FormBuilderService);
  private dialog = inject(MatDialog);

  // Computed сигнал, який повертає відформатований JSON-рядок
  jsonSchema = computed(() => {
    const schema = this.formBuilderService.getFormSchema();
    return JSON.stringify(schema, null, 2);
  });

  openPreview() {
    this.dialog.open(FormPreviewComponent, {
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '90vh'
    });
  }
}
