import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/form-builder/form-builder-container/form-builder-container.component').then(m => m.FormBuilderContainerComponent) }
];
