# Feature Proposal: Add Period (Daterange) Component

## Context & Objectives
This proposal (`/opsx:new add-period-component`) introduces a new form element type called **"Period"** (Daterange Picker).
It allows users to select two dates (start date and end date) using a single Material calendar input and returns them as a structured pair.

## 1. New FormItemType
- Add `'daterange'` to the `FormItemType` union in `src/app/models/form.model.ts`.
- Add two optional fields to `FormElement`:
  - `startDateLabel?: string` — label for the start date input (default: `"Від"`)
  - `endDateLabel?: string` — label for the end date input (default: `"До"`)

## 2. DynamicFieldComponent
- Add a new `*ngIf="field.type === 'daterange'"` branch in `dynamic-field.component.html`.
- Use Angular Material's **`<mat-date-range-input>`** with `<mat-datepicker-range-input>`, wrapping two `<input>` tags: `matStartDate` and `matEndDate`.
- Use `<mat-date-range-picker #rangePicker>` to render the calendar.
- Register two `FormControl` values in `DynamicFormComponent` for each daterange field: `{fieldName}_start` and `{fieldName}_end`.
- On submit, both values are formatted to `YYYY-MM-DD` strings (same logic as for `datepicker`).

## 3. FormBuilderService & Palette
- Add `'daterange'` to the existing `PALETTE_ITEMS` array in `FormPaletteComponent` with label **"Період"** and icon `date_range`.
- `FormBuilderService.addElement()` already handles generic creation — no changes needed there.

## 4. FormPropertiesComponent
- Add `startDateLabel` and `endDateLabel` input fields in the properties panel when the selected element type is `'daterange'`.

## 5. Submission Format
- Output object from `onSubmit()` should contain:
  ```json
  {
    "myPeriod_start": "2026-01-01",
    "myPeriod_end": "2026-03-31"
  }
  ```

## Verification Plan
1. Add a "Період" element from the palette to canvas.
2. Open the Properties panel — verify `startDateLabel`/`endDateLabel` fields appear.
3. Open Form Preview — the daterange field should display two linked date inputs and a calendar picker.
4. Select a range and submit — confirm the output JSON contains two clean `YYYY-MM-DD` date strings.

---
*If approved, respond with **`/opsx:apply add-period-component`** to begin implementation.*
