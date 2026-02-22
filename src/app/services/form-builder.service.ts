import { Injectable, computed, signal } from '@angular/core';
import { FormElement, FormItemType, FormSchema } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  // Використовуємо Angular Signals для стейт-менеджменту
  private elementsSignal = signal<FormElement[]>([]);
  private selectedElementIdSignal = signal<string | null>(null);
  private isDarkModeSignal = signal<boolean>(false);

  // Публічні read-only сигнали для компонентів
  public readonly elements = this.elementsSignal.asReadonly();
  public readonly selectedElement = computed(() => 
    this.elementsSignal().find(el => el.id === this.selectedElementIdSignal()) || null
  );
  public readonly isDarkMode = this.isDarkModeSignal.asReadonly();

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('autoforms_theme');
    if (savedTheme === 'dark') {
      this.isDarkModeSignal.set(true);
      document.documentElement.classList.add('dark-theme');
    }
  }

  public toggleTheme(): void {
    const currentTheme = this.isDarkModeSignal();
    const newTheme = !currentTheme;
    this.isDarkModeSignal.set(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('autoforms_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('autoforms_theme', 'light');
    }
  }

  public addElement(type: FormItemType): void {
    const newElement: FormElement = {
      id: this.generateId(),
      type,
      name: `field_${Date.now()}`,
      label: `New ${this.capitalize(type)}`,
      required: false,
      placeholder: '',
      // Додаємо дефолтні опції для селектів та радіо кнопок
      ...(type === 'select' || type === 'radio' ? { options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ]} : {})
    };

    this.elementsSignal.update(elements => [...elements, newElement]);
    this.selectElement(newElement.id); // Автоматично обираємо щойно створений елемент
  }

  public removeElement(id: string): void {
    this.elementsSignal.update(elements => elements.filter(el => el.id !== id));
    
    // Якщо видалили обраний елемент, скидаємо виділення
    if (this.selectedElementIdSignal() === id) {
      this.selectedElementIdSignal.set(null);
    }
  }

  public selectElement(id: string | null): void {
    this.selectedElementIdSignal.set(id);
  }

  public updateElement(id: string, updates: Partial<FormElement>): void {
    this.elementsSignal.update(elements => 
      elements.map(el => el.id === id ? { ...el, ...updates } : el)
    );
  }

  public moveElement(previousIndex: number, currentIndex: number): void {
    this.elementsSignal.update(elements => {
      const newElements = [...elements];
      // Видаляємо елемент зі старої позиції
      const [movedElement] = newElements.splice(previousIndex, 1);
      // Вставляємо на нову позицію
      newElements.splice(currentIndex, 0, movedElement);
      return newElements;
    });
  }

  public getFormSchema(): FormSchema {
    return {
      elements: this.elementsSignal()
    };
  }

  public loadFormSchema(schema: FormSchema): void {
    this.elementsSignal.set(schema.elements || []);
    this.selectedElementIdSignal.set(null);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
