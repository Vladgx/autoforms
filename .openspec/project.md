# Project Context

## Overview
AutoForms - is a dynamic visual Form Builder application built with Angular 18 and Angular Material. It allows users to drag & drop form controls onto a canvas, configure their properties, and generate a final JSON Schema that can be instantly rendered back into a fully functional Reactive Form.

## Tech Stack
- Framework: Angular 18 (Standalone components)
- UI Library: Angular Material, CDK (Drag & Drop)
- Styling: SCSS
- State Management: Angular Signals (FormBuilderService)
- Routing: Angular Router

## Core Files Structure
- `src/app/models/form.model.ts`: Primary TypeScript interfaces defining FormSchema and FormElement objects
- `src/app/services/form-builder.service.ts`: Central store handling signals for elements state and active item selection
- `src/app/components/form-builder/*`: The UI Editor containing Palette, Canvas, Properties, and JSON Viewer
- `src/app/components/dynamic-form/*`: The Rendering Engine transforming FormSchema into actual FormControl objects
- `src/app/components/form-preview/*`: Full-screen modal overlay for testing generated forms
