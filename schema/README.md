# JSON Schema for Generic Form Format

This directory contains the JSON Schema definition for validating Generic Form Format (GFF) files.

## Files

- **[form.schema.json](form.schema.json)** - Complete JSON Schema for GFF v1.0

## Using the Schema

### Online Validation

You can validate your form definitions using online tools:

1. [JSONSchemaLint](https://jsonschemalint.com/)
2. [JSON Schema Validator](https://www.jsonschemavalidator.net/)

### Command Line (using AJV)

Install AJV CLI:

```bash
npm install -g ajv-cli
```

Validate a form:

```bash
ajv validate -s schema/form.schema.json -d examples/simple-contact-form.json
```

### In Code (JavaScript/Node.js)

```javascript
const Ajv = require('ajv');
const formSchema = require('./schema/form.schema.json');
const myForm = require('./my-form.json');

const ajv = new Ajv();
const validate = ajv.compile(formSchema);
const valid = validate(myForm);

if (!valid) {
  console.error('Validation errors:', validate.errors);
} else {
  console.log('Form is valid!');
}
```

### In Code (Python)

```python
import json
import jsonschema

with open('schema/form.schema.json', 'r') as f:
    schema = json.load(f)

with open('my-form.json', 'r') as f:
    form = json.load(f)

try:
    jsonschema.validate(instance=form, schema=schema)
    print("Form is valid!")
except jsonschema.exceptions.ValidationError as e:
    print(f"Validation error: {e.message}")
```

### In IDEs

#### VS Code

Add this to the top of your form JSON files for automatic validation:

```json
{
  "$schema": "../schema/form.schema.json"
}
```

Or configure in `.vscode/settings.json`:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["*-form.json"],
      "url": "./schema/form.schema.json"
    }
  ]
}
```

#### IntelliJ IDEA / WebStorm

1. Go to Settings → Languages & Frameworks → Schemas and DTDs → JSON Schema Mappings
2. Add new mapping:
   - Name: Generic Form Format
   - Schema file: `schema/form.schema.json`
   - Schema version: JSON Schema version 7
   - File path pattern: `**/*-form.json`

## Schema Coverage

The schema validates:

- ✅ Root structure (version, formId, fields, dependencies, functions)
- ✅ Field structure (id, type, caption, params, layout)
- ✅ All field types (text, number, checkbox, radio, select, date, file, email, url, password, range, color, nested)
- ✅ Layout configuration (width values, responsive breakpoints)
- ✅ Dependency structure (conditions, effects)
- ✅ Condition operators (equals, contains, greaterThan, etc.)
- ✅ Effect actions (show, hide, enable, disable, require, unrequire, updateParams, setValue, clearValue)
- ✅ Function definitions (type, description, params, returns)
- ✅ Validation configuration (custom, crossField)

## Limitations

The schema provides structural validation but cannot validate:

- Semantic correctness (e.g., whether referenced formId exists)
- Circular dependencies in nested forms
- Whether field IDs are unique
- Whether dependency references point to existing fields
- Whether function names are declared before use

These validations should be performed by the form parser/renderer.

## Extending the Schema

To add support for new field types or features:

1. Update the `fieldType` enum in the schema
2. Add type-specific parameter definitions if needed
3. Update the specification documents (SPECIFICATION.md, AI_SPECIFICATION.md)
4. Update version number
5. Create example forms demonstrating the new features

## Version History

- **v1.0** (2025-12-24) - Initial schema release
