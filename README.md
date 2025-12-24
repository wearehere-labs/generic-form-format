# Generic Form Format (GFF)

[![npm version](https://img.shields.io/npm/v/@wearehere-labs/generic-form-format.svg)](https://www.npmjs.com/package/@wearehere-labs/generic-form-format)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-151%20passing-success.svg)](lib/src/__tests__)
[![Coverage](https://img.shields.io/badge/coverage-100%25%20lines-brightgreen.svg)](coverage)

A JSON-based specification and TypeScript library for creating dynamic, interactive forms with conditional logic, responsive layouts, and 29 field types.

**© 2025 Wearehere Labs. All rights reserved. This is proprietary software.**

## Overview

Generic Form Format (GFF) is a declarative format that allows you to define forms with:

- **29 field types** (text, textarea, number, checkbox, select, date, time, datetime, email, tel, password, color, file, autocomplete, slider, signature, richtext, code, currency, image, OTP, and more)
- **Advanced configurations** (accessibility, styling, theming, internationalization)
- **Multi-step forms** (wizard-style forms with validation per step)
- **Field grouping** (organize fields into collapsible groups)
- **Field dependencies** (conditional visibility, validation, and parameter changes)
- **Responsive layouts** (width configurations for different screen sizes)
- **Nested forms** (reusable form components)
- **Version control** (specification versioning for backward compatibility)
- **Dynamic data** (function references for populating options)

## Quick Start

### Using JSON

Here's a simple form definition:

```json
{
  "version": "1.0",
  "formId": "contact-form",
  "title": "Contact Us",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "caption": "Your Name",
      "params": {
        "minLength": 1,
        "maxLength": 100
      }
    },
    {
      "id": "email",
      "type": "text",
      "caption": "Email Address",
      "params": {
        "minLength": 1,
        "pattern": "^[^@]+@[^@]+\\.[^@]+$"
      }
    }
  ]
}
```

### Using TypeScript Library

For programmatic form creation:

```bash
npm install @wearehere-labs/generic-form-format
```

```typescript
import {
  createForm,
  addField,
  createTextField,
  createEmailField,
  toJSON,
} from '@wearehere-labs/generic-form-format';

// Create a new form
let form = createForm('contact-form', {
  title: 'Contact Us',
});

// Add fields
form = addField(form, createTextField('name', 'Your Name', {
  minLength: 1,
  maxLength: 100,
}));

form = addField(form, createEmailField('email', 'Email Address', {
  required: true,
}));

// Export to JSON
const json = toJSON(form);
```

## Documentation

- **[AI_GUIDE.md](AI_GUIDE.md)** - Comprehensive single-file reference for AI systems and developers
- **[schema/](schema/)** - JSON Schema for validation
- **[examples/](examples/)** - Sample form definitions

## TypeScript Library

The TypeScript library provides a type-safe, programmatic way to create GFF form definitions.

### Installation

```bash
npm install @wearehere-labs/generic-form-format
```

### Features

- ✅ **Type-safe**: Full TypeScript support with comprehensive type definitions
- ✅ **Immutable operations**: All functions return new form instances
- ✅ **Duplicate detection**: Automatically prevents adding duplicate fields with different content
- ✅ **Comprehensive field types**: Support for all 21 GFF field types
- ✅ **Helper functions**: Convenient builders for fields, dependencies, and conditions
- ✅ **GFF v1.0 compliant**: Fully compatible with Generic Form Format specification v1.0

### API Overview9 GFF field types
- ✅ **Helper functions**: Convenient builders for fields, dependencies, and conditions
- ✅ **100% test coverage**: Extensively tested and production-ready
- ✅ **Error handling**: Custom error handlers for integration with your logging system
- `createForm(formId, options?)` - Create a new form
- `addField(form, field)` - Add a field to the form
- `removeField(form, fieldId)` - Remove a field
- `updateField(form, fieldId, updates)` - Update a field
- `mergeForms(forms, options?)` - Merge multiple forms

**Field Creation:**
- `createTextField(id, caption, params, options?)`
- `createTextareaField(id, caption, params, options?)`
- `createNumberField(id, caption, params, options?)`
- `createEmailField(id, caption, params, options?)`
- `createSelectField(id, caption, params, options?)`
- `createCheckboxField(id, caption, params, options?)`
- `createAutocompleteField(id, caption, params, options?)`
- `createSliderField(id, caption, params, options?)`
- `createSignatureField(id, caption, params, options?)`
- `createRichtextField(id, caption, params, options?)`
- `createCodeField(id, caption, params, options?)`
- `createCurrencyField(id, caption, params, options?)`
- `createImageField(id, caption, params, options?)`
- `createOTPField(id, caption, params, options?)`
- And more... (29 field types total)

**Dependencies & Conditions:**
- `createDependency(sourceFieldId, condition, effects)`
- `createCondition(operator, value)`
- `showEffect(targetFieldId)`, `hideEffect(targetFieldId)`
- `requireEffect(targetFieldId)`, `unrequireEffect(targetFieldId)`

**Conversion:**
- `toJSON(form, pretty?)` - Convert form to JSON string
- `fromJSON(json)` - Parse JSON string to form

**Error Handling:**
- `setErrorHandler(handler)` - Set custom error handler for all library errors
- `getErrorHandler()` - Get the current error handler

The library allows you to intercept and handle errors before they are thrown:

```typescript
import { setErrorHandler, createForm, FormCreationError } from '@wearehere-labs/generic-form-format';

// Set up custom error logging
setErrorHandler((error) => {
  console.error('[Form Library Error]:', error.message);
  // Send to your logging service
  logToService(error);
});

// Errors will be logged but still thrown
try {
  createForm(''); // Invalid: empty formId
} catch (error) {
  // Error was logged by your handler above
  // Now handle it in your application
}
```

### Example

```typescript
import {
  createForm,
  addField,
  addDependency,
  createCheckboxField,
  createTextField,
  createDependency,
  createCondition,
  showEffect,
  requireEffect,
  toJSON,
} from '@wearehere-labs/generic-form-format';

// Create form with conditional logic
let form = createForm('shipping-form', { title: 'Shipping Information' });

// Add checkbox
form = addField(form, createCheckboxField(
  'differentBilling',
  'Use different billing address',
  {}
));

// Add conditional field
form = addField(form, createTextField(
  'billingAddress',
  'Billing Address',
  { minLength: 1 }
));

// Add dependency
form = addDependency(
  form,
  createDependency(
    'differentBilling',
    createCondition('equals', true),
    [
      showEffect('billingAddress'),
      requireEffect('billingAddress'),
    ]
  )
);

// Export to JSON
console.log(toJSON(form, true));
```

## Key Features

### Field Types

- **text** - Single-line text input
- **textarea** - Multi-line text input
- **number** - Numeric input with validation
- **checkbox** - Boolean selection
- **radio** - Single selection from options
- **select** - Dropdown selection (single or multiple)
- **date** - Date picker
- **time** - Time picker
- **datetime** - Date and time picker
- **file** - File upload
- **email** - Email validation
- **url** - URL validation
- **tel** - Phone number input
- **password** - Masked text input
- **range** - Slider input
- **color** - Color picker
- **nested** - Embedded form reference
- **hidden** - Hidden field for data
- **rating** - Star rating or similar
- **toggle** - Toggle switch
- **tags** - Tag input field

### Dependencies

Define conditional logic between fields:

```json
{
  "dependencies": [
    {
      "sourceFieldId": "hasAddress",
      "condition": {
        "operator": "equals",
        "value": true
      },
      "effects": [
        {
          "targetFieldId": "address",
          "action": "show"
        }
      ]
    }
  ]
}
```

### Responsive Layout

Configure field widths for different breakpoints:

```json
{
  "layout": {
    "width": {
      "mobile": "full",
      "tablet": "1/2",
      "desktop": "1/3"
    }
  }
}
```

## Development

### Setup

``Install dependencies
npm install

# Build the TypeScript library
npm run build

# Run tests
npm test

# Generate coverage report
npm run test:coverage
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run build:watch` - Watch mode for development
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report (100% coverage)
- `npm run clean` - Remove build artifacts

### Project Structure

```
generic-form-format/
├── lib/                    # TypeScript library
│   ├── src/               # Source code
│   │   ├── fields.ts      # Field creators (29 types)
│   │   ├── form.ts        # Form management
│   │   ├── helpers.ts     # Utility functions
│   │   ├── types.ts       # Type definitions
│   │   ├── errorHandler.ts # Error handling system
│   │   └── __tests__/     # Test files (135 tests)
│   └── dist/              # Compiled output
├── schema/                # JSON Schema validation
├── examples/              # Sample forms
├── AI_GUIDE.md           # Complete API + specification reference
└── LICENSE.md            # Proprietary license

```

## Version & License

**Version:** 1.0  
**License:** Proprietary - © 2025 Wearehere Labs. All rights reserved.

See [LICENSE.md](LICENSE.md) for full license terms.s
- Join discussions on design decisions
