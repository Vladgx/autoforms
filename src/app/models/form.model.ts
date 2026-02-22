export type FormItemType = 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'datepicker' | 'daterange';

export interface FormElementOption {
  value: string | number | boolean;
  label: string;
}

export interface FormElement {
  id: string;
  type: FormItemType;
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  options?: FormElementOption[]; // Для елементів select та radio
  startDateLabel?: string;       // Для daterange: мітка поля початку
  endDateLabel?: string;         // Для daterange: мітка поля кінця
}

export interface FormSchema {
  elements: FormElement[];
}
