import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPaletteComponent } from '../form-palette/form-palette.component';
import { FormCanvasComponent } from '../form-canvas/form-canvas.component';
import { FormPropertiesComponent } from '../form-properties/form-properties.component';
import { JsonViewerComponent } from '../json-viewer/json-viewer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilderService } from '../../../services/form-builder.service';

@Component({
  selector: 'app-form-builder-container',
  standalone: true,
  imports: [
    CommonModule, 
    FormPaletteComponent, 
    FormCanvasComponent, 
    FormPropertiesComponent, 
    JsonViewerComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './form-builder-container.component.html',
  styleUrl: './form-builder-container.component.scss'
})
export class FormBuilderContainerComponent {
  public fbService = inject(FormBuilderService);
}
