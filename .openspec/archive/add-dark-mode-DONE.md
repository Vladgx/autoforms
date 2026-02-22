# Feature Proposal: Add Dark Mode

## Context & Objectives
As part of the OpenSpec workflow (`/opsx:new add-dark-mode`), this document outlines the specification for adding a global Dark Mode theme to the AutoForms application.
The goal is to allow users to switch between light and dark themes seamlessly. The selected theme should ideally persist between sessions.

## 1. Design & Styling (Angular Material Theming)
- **`styles.scss` modifications:** Current Angular Material theme uses a primary palette (azure/blue) and density styling. We need to define an explicit dark theme class (e.g., `.dark-theme`) using Material's M3 theming mixins, or leverage the built-in dark palette support.
- Custom SCSS styles across the application (like `#f5f5f5` backgrounds or `#333` text colors in JSON Viewer and Canvas) must use CSS variables or `mat.get-color-from-palette` or simply adapt to a `body.dark-theme` parent selector.

## 2. State Management (`FormBuilderService`)
- Add a new signal: `isDarkMode = signal<boolean>(false)`.
- Create a `toggleTheme()` method.
- Optionally, on initialization, read from `localStorage.getItem('theme')` to restore the user's preference.

## 3. UI Integration
- Add a Toggle Button (e.g., `<mat-icon>dark_mode</mat-icon>`) to the top application header. Since there is currently no top global header, it should be added to the `app.html` or the top of `FormBuilderContainer`.
- When the `isDarkMode` signal is true, a `dark-theme` CSS class should be applied dynamically to the `<body>` element or the root `<html>`/`<app-root>` tag.

## Execution Plan
Once this specification is approved, we will transition to `/opsx:apply` and execute the following:
1. Update `styles.scss` mapping.
2. Update component SCSS to support the new dark colors where hardcoded colors exist.
3. Add theme toggle logic in `FormBuilderService`.
4. Add the toggle button in the main layout (`FormBuilderContainer`).

---
*Please review this proposal. If it looks good, respond with **`/opsx:apply add-dark-mode`** to begin implementation.*
