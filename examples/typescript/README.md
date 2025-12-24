# TypeScript Examples

Programmatic form creation examples using the Generic Form Format TypeScript library.

## Running Examples

### Quick Start

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run examples
npm run example:contact      # Contact form
npm run example:job          # Job application
npm run example:merge        # Form merging
npm run example:fields       # New field types
npm run example:advanced     # Advanced features
npm run example:error        # Error handling
npm run example:dynamic      # Dynamic conditional form
npm run example:all          # All 29 field types
```

### Running Directly

```bash
npx ts-node examples/typescript/contact-form.ts
npx ts-node examples/typescript/job-application.ts
npx ts-node examples/typescript/merge-forms.ts
npx ts-node examples/typescript/new-field-types.ts
npx ts-node examples/typescript/advanced-features.ts
npx ts-node examples/typescript/error-handling.ts
npx ts-node examples/typescript/dynamic-conditional-form.ts
npx ts-node examples/typescript/all-field-types.ts
```

## Available Examples

### [contact-form.ts](contact-form.ts)
Creates a simple contact form programmatically.

**Demonstrates:**
- Form creation with `createForm()`
- Adding various field types
- Field validation parameters
- Responsive layout configuration
- Options creation with `createOptions()`
- JSON export with `toJSON()`

**Output:** Complete contact form JSON with all field types.

---

### [job-application.ts](job-application.ts)
Creates a job application form with conditional logic.

**Demonstrates:**
- Multiple field types (text, email, number, date, file, radio, select)
- Creating dependencies with `createDependency()`
- Conditional visibility with `showEffect()` and `hideEffect()`
- Making fields required conditionally with `requireEffect()`
- File upload constraints
- Complex validation rules

**Output:** Job application form with fields that show/hide based on selections.

---

### [merge-forms.ts](merge-forms.ts)
Shows how to merge multiple form definitions.

**Demonstrates:**
- Creating reusable form components
- Merging forms with `mergeForms()`
- Handling identical fields (no duplicate)
- Detecting conflicting fields (DuplicateFieldError)
- Building modular forms from components
- Merging metadata and dependencies

**Output:** Examples of successful merges and error handling.

---

### [new-field-types.ts](new-field-types.ts)
Demonstrates the additional field types added to GFF.

**Demonstrates:**
- `createTextareaField()` - Multi-line text with resize options
- `createTimeField()` - Time picker with format options
- `createDateTimeField()` - Combined date and time picker
- `createTelField()` - Phone number with validation
- `createHiddenField()` - Hidden data fields
- `createRatingField()` - Star/heart/thumb ratings
- `createToggleField()` - Toggle switches with labels
- `createTagsField()` - Tag input with suggestions

**Output:** Feedback form showcasing all new field types.

---

### [advanced-features.ts](advanced-features.ts)
Comprehensive showcase of advanced features and field types.

**Demonstrates:**
- Advanced field types: autocomplete, slider, signature, richtext, code, currency, image, OTP
- Multi-step forms with 4 steps
- Field groups (collapsible/expanded)
- Theme configuration (colors, fonts, spacing)
- Internationalization with translations (en-US, es-ES)
- Accessibility attributes (ARIA labels, tab order)
- Custom styling (CSS classes, data attributes)
- Button customization (save, submit, reset)
- Field prefixes, suffixes, and help text
- Advanced validation rules

**Output:** Complete advanced form with metadata, theme, i18n, steps, and groups.

---

### [error-handling.ts](error-handling.ts)
Demonstrates custom error handling and logging.

**Demonstrates:**
- `setErrorHandler()` - Set custom error handler
- `getErrorHandler()` - Retrieve current handler
- Error interception before throwing
- Logging errors to external services
- Graceful error handling patterns
- Error recovery strategies

**Output:** Logged errors with timestamps and custom error handling examples.

---

### [dynamic-conditional-form.ts](dynamic-conditional-form.ts)
Event registration form with complex conditional logic.

**Demonstrates:**
- Complex chained dependencies
- Compound conditions (OR logic)
- Show/hide fields based on multiple conditions
- Dynamic field requirements
- Nested dependencies (4 levels)
- File upload with constraints
- Date validation with min/max

**Output:** Event registration form with in-person, virtual, and presentation options.

---

### [all-field-types.ts](all-field-types.ts)
Complete reference of all 29 field types in GFF.

**Demonstrates:**
All field creator functions with proper parameters:
- Basic: text, textarea, number, email, password
- Selection: select, checkbox, radio, autocomplete, tags
- Date/Time: date, time, datetime
- File: file, image, signature
- Contact: url, tel
- UI: range, slider, color, rating, toggle
- Advanced: nested, hidden, richtext, code, currency, otp

**Output:** Showcase form with all 29 field types listed.

---

## Code Patterns

### Basic Form Creation

```typescript
import { createForm, addField, createTextField, toJSON } from '../../lib/src/index';

let form = createForm('my-form', { title: 'My Form' });
form = addField(form, createTextField('name', 'Name', { minLength: 1 }));

console.log(toJSON(form, true));
```

### Adding Conditional Logic

```typescript
import { 
  addDependency, 
  createDependency, 
  createCondition, 
  showEffect 
} from '../../lib/src/index';

form = addDependency(
  form,
  createDependency(
    'sourceField',
    createCondition('equals', true),
    [showEffect('targetField')]
  )
);
```

### Creating Options

```typescript
import { createOptions, createOption } from '../../lib/src/index';

// From strings
const options1 = createOptions(['Option 1', 'Option 2']);

// Custom value/label
const options2 = [
  createOption('val1', 'Label 1'),
  createOption('val2', 'Label 2'),
];
```

## Creating Your Own Example

1. Create a new `.ts` file in this directory
2. Import functions from `../../lib/src/index`
3. Build your form using the library API
4. Export and/or print the JSON

Template:

```typescript
import {
  createForm,
  addField,
  createTextField,
  toJSON,
} from '../../lib/src/index';

// Create your form
let myForm = createForm('my-form', {
  title: 'My Form',
  description: 'Form description',
});

// Add fields
myForm = addField(
  myForm,
  createTextField('field1', 'Field 1', { minLength: 1 })
);

// Output
console.log(toJSON(myForm, true));

// Optionally export
export default myForm;
```

## Tips

- **Use `toJSON(form, true)`** for pretty-printed output
- **Always reassign** the form: `form = addField(form, field)`
- **Check types** with TypeScript for compile-time safety
- **Handle errors** when merging forms or adding duplicate fields
- **Save output** to JSON files for use with renderers

## API Reference

For complete API documentation, see [AI_GUIDE.md](../../AI_GUIDE.md).

Quick links:
- [Form Management](../../AI_GUIDE.md#form-management-functions)
- [Field Creation](../../AI_GUIDE.md#field-creator-functions)
- [Dependencies & Conditions](../../AI_GUIDE.md#dependencies--conditional-logic)

## See Also

- **[JSON Examples](../json/)** - Static form definitions
- **[AI_GUIDE.md](../../AI_GUIDE.md)** - Complete specification and API reference
- **[README.md](../../README.md)** - Project documentation
