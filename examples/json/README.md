# JSON Examples

Static form definitions written in JSON that demonstrate the Generic Form Format specification.

## Available Examples

### [simple-contact-form.json](simple-contact-form.json)
A basic contact form with text, email, select, and checkbox fields. Great starting point for understanding GFF structure.

**Features:**
- Basic field types
- Validation (required, min/max length)
- Responsive layouts
- Field tooltips

---

### [job-application-form.json](job-application-form.json)
A comprehensive job application form demonstrating advanced features.

**Features:**
- Nested forms (personal info, references)
- Multiple instances of nested forms
- Conditional visibility
- File upload with constraints
- Dependencies between fields

**Related forms:**
- [personal-info-form.json](personal-info-form.json) - Personal information subform
- [reference-form.json](reference-form.json) - Professional reference subform

---

### [dynamic-survey-form.json](dynamic-survey-form.json)
A customer satisfaction survey with dynamic behavior.

**Features:**
- Dynamic options using `optionsFunction`
- Range slider fields
- Complex conditional logic
- Multiple dependencies
- Automatic value setting

---

### [rtl-multilingual-form.json](rtl-multilingual-form.json)
Demonstrates right-to-left (RTL) text support and multilingual form capabilities.

**Features:**
- RTL text input
- Multilingual captions
- International formatting
- Currency and date localization

---

### [advanced-features.json](advanced-features.json)
Complete example showcasing advanced field types and configurations.

**Features:**
- Advanced field types (autocomplete, slider, signature, richtext, code, currency, image, OTP)
- Multi-step form configuration
- Field groups
- Theme customization
- Internationalization (i18n)
- Accessibility attributes
- Button customization

---

## Usage

### Viewing Examples

Simply open any `.json` file to see the form definition.

### Validating Examples

Validate against the official schema:

```bash
npm run validate:examples
```

### Using in Your Project

Copy the JSON and modify for your needs:

```javascript
const formDefinition = require('./path/to/example.json');
// Use with your GFF renderer
```

### Converting to TypeScript

You can load and work with these forms programmatically:

```typescript
import { fromJSON } from '@wearehere-labs/generic-form-format';
import fs from 'fs';

const json = fs.readFileSync('simple-contact-form.json', 'utf8');
const form = fromJSON(json);

// Now manipulate with TypeScript library
```

## Creating Your Own

To create a new JSON example:

1. Start with the basic structure:
```json
{
  "version": "1.0",
  "formId": "my-form",
  "title": "My Form",
  "fields": []
}
```

2. Add fields following the [AI_GUIDE.md](../../AI_GUIDE.md)
3. Validate with `npm run validate:examples`
4. Test with a GFF-compatible renderer

## See Also

- **[TypeScript Examples](../typescript/)** - Programmatic form creation
- **[AI_GUIDE.md](../../AI_GUIDE.md)** - Complete format reference and API documentation
- **[schema/](../../schema/)** - JSON Schema for validation
