# FAQ - Frequently Asked Questions

## General Questions

### What is Generic Form Format (GFF)?

GFF is a JSON-based specification for describing forms in a declarative, portable way. It allows you to define form structure, field types, validation rules, and conditional logic without writing code.

### Why create another form format?

Existing form solutions are often:
- Framework-specific (tied to React, Vue, Angular, etc.)
- Platform-specific (web-only, mobile-only)
- Proprietary or complex
- Lacking in conditional logic support

GFF is designed to be universal, simple, and extensible.

### Is this a form builder or library?

No, GFF is just a **specification**. It defines the format, not the implementation. You'll need to:
- Build a parser to read GFF files
- Build a renderer to display forms
- Implement validation logic
- Handle form submission

### What language should I use to implement GFF?

Any language! The specification is language-agnostic. You can implement parsers and renderers in JavaScript, Python, Java, Go, Swift, Kotlin, C#, or any other language.

## Format Questions

### Why JSON instead of YAML or TOML?

JSON was chosen because:
- Universal support across all programming languages
- Native browser support
- Strict syntax (less ambiguity)
- Easy to validate with JSON Schema
- Compact and readable for both humans and machines

### Can I add custom field types?

Yes! The specification is extensible. You can add custom field types in your implementation. We recommend:
1. Use a naming convention (e.g., `x-customType` or `custom:myType`)
2. Document your custom types
3. Provide fallback behavior for parsers that don't support them

### How do I handle internationalization (i18n)?

Currently, GFF v1.0 doesn't have built-in i18n support. Recommended approaches:

**Approach 1: Multiple form files**
```
contact-form.en.json
contact-form.es.json
contact-form.fr.json
```

**Approach 2: External i18n keys**
```json
{
  "id": "name",
  "caption": "form.field.name",
  "tooltip": "form.field.name.tooltip"
}
```
Then use i18n library to resolve keys.

**Approach 3: Extension in metadata**
```json
{
  "id": "name",
  "caption": "Name",
  "metadata": {
    "i18n": {
      "es": { "caption": "Nombre" },
      "fr": { "caption": "Nom" }
    }
  }
}
```

## Field Type Questions

### Why is there both `text` and `email`/`url` field types?

`email` and `url` provide semantic meaning and built-in validation. While you could use `text` with a regex pattern, dedicated types:
- Make the intent clearer
- Provide consistent validation across implementations
- May trigger appropriate mobile keyboards (e.g., email keyboard)
- Improve accessibility

### Can a text field be both RTL and multiline?

Yes! The `params` can specify both:
```json
{
  "type": "text",
  "params": {
    "multiline": true,
    "rtl": true
  }
}
```

### How do I make a field required?

It depends on the field type:

- **Text fields**: Set `minLength` to 1 or higher
- **Other fields**: Set `required: true` in params

```json
// Text field (required)
{
  "type": "text",
  "params": { "minLength": 1 }
}

// Number field (required)
{
  "type": "number",
  "params": { "required": true }
}
```

### What's the difference between `radio` and `select`?

Both allow single selection, but:

| Feature | Radio | Select |
|---------|-------|--------|
| Display | All options visible | Dropdown (one visible) |
| Best for | 2-5 options | Many options |
| Searchable | No | Yes (if enabled) |
| Multiple | No | Yes (if enabled) |

Use `radio` for small, always-visible choices. Use `select` for longer lists.

## Layout Questions

### What do the width fractions mean?

Width fractions are based on a 16-column grid:

- `"full"` = 16/16 = 100%
- `"1/2"` = 8/16 = 50%
- `"1/4"` = 4/16 = 25%
- `"3/4"` = 12/16 = 75%

All fractions can be expressed as X/16 (e.g., `"5/16"` = 31.25%).

### Can I have different layouts for different screen sizes?

Yes! Specify width for each breakpoint:

```json
{
  "layout": {
    "width": {
      "mobile": "full",      // 100% on mobile
      "tablet": "1/2",       // 50% on tablet
      "desktop": "1/3",      // 33.33% on desktop
      "wide": "1/4"          // 25% on wide screens
    }
  }
}
```

### What are the breakpoint sizes?

The specification doesn't define exact pixel breakpoints. Your renderer should define:

- **mobile**: Typically < 768px
- **tablet**: Typically 768px - 1024px
- **desktop**: Typically 1024px - 1920px
- **wide**: Typically > 1920px

Adjust based on your needs.

## Dependency Questions

### Can I have multiple dependencies on the same field?

Yes! Multiple dependencies can target the same field:

```json
{
  "dependencies": [
    {
      "sourceFieldId": "country",
      "condition": { "operator": "equals", "value": "US" },
      "effects": [
        { "targetFieldId": "state", "action": "show" }
      ]
    },
    {
      "sourceFieldId": "hasAddress",
      "condition": { "operator": "equals", "value": false },
      "effects": [
        { "targetFieldId": "state", "action": "hide" }
      ]
    }
  ]
}
```

The last matching dependency wins, or combine with `and` conditions.

### How do I create an "if-else" dependency?

Create two separate dependencies:

```json
{
  "dependencies": [
    {
      "id": "show-field-if-yes",
      "sourceFieldId": "question",
      "condition": { "operator": "equals", "value": "yes" },
      "effects": [
        { "targetFieldId": "details", "action": "show" }
      ]
    },
    {
      "id": "hide-field-if-no",
      "sourceFieldId": "question",
      "condition": { "operator": "equals", "value": "no" },
      "effects": [
        { "targetFieldId": "details", "action": "hide" }
      ]
    }
  ]
}
```

Or use `notEquals`:

```json
{
  "condition": { "operator": "notEquals", "value": "yes" }
}
```

### What happens with circular dependencies?

The specification doesn't prevent circular dependencies. Your implementation should:
1. Detect circular dependencies during parsing
2. Either reject the form or
3. Limit dependency evaluation depth (e.g., max 10 levels)

## Nested Form Questions

### Can I nest forms multiple levels deep?

Yes, but be cautious:

```
form-a.json
└── nested: form-b.json
    └── nested: form-c.json
```

Deep nesting can:
- Make forms complex and hard to maintain
- Cause performance issues
- Create circular reference risks

Recommendation: Limit to 2-3 levels maximum.

### How do I prevent circular references in nested forms?

Your parser should:
1. Track which forms are currently being loaded
2. Detect if a form references itself directly or indirectly
3. Throw an error if circular reference is detected

Example:
```
form-a → includes form-b → includes form-a  ❌ CIRCULAR!
```

### Can nested forms have dependencies?

Yes! Each nested form has its own dependencies. Dependencies work within the nested form's scope.

To create dependencies between parent and nested form fields, you'd need to flatten the structure or extend the specification to support cross-form dependencies (not in v1.0).

## Function Questions

### Where do I implement the functions?

Functions are **declared** in the GFF file but **implemented** in your renderer/application code.

Example declaration:
```json
{
  "functions": {
    "getCountries": {
      "type": "datasource",
      "returns": "array"
    }
  }
}
```

Example implementation (JavaScript):
```javascript
const functions = {
  getCountries: async () => {
    const response = await fetch('/api/countries');
    return response.json();
  }
};
```

### Can functions take parameters?

Yes, declare them in the function definition:

```json
{
  "functions": {
    "getCitiesByCountry": {
      "type": "datasource",
      "params": ["countryCode"],
      "returns": "array"
    }
  }
}
```

Your renderer needs to pass field values as parameters when calling the function.

### Can I use inline functions?

No. For security and portability reasons, GFF doesn't support inline JavaScript or code. All functions must be:
1. Declared by name in the form
2. Implemented separately in the application

## Validation Questions

### When should validation run?

Recommended validation timing:

1. **On change**: Immediate feedback (optional, can be annoying)
2. **On blur**: Validate when user leaves field (recommended)
3. **On submit**: Always validate before submission (required)

### Can I have custom error messages?

Yes, use the validation configuration:

```json
{
  "validation": {
    "custom": [
      {
        "rule": "validateAge",
        "message": "You must be at least 18 years old",
        "params": { "minAge": 18 }
      }
    ]
  }
}
```

### How do I validate across multiple fields?

Use `crossField` validation:

```json
{
  "validation": {
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

Your validator function receives all field values and returns boolean.

## Implementation Questions

### What libraries are recommended?

The specification is implementation-agnostic, but popular choices:

**JavaScript/TypeScript:**
- JSON Schema validation: `ajv`
- Form rendering: Your choice of framework (React, Vue, Angular, Svelte)
- Date handling: `date-fns` or `dayjs`

**Python:**
- JSON Schema validation: `jsonschema`
- Form rendering: Depends on web framework (Django, Flask, FastAPI)

**Other languages:**
- Find JSON Schema validators for your language
- Implement rendering with native UI frameworks

### How do I handle file uploads?

GFF defines the field type and constraints, but file handling is implementation-specific:

1. **Client-side**: Handle file selection, preview, validation (size, type)
2. **Upload**: POST to your server with multipart/form-data
3. **Server-side**: Store file, validate, return file ID or URL
4. **Form data**: Include file ID/URL in final submission

### Should I validate on client and server?

**Always validate on both:**

- **Client**: Provides immediate feedback, better UX
- **Server**: Security requirement (client can be bypassed)

Never trust client-side validation alone.

## Migration Questions

### Can I convert existing forms to GFF?

Yes! You'll need to:

1. Map your existing field types to GFF types
2. Convert validation rules to GFF format
3. Convert conditional logic to GFF dependencies
4. Test thoroughly

Consider building a migration script if you have many forms.

### Is GFF compatible with HTML forms?

GFF is higher-level than HTML forms. Your renderer should:
1. Parse GFF → Generate HTML form elements
2. Add validation logic
3. Handle dependency evaluation
4. Manage form state

GFF forms can ultimately render to HTML, but they're not 1:1 compatible.

## Best Practices

### How should I structure large forms?

For large forms:

1. **Use nested forms**: Break into logical sections
2. **Multiple pages**: Split into multiple GFF files (multi-step form)
3. **Lazy load**: Load nested forms on-demand
4. **Optimize dependencies**: Minimize complex dependencies

### Should I use `optionsFunction` for all dropdowns?

Use `optionsFunction` when:
- Options are dynamic (fetched from API)
- Options depend on other fields
- Option list is very large (> 50 items)

Use static `options` when:
- Options are fixed (e.g., yes/no, gender)
- Options are small (< 50 items)
- Options don't change

### How do I version my forms?

Three approaches:

1. **File versioning**: `contact-form-v1.json`, `contact-form-v2.json`
2. **Git versioning**: Use git tags and branches
3. **Metadata versioning**: Add version to metadata:

```json
{
  "version": "1.0",
  "formId": "contact-form",
  "metadata": {
    "formVersion": "2.3.0",
    "createdAt": "2025-12-24",
    "updatedAt": "2025-12-30"
  }
}
```

## Troubleshooting

### My form isn't validating correctly

Check:
1. JSON syntax is valid (use validator)
2. All field IDs are unique
3. Dependency references exist
4. Condition operators match field types
5. Required vs optional params are correct

### Dependencies aren't working

Common issues:
1. `sourceFieldId` or `targetFieldId` doesn't exist
2. Condition value type doesn't match field value type
3. Multiple conflicting dependencies
4. Effects applied in wrong order

### Layout isn't responsive

Ensure:
1. All breakpoints are defined (`mobile`, `tablet`, `desktop`, `wide`)
2. Width values are valid fractions
3. Renderer implements responsive layout correctly

## Contributing

### How do I suggest a new field type?

1. Open an issue on the repository
2. Describe the use case
3. Provide example JSON
4. Explain why existing types don't suffice

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### How do I report bugs in the specification?

Open an issue with:
- Version number
- Section reference
- Description of ambiguity or error
- Suggested fix

---

**Don't see your question?** Open an issue and ask! We'll add it to this FAQ.
