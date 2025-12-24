# Generic Form Format Specification v1.0

## Table of Contents

1. [Introduction](#introduction)
2. [Format Structure](#format-structure)
3. [Field Types](#field-types)
4. [Field Properties](#field-properties)
5. [Layout System](#layout-system)
6. [Dependencies](#dependencies)
7. [Nested Forms](#nested-forms)
8. [Validation](#validation)
9. [Functions](#functions)

## Introduction

Generic Form Format (GFF) is a JSON-based specification for defining dynamic forms. It supports complex field relationships, responsive layouts, and reusable form components.

### Design Principles

- **Declarative**: Forms are described, not programmed
- **Extensible**: New field types and properties can be added
- **Portable**: JSON format works across platforms and languages
- **Version-aware**: Format includes version for backward compatibility

## Format Structure

### Root Object

```json
{
  "version": "1.0",
  "formId": "unique-form-identifier",
  "title": "Form Title",
  "description": "Optional form description",
  "fields": [],
  "dependencies": [],
  "functions": {},
  "metadata": {}
}
```

#### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `version` | string | Yes | Specification version (e.g., "1.0") |
| `formId` | string | Yes | Unique identifier for the form |
| `title` | string | No | Display title for the form |
| `description` | string | No | Optional description or help text |
| `fields` | array | Yes | Array of field definitions |
| `dependencies` | array | No | Array of dependency rules |
| `functions` | object | No | Named functions for dynamic data |
| `metadata` | object | No | Additional metadata for extensions |

## Field Types

### 1. Text Field

Single or multi-line text input.

```json
{
  "id": "username",
  "type": "text",
  "caption": "Username",
  "tooltip": "Choose a unique username",
  "params": {
    "minLength": 3,
    "maxLength": 20,
    "multiline": false,
    "rtl": false,
    "pattern": "^[a-zA-Z0-9_]+$",
    "placeholder": "Enter username"
  },
  "layout": {
    "width": { "mobile": "full", "desktop": "1/2" }
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `minLength` | integer | 0 | Minimum characters (0 = not required) |
| `maxLength` | integer | null | Maximum characters (null = unlimited) |
| `multiline` | boolean | false | Enable multi-line input |
| `rtl` | boolean | false | Force right-to-left text direction |
| `pattern` | string | null | Regular expression for validation |
| `placeholder` | string | null | Placeholder text |

### 2. Number Field

Numeric input with optional constraints.

```json
{
  "id": "age",
  "type": "number",
  "caption": "Age",
  "params": {
    "required": true,
    "min": 0,
    "max": 150,
    "decimals": 0,
    "step": 1
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether field is required |
| `min` | number | null | Minimum value (null = no limit) |
| `max` | number | null | Maximum value (null = no limit) |
| `decimals` | integer | 0 | Number of decimal places allowed |
| `step` | number | 1 | Increment/decrement step size |

### 3. Checkbox Field

Boolean selection field.

```json
{
  "id": "agree",
  "type": "checkbox",
  "caption": "I agree to the terms",
  "params": {
    "required": true
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether checkbox must be checked |

### 4. Radio Button Field

Single selection from predefined options.

```json
{
  "id": "gender",
  "type": "radio",
  "caption": "Gender",
  "params": {
    "required": true,
    "options": ["Male", "Female", "Other", "Prefer not to say"],
    "optionsFunction": null
  }
}
```

Or with dynamic options:

```json
{
  "id": "country",
  "type": "radio",
  "caption": "Country",
  "params": {
    "required": true,
    "optionsFunction": "getCountries"
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether selection is required |
| `options` | array | null | Static list of options |
| `optionsFunction` | string | null | Name of function returning options |

**Note**: Either `options` or `optionsFunction` must be provided, but not both.

### 5. Select Field

Dropdown selection (single or multiple).

```json
{
  "id": "interests",
  "type": "select",
  "caption": "Interests",
  "params": {
    "required": false,
    "multiple": true,
    "options": [
      { "value": "sports", "label": "Sports" },
      { "value": "music", "label": "Music" },
      { "value": "art", "label": "Art" }
    ],
    "optionsFunction": null,
    "searchable": true,
    "placeholder": "Select your interests"
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether selection is required |
| `multiple` | boolean | false | Allow multiple selections |
| `options` | array | null | Array of {value, label} objects |
| `optionsFunction` | string | null | Name of function returning options |
| `searchable` | boolean | false | Enable search/filter functionality |
| `placeholder` | string | null | Placeholder text |

### 6. Date Field

Date and/or time picker.

```json
{
  "id": "birthdate",
  "type": "date",
  "caption": "Date of Birth",
  "params": {
    "required": true,
    "includeTime": false,
    "minDate": "1900-01-01",
    "maxDate": "2025-12-31",
    "format": "YYYY-MM-DD"
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether date is required |
| `includeTime` | boolean | false | Include time selection |
| `minDate` | string | null | Minimum date (ISO 8601 format) |
| `maxDate` | string | null | Maximum date (ISO 8601 format) |
| `format` | string | "YYYY-MM-DD" | Display format |

### 7. File Field

File upload with constraints.

```json
{
  "id": "resume",
  "type": "file",
  "caption": "Upload Resume",
  "params": {
    "required": true,
    "multiple": false,
    "maxSize": 5242880,
    "acceptedTypes": [".pdf", ".doc", ".docx"],
    "acceptedMimeTypes": ["application/pdf", "application/msword"]
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether file is required |
| `multiple` | boolean | false | Allow multiple file uploads |
| `maxSize` | integer | null | Maximum file size in bytes |
| `acceptedTypes` | array | null | Allowed file extensions |
| `acceptedMimeTypes` | array | null | Allowed MIME types |

### 8. Email Field

Email address with validation.

```json
{
  "id": "email",
  "type": "email",
  "caption": "Email Address",
  "params": {
    "required": true,
    "multiple": false,
    "placeholder": "user@example.com"
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether email is required |
| `multiple` | boolean | false | Allow multiple email addresses |
| `placeholder` | string | null | Placeholder text |

### 9. URL Field

URL with validation.

```json
{
  "id": "website",
  "type": "url",
  "caption": "Website",
  "params": {
    "required": false,
    "placeholder": "https://example.com"
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether URL is required |
| `placeholder` | string | null | Placeholder text |

### 10. Password Field

Masked text input for passwords.

```json
{
  "id": "password",
  "type": "password",
  "caption": "Password",
  "params": {
    "required": true,
    "minLength": 8,
    "maxLength": 100,
    "requireUppercase": true,
    "requireLowercase": true,
    "requireNumber": true,
    "requireSymbol": true
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether password is required |
| `minLength` | integer | 0 | Minimum characters |
| `maxLength` | integer | null | Maximum characters |
| `requireUppercase` | boolean | false | Require uppercase letter |
| `requireLowercase` | boolean | false | Require lowercase letter |
| `requireNumber` | boolean | false | Require numeric digit |
| `requireSymbol` | boolean | false | Require special symbol |

### 11. Range Field

Slider input for numeric range.

```json
{
  "id": "volume",
  "type": "range",
  "caption": "Volume",
  "params": {
    "required": false,
    "min": 0,
    "max": 100,
    "step": 1,
    "defaultValue": 50
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether value is required |
| `min` | number | 0 | Minimum value |
| `max` | number | 100 | Maximum value |
| `step` | number | 1 | Step increment |
| `defaultValue` | number | null | Default value |

### 12. Color Field

Color picker.

```json
{
  "id": "favoriteColor",
  "type": "color",
  "caption": "Favorite Color",
  "params": {
    "required": false,
    "format": "hex",
    "defaultValue": "#000000"
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `required` | boolean | false | Whether color is required |
| `format` | string | "hex" | Color format (hex, rgb, rgba, hsl) |
| `defaultValue` | string | null | Default color value |

### 13. Nested Form Field

Reference to another form definition.

```json
{
  "id": "shippingAddress",
  "type": "nested",
  "caption": "Shipping Address",
  "params": {
    "formId": "address-form",
    "multiple": false,
    "collapsible": true,
    "defaultExpanded": true
  }
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `formId` | string | required | ID of the form to embed |
| `multiple` | boolean | false | Allow multiple instances |
| `collapsible` | boolean | false | Make the nested form collapsible |
| `defaultExpanded` | boolean | true | Default expansion state |

## Field Properties

All fields share these common properties:

```json
{
  "id": "string",
  "type": "string",
  "caption": "string",
  "tooltip": "string",
  "params": {},
  "layout": {},
  "validation": {},
  "defaultValue": null,
  "disabled": false,
  "readonly": false
}
```

### Common Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique field identifier |
| `type` | string | Yes | Field type (text, number, etc.) |
| `caption` | string | Yes | Display label for the field |
| `tooltip` | string | No | Help text shown on hover/focus |
| `params` | object | No | Type-specific parameters |
| `layout` | object | No | Layout configuration |
| `validation` | object | No | Additional validation rules |
| `defaultValue` | any | No | Default field value |
| `disabled` | boolean | No | Whether field is disabled |
| `readonly` | boolean | No | Whether field is read-only |

## Layout System

The layout system provides responsive width control using fractional values.

### Width Values

Supported width values:
- `"full"` - 100% width (16/16)
- `"15/16"` - 93.75% width
- `"7/8"` or `"14/16"` - 87.5% width
- `"13/16"` - 81.25% width
- `"3/4"` or `"12/16"` - 75% width
- `"11/16"` - 68.75% width
- `"5/8"` or `"10/16"` - 62.5% width
- `"9/16"` - 56.25% width
- `"1/2"` or `"8/16"` - 50% width
- `"7/16"` - 43.75% width
- `"3/8"` or `"6/16"` - 37.5% width
- `"5/16"` - 31.25% width
- `"1/4"` or `"4/16"` - 25% width
- `"3/16"` - 18.75% width
- `"1/8"` or `"2/16"` - 12.5% width
- `"1/16"` - 6.25% width

### Breakpoints

```json
{
  "layout": {
    "width": {
      "mobile": "full",
      "tablet": "1/2",
      "desktop": "1/3",
      "wide": "1/4"
    },
    "order": 1,
    "row": 1,
    "column": 1,
    "span": 1
  }
}
```

#### Layout Properties

| Property | Type | Description |
|----------|------|-------------|
| `width` | object | Width values for different breakpoints |
| `order` | integer | Display order (for flex/grid layouts) |
| `row` | integer | Grid row position |
| `column` | integer | Grid column position |
| `span` | integer | Number of columns to span |

## Dependencies

Dependencies define conditional relationships between fields.

### Dependency Structure

```json
{
  "dependencies": [
    {
      "id": "dependency-1",
      "sourceFieldId": "employmentStatus",
      "condition": {
        "operator": "equals",
        "value": "employed"
      },
      "effects": [
        {
          "targetFieldId": "companyName",
          "action": "show"
        },
        {
          "targetFieldId": "salary",
          "action": "require"
        }
      ]
    }
  ]
}
```

### Condition Operators

| Operator | Description | Applicable Types |
|----------|-------------|------------------|
| `equals` | Exact match | All |
| `notEquals` | Not equal to | All |
| `contains` | Contains substring/value | String, Array |
| `notContains` | Does not contain | String, Array |
| `greaterThan` | Greater than | Number, Date |
| `lessThan` | Less than | Number, Date |
| `greaterThanOrEqual` | Greater than or equal | Number, Date |
| `lessThanOrEqual` | Less than or equal | Number, Date |
| `isEmpty` | Is empty/null | All |
| `isNotEmpty` | Is not empty/null | All |
| `matches` | Regex match | String |
| `in` | Value in list | All |
| `notIn` | Value not in list | All |

### Complex Conditions

Use `and`, `or`, and `not` for complex logic:

```json
{
  "condition": {
    "operator": "and",
    "conditions": [
      {
        "operator": "equals",
        "value": "yes"
      },
      {
        "operator": "or",
        "conditions": [
          {
            "sourceFieldId": "age",
            "operator": "greaterThan",
            "value": 18
          },
          {
            "sourceFieldId": "hasParentalConsent",
            "operator": "equals",
            "value": true
          }
        ]
      }
    ]
  }
}
```

### Effect Actions

| Action | Description |
|--------|-------------|
| `show` | Make field visible |
| `hide` | Make field hidden |
| `enable` | Enable field |
| `disable` | Disable field |
| `require` | Make field required |
| `unrequire` | Make field optional |
| `updateParams` | Modify field parameters |
| `setValue` | Set field value |
| `clearValue` | Clear field value |

### Update Parameters Effect

```json
{
  "action": "updateParams",
  "targetFieldId": "quantity",
  "params": {
    "min": 10,
    "max": 100
  }
}
```

## Nested Forms

Forms can be nested within other forms for reusability.

### Defining a Nested Form

```json
{
  "version": "1.0",
  "formId": "address-form",
  "title": "Address",
  "fields": [
    {
      "id": "street",
      "type": "text",
      "caption": "Street Address",
      "params": { "minLength": 1 }
    },
    {
      "id": "city",
      "type": "text",
      "caption": "City",
      "params": { "minLength": 1 }
    },
    {
      "id": "zipCode",
      "type": "text",
      "caption": "ZIP Code",
      "params": { "minLength": 1, "pattern": "^\\d{5}$" }
    }
  ]
}
```

### Using Nested Forms

```json
{
  "fields": [
    {
      "id": "billingAddress",
      "type": "nested",
      "caption": "Billing Address",
      "params": {
        "formId": "address-form"
      }
    },
    {
      "id": "shippingAddress",
      "type": "nested",
      "caption": "Shipping Address",
      "params": {
        "formId": "address-form"
      }
    }
  ]
}
```

### Data Structure for Nested Forms

When submitting data, nested forms create nested objects:

```json
{
  "billingAddress": {
    "street": "123 Main St",
    "city": "Springfield",
    "zipCode": "12345"
  },
  "shippingAddress": {
    "street": "456 Oak Ave",
    "city": "Shelbyville",
    "zipCode": "54321"
  }
}
```

## Validation

Additional validation rules beyond field-specific parameters.

```json
{
  "validation": {
    "custom": [
      {
        "rule": "functionName",
        "message": "Validation failed",
        "params": {}
      }
    ],
    "crossField": [
      {
        "fields": ["password", "confirmPassword"],
        "rule": "fieldsMatch",
        "message": "Passwords must match"
      }
    ]
  }
}
```

## Functions

Named functions provide dynamic data or custom validation.

```json
{
  "functions": {
    "getCountries": {
      "type": "datasource",
      "description": "Returns list of countries",
      "returns": "array"
    },
    "validateAge": {
      "type": "validator",
      "description": "Custom age validation",
      "params": ["value"],
      "returns": "boolean"
    }
  }
}
```

### Function Types

| Type | Description | Returns |
|------|-------------|---------|
| `datasource` | Provides dynamic options | array |
| `validator` | Custom validation logic | boolean |
| `transformer` | Transforms field values | any |

**Note**: The actual implementation of functions is provided by the form renderer, not defined in the GFF specification.

## Complete Example

See [examples/](examples/) directory for complete form examples.

## Version History

- **1.0** (2025-12-24) - Initial specification release
