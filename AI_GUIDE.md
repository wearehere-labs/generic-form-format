# Generic Form Format - Complete AI Guide

**Version:** 1.0  
**Purpose:** Single comprehensive reference for AI to understand and generate forms using the Generic Form Format library.

---

## Quick Start

```typescript
import { createForm, createTextField, createNumberField, addField, toJSON } from '@wearehere-labs/generic-form-format';

// Create a form
let form = createForm('user-profile', { title: 'User Profile' });

// Add fields
form = addField(form, createTextField('name', 'Full Name', { minLength: 1 }));
form = addField(form, createNumberField('age', 'Age', { min: 0, max: 120, required: true }));

// Export to JSON
const json = toJSON(form, true);
```

---

## Complete TypeScript API

### Form Creation & Management

#### createForm
```typescript
createForm(formId: string, options?: {
  title?: string;
  description?: string;
  version?: string;
  metadata?: Record<string, any>;
}): FormDefinition
```

#### addField
```typescript
addField(form: FormDefinition, field: Field): FormDefinition
```
Adds a field. Throws `DuplicateFieldError` if field with same ID exists with different content.

#### Other Form Functions
```typescript
removeField(form: FormDefinition, fieldId: string): FormDefinition
getField(form: FormDefinition, fieldId: string): Field | undefined
updateField(form: FormDefinition, fieldId: string, updates: Partial<Field>): FormDefinition
mergeForms(forms: FormDefinition[], options?: {...}): FormDefinition
toJSON(form: FormDefinition, pretty?: boolean): string
fromJSON(json: string): FormDefinition
```

---

## All 29 Field Types - Complete Reference

### 1. Text Field
```typescript
createTextField(id: string, caption: string, params: {
  minLength?: number;        // 0 = optional, >0 = required
  maxLength?: number;        // null = unlimited
  pattern?: string;          // Regex validation
  placeholder?: string;
  multiline?: boolean;       // false = input, true = textarea
  rows?: number;             // For multiline
  autocomplete?: string;
  spellcheck?: boolean;
  rtl?: boolean;             // Right-to-left
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

**Example:**
```typescript
createTextField('bio', 'Biography', { 
  multiline: true, 
  rows: 5, 
  maxLength: 500 
})
```

---

### 2. Number Field
```typescript
createNumberField(id: string, caption: string, params: {
  min?: number;
  max?: number;
  step?: number;             // Default: 1
  decimals?: number;         // Default: 0
  prefix?: string;           // e.g., "$"
  suffix?: string;           // e.g., "kg"
  thousandsSeparator?: string;
  decimalSeparator?: string;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 3. Email Field
```typescript
createEmailField(id: string, caption: string, params: {
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 4. Password Field
```typescript
createPasswordField(id: string, caption: string, params: {
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSymbol?: boolean;
  placeholder?: string;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 5. Select Field
```typescript
createSelectField(id: string, caption: string, params: {
  options?: Option[];         // Static options
  optionsFunction?: string;   // Dynamic options
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  required?: boolean;
}, options?: BaseFieldOptions): Field

// Option helper
createOption(value: string | number, label: string): Option
```

**Example:**
```typescript
createSelectField('country', 'Country', {
  options: [
    createOption('us', 'United States'),
    createOption('ca', 'Canada')
  ],
  searchable: true,
  required: true
})
```

---

### 6. Checkbox Field
```typescript
createCheckboxField(id: string, caption: string, params: {
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 7. Radio Field
```typescript
createRadioField(id: string, caption: string, params: {
  options?: Option[];
  optionsFunction?: string;
  orientation?: 'horizontal' | 'vertical';
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 8. Date Field
```typescript
createDateField(id: string, caption: string, params: {
  includeTime?: boolean;
  minDate?: string;          // ISO 8601: "YYYY-MM-DD"
  maxDate?: string;
  format?: string;           // Display format
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 9. Time Field
```typescript
createTimeField(id: string, caption: string, params: {
  format?: '12h' | '24h';
  step?: number;             // Minutes
  minTime?: string;          // "HH:MM"
  maxTime?: string;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 10. DateTime Field
```typescript
createDateTimeField(id: string, caption: string, params: {
  minDateTime?: string;      // ISO 8601
  maxDateTime?: string;
  format?: string;
  timeFormat?: '12h' | '24h';
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 11. File Field
```typescript
createFileField(id: string, caption: string, params: {
  multiple?: boolean;
  maxSize?: number;          // Bytes
  acceptedTypes?: string[];  // [".pdf", ".jpg"]
  acceptedMimeTypes?: string[];
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 12. Image Field
```typescript
createImageField(id: string, caption: string, params: {
  multiple?: boolean;
  maxSize?: number;
  maxWidth?: number;         // Pixels
  maxHeight?: number;
  aspectRatio?: string;      // "16:9", "4:3"
  quality?: number;          // 0-100
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 13. URL Field
```typescript
createURLField(id: string, caption: string, params: {
  placeholder?: string;
  allowedProtocols?: string[];  // ["http", "https"]
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 14. Phone Field
```typescript
createPhoneField(id: string, caption: string, params: {
  format?: string;           // e.g., "(###) ###-####"
  countryCode?: string;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 15. Textarea Field
```typescript
createTextareaField(id: string, caption: string, params: {
  minLength?: number;
  maxLength?: number;
  rows?: number;             // Default: 4
  placeholder?: string;
  rtl?: boolean;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 16. Range/Slider Field
```typescript
createRangeField(id: string, caption: string, params: {
  min?: number;              // Default: 0
  max?: number;              // Default: 100
  step?: number;             // Default: 1
  showValue?: boolean;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 17. Color Field
```typescript
createColorField(id: string, caption: string, params: {
  format?: 'hex' | 'rgb' | 'rgba' | 'hsl';
  defaultValue?: string;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 18. Rating Field
```typescript
createRatingField(id: string, caption: string, params: {
  max?: number;              // Default: 5
  allowHalf?: boolean;
  icon?: string;             // "star", "heart"
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 19. Toggle/Switch Field
```typescript
createToggleField(id: string, caption: string, params: {
  defaultValue?: boolean;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 20. Autocomplete Field
```typescript
createAutocompleteField(id: string, caption: string, params: {
  options?: Option[];
  optionsFunction?: string;
  multiple?: boolean;
  freeSolo?: boolean;        // Allow custom values
  minChars?: number;         // Min chars to trigger
  placeholder?: string;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 21. Tags Field
```typescript
createTagsField(id: string, caption: string, params: {
  suggestions?: string[];
  maxTags?: number;
  allowCustom?: boolean;
  placeholder?: string;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 22. Rich Text Field
```typescript
createRichTextField(id: string, caption: string, params: {
  toolbar?: string[];        // ["bold", "italic", "link"]
  minLength?: number;
  maxLength?: number;
  allowImages?: boolean;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 23. Code Editor Field
```typescript
createCodeField(id: string, caption: string, params: {
  language?: string;         // "javascript", "python"
  theme?: 'light' | 'dark';
  lineNumbers?: boolean;
  minLines?: number;
  maxLines?: number;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 24. Signature Field
```typescript
createSignatureField(id: string, caption: string, params: {
  width?: number;
  height?: number;
  backgroundColor?: string;
  penColor?: string;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 25. Location Field
```typescript
createLocationField(id: string, caption: string, params: {
  enableMap?: boolean;
  defaultZoom?: number;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 26. Currency Field
```typescript
createCurrencyField(id: string, caption: string, params: {
  currency?: string;         // "USD", "EUR"
  min?: number;
  max?: number;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 27. Slider Field (with min/max required)
```typescript
createSliderField(id: string, caption: string, params: {
  min: number;               // REQUIRED
  max: number;               // REQUIRED
  step?: number;
  marks?: boolean;
  showValue?: boolean;
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 28. OTP Field (One-Time Password)
```typescript
createOTPField(id: string, caption: string, params: {
  length?: number;           // Default: 6
  type?: 'numeric' | 'alphanumeric';
  required?: boolean;
}, options?: BaseFieldOptions): Field
```

---

### 29. Nested Form Field
```typescript
createNestedField(id: string, caption: string, params: {
  formId: string;            // REQUIRED - ID of form to embed
  multiple?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  minItems?: number;
  maxItems?: number;
}, options?: BaseFieldOptions): Field
```

---

## Dependencies & Conditional Logic

### Creating Conditions

```typescript
// Simple condition
createCondition(operator: ConditionOperator, value?: any, sourceFieldId?: string): Condition

// Compound condition (AND/OR/NOT)
createCompoundCondition(operator: 'and' | 'or' | 'not', conditions: Condition[]): Condition
```

**Condition Operators:**
- `"equals"`, `"notEquals"`
- `"contains"`, `"notContains"`
- `"greaterThan"`, `"lessThan"`, `"greaterThanOrEqual"`, `"lessThanOrEqual"`
- `"isEmpty"`, `"isNotEmpty"`
- `"matches"` (regex), `"in"`, `"notIn"`
- `"and"`, `"or"`, `"not"` (compound)

### Creating Effects

```typescript
// Generic effect
createEffect(targetFieldId: string, action: EffectAction, params?: Record<string, any>, value?: any): Effect

// Convenience helpers
showEffect(targetFieldId: string): Effect
hideEffect(targetFieldId: string): Effect
enableEffect(targetFieldId: string): Effect
disableEffect(targetFieldId: string): Effect
requireEffect(targetFieldId: string): Effect
unrequireEffect(targetFieldId: string): Effect
setValueEffect(targetFieldId: string, value: any): Effect
clearValueEffect(targetFieldId: string): Effect
updateParamsEffect(targetFieldId: string, params: Record<string, any>): Effect
```

**Effect Actions:**
- `"show"`, `"hide"`
- `"enable"`, `"disable"`
- `"require"`, `"unrequire"`
- `"setValue"`, `"clearValue"`
- `"updateParams"`

### Creating Dependencies

```typescript
createDependency(
  sourceFieldId: string,
  condition: Condition,
  effects: Effect[],
  id?: string
): Dependency

// Add to form
addDependency(form: FormDefinition, dependency: Dependency): FormDefinition
```

**Example - Show field when checkbox is checked:**
```typescript
const dependency = createDependency(
  'hasAddress',
  createCondition('equals', true),
  [showEffect('addressField')]
);

form = addDependency(form, dependency);
```

**Example - Complex condition:**
```typescript
// Show if age >= 18 AND (country is 'US' OR hasConsent is true)
const dependency = createDependency(
  'age',
  createCompoundCondition('and', [
    createCondition('greaterThanOrEqual', 18),
    createCompoundCondition('or', [
      createCondition('equals', 'US', 'country'),
      createCondition('equals', true, 'hasConsent')
    ])
  ]),
  [showEffect('adultContent')]
);
```

---

## Functions (Dynamic Data)

### Creating Functions

```typescript
// Generic
createFunctionDef(type: FunctionType, options?: {
  description?: string;
  params?: string[];
  returns?: string;
}): FunctionDef

// Convenience helpers
createDatasourceFunction(description?: string, params?: string[]): FunctionDef
createValidatorFunction(description?: string, params?: string[]): FunctionDef
createTransformerFunction(description?: string, params?: string[], returns?: string): FunctionDef

// Add to form
addFunction(form: FormDefinition, functionName: string, functionDef: FunctionDef): FormDefinition
```

**Function Types:**
- `"datasource"` - Returns array of options for select/radio/autocomplete
- `"validator"` - Returns boolean (true = valid)
- `"transformer"` - Transforms/formats values

**Example:**
```typescript
// Define function
form = addFunction(
  form,
  'getCountries',
  createDatasourceFunction('Fetches list of countries', [])
);

// Use in field
const countryField = createSelectField('country', 'Country', {
  optionsFunction: 'getCountries',
  required: true
});
```

---

## Layout System

```typescript
interface BaseFieldOptions {
  tooltip?: string;
  defaultValue?: any;
  disabled?: boolean;
  readonly?: boolean;
  layout?: {
    width?: {
      mobile?: WidthValue;
      tablet?: WidthValue;
      desktop?: WidthValue;
      wide?: WidthValue;
    };
    order?: number;
    row?: number;
    column?: number;
    span?: number;
  };
  validation?: {
    custom?: Array<{
      rule: string;
      message: string;
      params?: Record<string, any>;
    }>;
  };
}
```

**Width Values:**
- `"full"` (16/16), `"1/2"` (8/16), `"1/3"` (5/16), `"2/3"` (11/16)
- `"1/4"` (4/16), `"3/4"` (12/16)
- `"1/8"` (2/16), `"3/8"` (6/16), `"5/8"` (10/16), `"7/8"` (14/16)
- `"1/16"`, `"2/16"`, ..., `"15/16"`

**Example:**
```typescript
createTextField('name', 'Name', { required: true }, {
  layout: {
    width: {
      mobile: 'full',
      desktop: '1/2'
    },
    order: 1
  },
  tooltip: 'Enter your full legal name'
})
```

---

## Error Handling

```typescript
import { setErrorHandler, getErrorHandler, ErrorHandler } from '@wearehere-labs/generic-form-format';

type ErrorHandler = (error: Error) => void;

// Set custom error handler
setErrorHandler((error) => {
  console.error('[Form Error]:', error.message);
  sendToMonitoring(error);
});

// Get current handler
const handler = getErrorHandler();

// Remove handler
setErrorHandler(null);
```

**Error Types:**
- `FormCreationError` - Form structure errors
- `DuplicateFieldError` - Duplicate field IDs with different content

---

## Common Patterns & Examples

### Simple Contact Form
```typescript
let form = createForm('contact', { title: 'Contact Us' });

form = addField(form, createTextField('name', 'Name', { minLength: 1 }));
form = addField(form, createEmailField('email', 'Email', { required: true }));
form = addField(form, createTextareaField('message', 'Message', { 
  minLength: 10, 
  rows: 5, 
  required: true 
}));
```

### User Registration Form
```typescript
let form = createForm('register', { title: 'Create Account' });

form = addField(form, createTextField('username', 'Username', { 
  minLength: 3, 
  maxLength: 20, 
  pattern: '^[a-zA-Z0-9_]+$' 
}));

form = addField(form, createEmailField('email', 'Email', { required: true }));

form = addField(form, createPasswordField('password', 'Password', { 
  minLength: 8, 
  requireUppercase: true, 
  requireNumber: true, 
  required: true 
}));

form = addField(form, createCheckboxField('terms', 'I agree to Terms', { 
  required: true 
}));
```

### Conditional Field Visibility
```typescript
// Show address fields only if "hasAddress" is checked
form = addField(form, createCheckboxField('hasAddress', 'I have an address'));
form = addField(form, createTextField('street', 'Street Address', {}));
form = addField(form, createTextField('city', 'City', {}));

form = addDependency(form, createDependency(
  'hasAddress',
  createCondition('equals', true),
  [
    showEffect('street'),
    showEffect('city'),
    requireEffect('street'),
    requireEffect('city')
  ]
));

// Initially hide address fields
form = updateField(form, 'street', { disabled: true });
form = updateField(form, 'city', { disabled: true });
```

### Dynamic Options
```typescript
// Add country and city fields with cascading options
form = addField(form, createSelectField('country', 'Country', {
  optionsFunction: 'getCountries',
  required: true
}));

form = addField(form, createSelectField('city', 'City', {
  optionsFunction: 'getCities',
  required: true
}));

// Define functions
form = addFunction(form, 'getCountries', 
  createDatasourceFunction('Fetch countries')
);

form = addFunction(form, 'getCities', 
  createDatasourceFunction('Fetch cities based on country', ['country'])
);

// Update city options when country changes
form = addDependency(form, createDependency(
  'country',
  createCondition('isNotEmpty'),
  [updateParamsEffect('city', { refresh: true })]
));
```

### Multi-step Form with Nested Forms
```typescript
// Create sub-form for address
let addressForm = createForm('address-form');
addressForm = addField(addressForm, createTextField('street', 'Street', { required: true }));
addressForm = addField(addressForm, createTextField('city', 'City', { required: true }));
addressForm = addField(addressForm, createTextField('zip', 'ZIP Code', { required: true }));

// Main form with nested address
let mainForm = createForm('user-form');
mainForm = addField(mainForm, createTextField('name', 'Name', { required: true }));
mainForm = addField(mainForm, createNestedField('addresses', 'Addresses', {
  formId: 'address-form',
  multiple: true,
  collapsible: true
}));
```

---

## JSON Schema Structure

```json
{
  "version": "1.0",
  "formId": "example-form",
  "title": "Example Form",
  "description": "Form description",
  "fields": [
    {
      "id": "fieldId",
      "type": "text",
      "caption": "Field Label",
      "tooltip": "Help text",
      "params": {
        "minLength": 0,
        "maxLength": null
      },
      "layout": {
        "width": {
          "mobile": "full",
          "desktop": "1/2"
        }
      },
      "defaultValue": "",
      "disabled": false,
      "readonly": false
    }
  ],
  "dependencies": [
    {
      "id": "dep1",
      "sourceFieldId": "fieldId1",
      "condition": {
        "operator": "equals",
        "value": "someValue"
      },
      "effects": [
        {
          "targetFieldId": "fieldId2",
          "action": "show"
        }
      ]
    }
  ],
  "functions": {
    "functionName": {
      "type": "datasource",
      "description": "Fetches data",
      "params": [],
      "returns": "array"
    }
  },
  "metadata": {}
}
```

---

## Validation Rules by Field Type

| Field Type | Validation |
|------------|------------|
| text | minLength, maxLength, pattern, required |
| number | min, max, decimals, required |
| email | email format, required |
| password | minLength, complexity rules, required |
| select | required (must select) |
| checkbox | required (must check) |
| radio | required (must select) |
| date | minDate, maxDate, required |
| file | maxSize, acceptedTypes, required |
| url | URL format, required |
| phone | format pattern, required |

---

## Quick Reference - All Imports

```typescript
// Form management
import {
  createForm,
  addField,
  removeField,
  getField,
  updateField,
  mergeForms,
  addDependency,
  addFunction,
  toJSON,
  fromJSON
} from '@wearehere-labs/generic-form-format';

// Field creators (29 types)
import {
  createTextField,
  createNumberField,
  createEmailField,
  createPasswordField,
  createSelectField,
  createCheckboxField,
  createRadioField,
  createDateField,
  createTimeField,
  createDateTimeField,
  createFileField,
  createImageField,
  createURLField,
  createPhoneField,
  createTextareaField,
  createRangeField,
  createColorField,
  createRatingField,
  createToggleField,
  createAutocompleteField,
  createTagsField,
  createRichTextField,
  createCodeField,
  createSignatureField,
  createLocationField,
  createCurrencyField,
  createSliderField,
  createOTPField,
  createNestedField
} from '@wearehere-labs/generic-form-format';

// Helpers
import {
  createOption,
  createCondition,
  createCompoundCondition,
  createEffect,
  showEffect,
  hideEffect,
  enableEffect,
  disableEffect,
  requireEffect,
  unrequireEffect,
  setValueEffect,
  clearValueEffect,
  updateParamsEffect,
  createDependency,
  createFunctionDef,
  createDatasourceFunction,
  createValidatorFunction,
  createTransformerFunction
} from '@wearehere-labs/generic-form-format';

// Error handling
import {
  setErrorHandler,
  getErrorHandler,
  type ErrorHandler
} from '@wearehere-labs/generic-form-format';

// Types
import type {
  FormDefinition,
  Field,
  Dependency,
  Condition,
  Effect,
  FunctionDef,
  Option
} from '@wearehere-labs/generic-form-format';
```

---

## Best Practices for AI Generation

1. **Always validate field IDs are unique** within a form
2. **Check required parameters** - some fields need specific params (e.g., slider needs min/max)
3. **Use helper functions** instead of creating objects manually
4. **For conditional logic**, start with simple conditions before compound ones
5. **When using optionsFunction**, ensure function is declared in functions object
6. **For nested forms**, ensure referenced formId exists
7. **Test dependencies** to avoid circular references
8. **Use TypeScript types** for validation and autocomplete
9. **Set error handler** to intercept and log errors appropriately
10. **Use layout.width** for responsive design across devices

---

## Complete Working Example

```typescript
import { 
  createForm, 
  addField, 
  addDependency,
  createTextField, 
  createEmailField,
  createSelectField,
  createCheckboxField,
  createTextareaField,
  createOption,
  createCondition,
  showEffect,
  requireEffect,
  toJSON
} from '@wearehere-labs/generic-form-format';

// Create form
let form = createForm('job-application', {
  title: 'Job Application',
  description: 'Apply for a position at our company'
});

// Add basic fields
form = addField(form, createTextField('fullName', 'Full Name', { 
  minLength: 1,
  required: true 
}));

form = addField(form, createEmailField('email', 'Email Address', { 
  required: true 
}));

form = addField(form, createSelectField('position', 'Position', {
  options: [
    createOption('dev', 'Software Developer'),
    createOption('designer', 'UI/UX Designer'),
    createOption('manager', 'Project Manager')
  ],
  required: true
}));

// Conditional field
form = addField(form, createCheckboxField('hasExperience', 'I have relevant experience'));

form = addField(form, createTextareaField('experience', 'Describe your experience', {
  rows: 5,
  minLength: 50
}));

// Add dependency: show experience field if checkbox is checked
form = addDependency(form, createDependency(
  'hasExperience',
  createCondition('equals', true),
  [
    showEffect('experience'),
    requireEffect('experience')
  ]
));

// Convert to JSON
const json = toJSON(form, true);
console.log(json);
```

---

**End of AI Guide** - This single file contains everything needed to understand and generate Generic Form Format forms without reading the entire repository structure.
