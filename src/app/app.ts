import { Component, signal } from '@angular/core';
import { FormBuilderContainerComponent } from './components/form-builder/form-builder-container/form-builder-container.component';

@Component({
  selector: 'app-root',
  imports: [FormBuilderContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('form-builder');
}
