# Architecture Specification

## 1. Data Models
The application relies heavily on `FormElement` and `FormSchema` interfaces to define input fields dynamically.
All form fields are strictly typed, including options for `select` and `radio` types.

## 2. Dynamic Component Rendering
The `DynamicFormComponent` dynamically loops through the JSON schema, matching the `type` property of an element ('input', 'textarea', 'select', 'checkbox', 'radio', 'datepicker') and rendering it via the `<app-dynamic-field>` component.
Validation (like `Validators.required`) is injected at runtime based on the `required` boolean property within the schema.

## 3. Visual Builder
The builder implements `@angular/cdk/drag-drop` allowing components to be moved from `FormPalette` to `FormCanvas` and sorted within the canvas.
Selecting an element triggers a signal update in `FormBuilderService` which reflects its properties within `FormPropertiesComponent` for real-time reactive editing.

## 4. Submission Format
Dates selected within MatDatepicker are automatically formatted to `YYYY-MM-DD` string omitting the timezone via custom `onSubmit()` lifecycle logic before the form is submitted to an API or visually shown in a dialog box.
