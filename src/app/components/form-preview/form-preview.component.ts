import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from '../../services/form-builder.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form/dynamic-form.component';
import { FormSchema } from '../../models/form.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-preview',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.scss'
})
export class FormPreviewComponent implements OnInit {
  private formBuilderService = inject(FormBuilderService);
  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<FormPreviewComponent>);

  @ViewChild('resultDialog') resultDialog!: TemplateRef<any>;

  schema!: FormSchema;
  submittedData: any = null;

  ngOnInit(): void {
    this.schema = this.formBuilderService.getFormSchema();
  }

  onFormSubmit(data: any): void {
    this.submittedData = data;
    this.dialog.open(this.resultDialog, {
      width: '450px'
    });
  }

  closePreview(): void {
    this.dialogRef.close();
  }
}
