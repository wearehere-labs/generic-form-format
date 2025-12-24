# Generic Form Format - AI Specification v1.0

## Purpose

This document provides a structured specification of the Generic Form Format (GFF) optimized for AI systems to parse, generate, and validate form definitions.

## Schema Definition

### Root Schema

```typescript
interface FormDefinition {
  version: string;                    // Semantic version (e.g., "1.0")
  formId: string;                     // Unique identifier
  title?: string;                     // Display title
  description?: string;               // Form description
  fields: Field[];                    // Array of field definitions
  dependencies?: Dependency[];        // Conditional logic rules
  functions?: Record<string, FunctionDef>;  // Named functions
  metadata?: Record<string, any>;     // Extension metadata
}
```

### Field Schema

```typescript
interface Field {
  id: string;                         // Unique field identifier
  type: FieldType;                    // Field type enum
  caption: string;                    // Display label
  tooltip?: string;                   // Help text
  params: FieldParams;                // Type-specific parameters
  layout?: LayoutConfig;              // Layout configuration
  validation?: ValidationConfig;      // Additional validation
  defaultValue?: any;                 // Default value
  disabled?: boolean;                 // Disabled state
  readonly?: boolean;                 // Read-only state
}

type FieldType = 
  | "text" 
  | "number" 
  | "checkbox" 
  | "radio" 
  | "select" 
  | "date" 
  | "file" 
  | "email" 
  | "url" 
  | "password" 
  | "range" 
  | "color" 
  | "nested";
```

## Field Type Parameters

### Text Field

```typescript
interface TextFieldParams {
  minLength?: number;      // 0 = not required, default: 0
  maxLength?: number;      // null = unlimited, default: null
  multiline?: boolean;     // Enable textarea, default: false
  rtl?: boolean;           // Right-to-left, default: false
  pattern?: string;        // Regex validation, default: null
  placeholder?: string;    // Placeholder text, default: null
}
```

**Validation Logic**:
- If `minLength === 0`, field is optional
- If `minLength > 0`, field is required
- If `maxLength` is null, no upper limit
- If `pattern` is provided, value must match regex

### Number Field

```typescript
interface NumberFieldParams {
  required?: boolean;      // Required field, default: false
  min?: number;            // Minimum value, default: null (no limit)
  max?: number;            // Maximum value, default: null (no limit)
  decimals?: number;       // Decimal places, default: 0
  step?: number;           // Increment step, default: 1
}
```

**Validation Logic**:
- If `required === true`, value must be provided
- Value must be `>= min` (if min is not null)
- Value must be `<= max` (if max is not null)
- Value must have at most `decimals` decimal places

### Checkbox Field

```typescript
interface CheckboxFieldParams {
  required?: boolean;      // Must be checked, default: false
}
```

**Validation Logic**:
- If `required === true`, checkbox must be checked

### Radio Field

```typescript
interface RadioFieldParams {
  required?: boolean;                    // Selection required, default: false
  options?: string[] | OptionObject[];   // Static options
  optionsFunction?: string;              // Function name for dynamic options
}

interface OptionObject {
  value: string | number;
  label: string;
}
```

**Rules**:
- Either `options` OR `optionsFunction` must be provided (mutually exclusive)
- If `options` is array of strings, value === label
- If `options` is array of objects, use `value` and `label` properties

### Select Field

```typescript
interface SelectFieldParams {
  required?: boolean;                    // Selection required, default: false
  multiple?: boolean;                    // Allow multiple selections, default: false
  options?: OptionObject[];              // Static options
  optionsFunction?: string;              // Function name for dynamic options
  searchable?: boolean;                  // Enable search, default: false
  placeholder?: string;                  // Placeholder text
}
```

### Date Field

```typescript
interface DateFieldParams {
  required?: boolean;      // Date required, default: false
  includeTime?: boolean;   // Include time picker, default: false
  minDate?: string;        // ISO 8601 format (YYYY-MM-DD)
  maxDate?: string;        // ISO 8601 format (YYYY-MM-DD)
  format?: string;         // Display format, default: "YYYY-MM-DD"
}
```

### File Field

```typescript
interface FileFieldParams {
  required?: boolean;              // File required, default: false
  multiple?: boolean;              // Multiple files, default: false
  maxSize?: number;                // Max bytes per file, default: null
  acceptedTypes?: string[];        // File extensions (e.g., [".pdf", ".jpg"])
  acceptedMimeTypes?: string[];    // MIME types
}
```

### Email Field

```typescript
interface EmailFieldParams {
  required?: boolean;      // Email required, default: false
  multiple?: boolean;      // Multiple emails (comma-separated), default: false
  placeholder?: string;    // Placeholder text
}
```

**Validation**: Must match email regex pattern

### URL Field

```typescript
interface URLFieldParams {
  required?: boolean;      // URL required, default: false
  placeholder?: string;    // Placeholder text
}
```

**Validation**: Must be valid URL format

### Password Field

```typescript
interface PasswordFieldParams {
  required?: boolean;          // Password required, default: false
  minLength?: number;          // Min characters, default: 0
  maxLength?: number;          // Max characters, default: null
  requireUppercase?: boolean;  // Require uppercase, default: false
  requireLowercase?: boolean;  // Require lowercase, default: false
  requireNumber?: boolean;     // Require digit, default: false
  requireSymbol?: boolean;     // Require symbol, default: false
}
```

### Range Field

```typescript
interface RangeFieldParams {
  required?: boolean;      // Value required, default: false
  min?: number;            // Min value, default: 0
  max?: number;            // Max value, default: 100
  step?: number;           // Step size, default: 1
  defaultValue?: number;   // Default value
}
```

### Color Field

```typescript
interface ColorFieldParams {
  required?: boolean;      // Color required, default: false
  format?: "hex" | "rgb" | "rgba" | "hsl";  // Format, default: "hex"
  defaultValue?: string;   // Default color
}
```

### Nested Field

```typescript
interface NestedFieldParams {
  formId: string;              // Required: ID of form to embed
  multiple?: boolean;          // Allow multiple instances, default: false
  collapsible?: boolean;       // Make collapsible, default: false
  defaultExpanded?: boolean;   // Default expansion state, default: true
}
```

## Layout System

```typescript
interface LayoutConfig {
  width?: WidthConfig;
  order?: number;          // Display order
  row?: number;            // Grid row
  column?: number;         // Grid column
  span?: number;           // Column span
}

interface WidthConfig {
  mobile?: WidthValue;
  tablet?: WidthValue;
  desktop?: WidthValue;
  wide?: WidthValue;
}

type WidthValue = 
  | "full" | "15/16" | "7/8" | "14/16" | "13/16" 
  | "3/4" | "12/16" | "11/16" | "5/8" | "10/16" 
  | "9/16" | "1/2" | "8/16" | "7/16" | "3/8" 
  | "6/16" | "5/16" | "1/4" | "4/16" | "3/16" 
  | "1/8" | "2/16" | "1/16";
```

**Width Calculations**:
- `"full"` = 100% (16/16)
- `"1/2"` = 50% (8/16)
- `"1/4"` = 25% (4/16)
- All fractions are based on 16-column grid

## Dependencies

```typescript
interface Dependency {
  id?: string;                     // Optional dependency ID
  sourceFieldId: string;           // Field to watch
  condition: Condition;            // When to trigger
  effects: Effect[];               // What to do
}

interface Condition {
  operator: ConditionOperator;
  value?: any;                     // Comparison value
  sourceFieldId?: string;          // For cross-field comparisons
  conditions?: Condition[];        // For nested conditions (and/or)
}

type ConditionOperator = 
  | "equals" | "notEquals" 
  | "contains" | "notContains" 
  | "greaterThan" | "lessThan" 
  | "greaterThanOrEqual" | "lessThanOrEqual" 
  | "isEmpty" | "isNotEmpty" 
  | "matches" | "in" | "notIn"
  | "and" | "or" | "not";

interface Effect {
  targetFieldId: string;           // Field to affect
  action: EffectAction;            // Action to perform
  params?: Record<string, any>;    // Action parameters
  value?: any;                     // For setValue action
}

type EffectAction = 
  | "show" | "hide" 
  | "enable" | "disable" 
  | "require" | "unrequire" 
  | "updateParams" | "setValue" | "clearValue";
```

### Dependency Evaluation Algorithm

1. Monitor `sourceFieldId` for changes
2. Evaluate `condition` against current value
3. If condition is true, apply all `effects`
4. Effects are applied in array order
5. Multiple dependencies can target same field

### Complex Condition Example

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
            "sourceFieldId": "hasConsent",
            "operator": "equals",
            "value": true
          }
        ]
      }
    ]
  }
}
```

**Evaluation**: (sourceField === "yes") AND ((age > 18) OR (hasConsent === true))

## Functions

```typescript
interface FunctionDef {
  type: FunctionType;
  description?: string;
  params?: string[];       // Parameter names
  returns?: string;        // Return type description
}

type FunctionType = "datasource" | "validator" | "transformer";
```

**Notes**:
- Functions are declared in form definition but implemented by renderer
- `datasource` functions return options for select/radio fields
- `validator` functions return boolean (true = valid)
- `transformer` functions transform/format values

## Data Submission Format

### Flat Fields

```json
{
  "fieldId1": "value1",
  "fieldId2": 42,
  "fieldId3": true
}
```

### Nested Forms

```json
{
  "fieldId1": "value1",
  "nestedFormField": {
    "subField1": "value",
    "subField2": "value"
  }
}
```

### Multiple Nested Forms

```json
{
  "addresses": [
    {
      "street": "123 Main St",
      "city": "Springfield"
    },
    {
      "street": "456 Oak Ave",
      "city": "Shelbyville"
    }
  ]
}
```

## Validation Rules

### Execution Order

1. **Field-level validation**: Check params (minLength, required, pattern, etc.)
2. **Custom validation**: Execute custom validators defined in field
3. **Cross-field validation**: Check dependencies and relationships
4. **Form-level validation**: Execute form-wide validators

### Error Format

```typescript
interface ValidationError {
  fieldId: string;
  message: string;
  code?: string;
}
```

## Processing Guidelines for AI

### Generating Forms

1. Always include `version` and `formId` in root object
2. Each field must have unique `id`, `type`, and `caption`
3. Validate that `params` match the field type
4. Ensure dependency `sourceFieldId` and `targetFieldId` reference existing fields
5. For nested forms, verify `formId` references exist
6. For dynamic options, ensure function names are declared in `functions` object

### Parsing Forms

1. Validate JSON structure matches schema
2. Check version compatibility
3. Verify all field IDs are unique
4. Validate dependency references
5. Check for circular dependencies in nested forms
6. Ensure function references are declared

### Common Patterns

**Required text field**:
```json
{
  "id": "name",
  "type": "text",
  "caption": "Name",
  "params": { "minLength": 1 }
}
```

**Optional text field**:
```json
{
  "id": "nickname",
  "type": "text",
  "caption": "Nickname",
  "params": { "minLength": 0 }
}
```

**Conditional visibility**:
```json
{
  "dependencies": [
    {
      "sourceFieldId": "hasAddress",
      "condition": { "operator": "equals", "value": true },
      "effects": [{ "targetFieldId": "address", "action": "show" }]
    }
  ]
}
```

**Dynamic options**:
```json
{
  "id": "country",
  "type": "select",
  "caption": "Country",
  "params": {
    "required": true,
    "optionsFunction": "getCountries"
  }
},
{
  "functions": {
    "getCountries": {
      "type": "datasource",
      "returns": "array"
    }
  }
}
```

## Version Compatibility

| Version | Release Date | Breaking Changes |
|---------|--------------|------------------|
| 1.0     | 2025-12-24   | Initial release  |

### Version Parsing

```typescript
function parseVersion(version: string): { major: number; minor: number } {
  const [major, minor] = version.split('.').map(Number);
  return { major, minor };
}
```

**Backward Compatibility Rules**:
- Minor version changes (1.0 → 1.1): Additive only, no breaking changes
- Major version changes (1.0 → 2.0): May include breaking changes
- Parsers should handle unknown properties gracefully (ignore or warn)

## Optimization Tips

1. **Minimize dependencies**: Too many dependencies slow rendering
2. **Use nested forms**: Reuse common field groups
3. **Batch field updates**: Group related fields in dependencies
4. **Lazy load options**: Use `optionsFunction` for large datasets
5. **Cache form definitions**: Parse once, render many times

## Error Codes

| Code | Description |
|------|-------------|
| `E001` | Invalid version format |
| `E002` | Missing required field property |
| `E003` | Invalid field type |
| `E004` | Duplicate field ID |
| `E005` | Invalid dependency reference |
| `E006` | Circular nested form reference |
| `E007` | Invalid condition operator |
| `E008` | Invalid effect action |
| `E009` | Missing function declaration |
| `E010` | Invalid layout width value |

## Complete TypeScript Interface

```typescript
// Complete type definitions for Generic Form Format v1.0

interface FormDefinition {
  version: string;
  formId: string;
  title?: string;
  description?: string;
  fields: Field[];
  dependencies?: Dependency[];
  functions?: Record<string, FunctionDef>;
  metadata?: Record<string, any>;
}

interface Field {
  id: string;
  type: FieldType;
  caption: string;
  tooltip?: string;
  params: FieldParams;
  layout?: LayoutConfig;
  validation?: ValidationConfig;
  defaultValue?: any;
  disabled?: boolean;
  readonly?: boolean;
}

type FieldType = 
  | "text" | "number" | "checkbox" | "radio" | "select" 
  | "date" | "file" | "email" | "url" | "password" 
  | "range" | "color" | "nested";

type FieldParams = 
  | TextFieldParams | NumberFieldParams | CheckboxFieldParams 
  | RadioFieldParams | SelectFieldParams | DateFieldParams 
  | FileFieldParams | EmailFieldParams | URLFieldParams 
  | PasswordFieldParams | RangeFieldParams | ColorFieldParams 
  | NestedFieldParams;

interface TextFieldParams {
  minLength?: number;
  maxLength?: number;
  multiline?: boolean;
  rtl?: boolean;
  pattern?: string;
  placeholder?: string;
}

interface NumberFieldParams {
  required?: boolean;
  min?: number;
  max?: number;
  decimals?: number;
  step?: number;
}

interface CheckboxFieldParams {
  required?: boolean;
}

interface RadioFieldParams {
  required?: boolean;
  options?: string[] | OptionObject[];
  optionsFunction?: string;
}

interface SelectFieldParams {
  required?: boolean;
  multiple?: boolean;
  options?: OptionObject[];
  optionsFunction?: string;
  searchable?: boolean;
  placeholder?: string;
}

interface DateFieldParams {
  required?: boolean;
  includeTime?: boolean;
  minDate?: string;
  maxDate?: string;
  format?: string;
}

interface FileFieldParams {
  required?: boolean;
  multiple?: boolean;
  maxSize?: number;
  acceptedTypes?: string[];
  acceptedMimeTypes?: string[];
}

interface EmailFieldParams {
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;
}

interface URLFieldParams {
  required?: boolean;
  placeholder?: string;
}

interface PasswordFieldParams {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSymbol?: boolean;
}

interface RangeFieldParams {
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

interface ColorFieldParams {
  required?: boolean;
  format?: "hex" | "rgb" | "rgba" | "hsl";
  defaultValue?: string;
}

interface NestedFieldParams {
  formId: string;
  multiple?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

interface OptionObject {
  value: string | number;
  label: string;
}

interface LayoutConfig {
  width?: WidthConfig;
  order?: number;
  row?: number;
  column?: number;
  span?: number;
}

interface WidthConfig {
  mobile?: WidthValue;
  tablet?: WidthValue;
  desktop?: WidthValue;
  wide?: WidthValue;
}

type WidthValue = 
  | "full" | "15/16" | "7/8" | "14/16" | "13/16" 
  | "3/4" | "12/16" | "11/16" | "5/8" | "10/16" 
  | "9/16" | "1/2" | "8/16" | "7/16" | "3/8" 
  | "6/16" | "5/16" | "1/4" | "4/16" | "3/16" 
  | "1/8" | "2/16" | "1/16";

interface ValidationConfig {
  custom?: CustomValidation[];
  crossField?: CrossFieldValidation[];
}

interface CustomValidation {
  rule: string;
  message: string;
  params?: Record<string, any>;
}

interface CrossFieldValidation {
  fields: string[];
  rule: string;
  message: string;
}

interface Dependency {
  id?: string;
  sourceFieldId: string;
  condition: Condition;
  effects: Effect[];
}

interface Condition {
  operator: ConditionOperator;
  value?: any;
  sourceFieldId?: string;
  conditions?: Condition[];
}

type ConditionOperator = 
  | "equals" | "notEquals" | "contains" | "notContains" 
  | "greaterThan" | "lessThan" | "greaterThanOrEqual" | "lessThanOrEqual" 
  | "isEmpty" | "isNotEmpty" | "matches" | "in" | "notIn"
  | "and" | "or" | "not";

interface Effect {
  targetFieldId: string;
  action: EffectAction;
  params?: Record<string, any>;
  value?: any;
}

type EffectAction = 
  | "show" | "hide" | "enable" | "disable" 
  | "require" | "unrequire" | "updateParams" 
  | "setValue" | "clearValue";

interface FunctionDef {
  type: FunctionType;
  description?: string;
  params?: string[];
  returns?: string;
}

type FunctionType = "datasource" | "validator" | "transformer";

interface ValidationError {
  fieldId: string;
  message: string;
  code?: string;
}
```
