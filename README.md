# Dynamic Form Renderer

A React application for rendering dynamic forms based on a schema. This project uses TypeScript, Tailwind CSS, Vite, and Recoil for state management. The form fields, validation, and UI are generated dynamically from a JSON schema.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Schema Format](#schema-format)
- [Component Overview](#component-overview)
- [Validation](#validation)
- [Testing](#testing)
- [Deployment](#deployment)


---

## Features

- **Dynamic Form Rendering**: Generate forms from a JSON schema.
- **TypeScript**: Type-safe codebase.
- **Tailwind CSS**: Utility-first styling.
- **Recoil**: State management for form values and errors.
- **Validation**: Required fields and type-specific validation.
- **Tested**: Unit tests for hooks and validation logic.
- **GitHub Pages Deployment**: Easily deploy your app.

---

## Project Structure

```
src/
  components/         # Reusable form field components
    CheckboxField/
    DateField/
    FieldRenderer/
    FormRenderer/
    NumberField/
    RadioField/
    SelectField/
    TextareaField/
    TextField/
  hooks/              # Custom React hooks (e.g., useFormState)
  mock/               # Example schema JSON
  recoil/             # Recoil atoms/selectors for state management
  types/              # TypeScript types for schema and fields
  utils/              # Utility functions (e.g., validation)
  App.tsx             # Main app component
  main.tsx            # Entry point
  index.css           # Global styles (includes Tailwind)
```

---

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Run the development server:**

   ```sh
   npm run dev
   ```

3. **Build for production:**

   ```sh
   npm run build
   ```

4. **Preview the production build:**

   ```sh
   npm run preview
   ```

---

## Schema Format

The form schema is defined in JSON (see [`src/mock/schema.json`](src/mock/schema.json)):

```json
{
  "title": "User Registration",
  "fields": [
    { "label": "Name", "type": "text", "name": "name", "required": true },
    { "label": "Description", "type": "textarea", "name": "description", "required": true },
    { "label": "Age", "type": "number", "name": "age", "required": true },
    { "label": "Subscribe", "type": "checkbox", "name": "subscribe", "required": true },
    { "label": "Date of Birth", "type": "date", "name": "dob", "required": true },
    {
      "label": "Hobbies",
      "type": "radio",
      "name": "hobbies",
      "options": ["Reading", "Traveling", "Cooking"],
      "required": true
    },
    {
      "label": "Gender",
      "type": "select",
      "name": "gender",
      "options": ["Male", "Female", "Other"],
      "required": true
    }
  ]
}
```

---

## Component Overview

### [`App`](src/App.tsx)

- Main entry point.
- Loads the schema and renders the [`FormRenderer`](src/components/FormRenderer/FormRenderer.tsx).
- Displays submitted form data.

### [`FormRenderer`](src/components/FormRenderer/FormRenderer.tsx)

- Receives a schema and renders a form.
- Handles form submission and reset.
- Uses [`useFormState`](src/hooks/useFormState.ts) for state and validation.

### [`FieldRenderer`](src/components/FieldRenderer/FieldRenderer.tsx)

- Receives a field definition and delegates rendering to the appropriate field component based on type.

### Field Components

- [`TextField`](src/components/TextField/TextField.tsx): Renders a text input.
- [`TextareaField`](src/components/TextareaField/TextareaField.tsx): Renders a textarea.
- [`NumberField`](src/components/NumberField/NumberField.tsx): Renders a number input.
- [`CheckboxField`](src/components/CheckboxField/CheckboxField.tsx): Renders a checkbox.
- [`DateField`](src/components/DateField/DateField.tsx): Renders a date picker.
- [`RadioField`](src/components/RadioField/RadioField.tsx): Renders a group of radio buttons.
- [`SelectField`](src/components/SelectField/SelectField.tsx): Renders a dropdown select.

### [`useFormState`](src/hooks/useFormState.ts)

- Custom hook for managing form values and errors using Recoil.
- Provides `handleChange`, `handleSubmit`, and `reset` methods.

### Recoil Atoms

- [`formValuesAtom`](src/recoil/atoms.ts): Stores current form values.
- [`formErrorsAtom`](src/recoil/atoms.ts): Stores current form errors.
- [`formSubmittedValuesAtom`](src/recoil/atoms.ts): Stores submitted form data.

---

## Validation

Validation logic is handled in [`validateForm`](src/utils/validation.ts):

- Checks for required fields.
- Type-specific validation (e.g., numbers must be valid, text fields cannot be only numbers).
- Returns an object mapping field names to error messages.

---

## Testing

- Tests are written using Jest and React Testing Library.
- Example test for [`useFormState`](src/hooks/useFormState.test.ts):

  ```sh
  npm test
  ```

- To run tests in watch mode:

  ```sh
  npm run test:watch
  ```

---

## Deployment

This project is configured for deployment to GitHub Pages.

- Build and deploy using:

  ```sh
  npm run deploy
  ```

- See the GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---


## Future Scope

- **Custom Validation Rules**: Allow users to define advanced validation logic, such as regex patterns, min/max values, or cross-field dependencies.
- **Conditional Fields**: Support for showing or hiding fields dynamically based on the values of other fields.
- **Field Grouping and Nested Forms**: Enable grouping of related fields and support for nested schemas to handle complex form structures.
- **File Uploads**: Add support for file input fields and file upload handling.
- **UI Customization**: Allow schema authors to specify custom styles, layouts, or even custom React components for individual fields.
- **Internationalization (i18n)**: Support multiple languages and localization for field labels, placeholders, and error messages.
- **Form Autosave and Drafts**: Implement autosave functionality and allow users to resume incomplete forms.
- **API Integration**: Enable direct submission of form data to backend APIs or integration with third-party services.
- **Accessibility Enhancements**: Further improve accessibility to ensure full WCAG compliance.
- **Advanced Field Types**: Add support for sliders, color pickers, rich text editors, and other complex field types.
- **Schema Editor UI**: Build a visual editor for creating and modifying form schemas without editing JSON directly.
- **Performance Optimization**: Optimize rendering and validation for very large or complex forms.

---


