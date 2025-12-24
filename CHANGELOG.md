# Changelog

All notable changes to the Generic Form Format specification will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-24

### Added

- Initial release of Generic Form Format specification
- Core field types:
  - `text` - Single or multi-line text with RTL support
  - `number` - Numeric input with constraints
  - `checkbox` - Boolean selection
  - `radio` - Single selection from options
  - `select` - Dropdown selection (single or multiple)
  - `date` - Date/time picker
  - `file` - File upload with constraints
  - `email` - Email validation
  - `url` - URL validation
  - `password` - Password with complexity requirements
  - `range` - Slider input
  - `color` - Color picker
  - `nested` - Embedded form reference
- Field properties:
  - Unique ID for all fields
  - Caption and optional tooltip
  - Type-specific parameters
  - Layout configuration for responsive design
  - Validation configuration
  - Default values
  - Disabled and readonly states
- Layout system:
  - Responsive width configuration (mobile, tablet, desktop, wide)
  - 16-column fractional width system
  - Grid positioning (row, column, span)
  - Display order control
- Dependency system:
  - Conditional logic between fields
  - 13 condition operators (equals, contains, greaterThan, etc.)
  - Complex conditions with and/or/not
  - 9 effect actions (show, hide, enable, disable, require, unrequire, updateParams, setValue, clearValue)
- Function system:
  - Named functions for dynamic data
  - Three function types: datasource, validator, transformer
  - Function declarations in form definition
- Nested form support:
  - Reference other forms by ID
  - Multiple instances support
  - Collapsible sections
- Documentation:
  - SPECIFICATION.md - Human-readable specification
  - AI_SPECIFICATION.md - AI-optimized specification with TypeScript interfaces
  - README.md - Overview and quick start
  - CONTRIBUTING.md - Contribution guidelines
  - JSON Schema for validation (schema/form.schema.json)
- Examples:
  - simple-contact-form.json - Basic form demonstration
  - job-application-form.json - Complex form with nested forms and dependencies
  - personal-info-form.json - Reusable personal information subform
  - reference-form.json - Professional reference subform
  - dynamic-survey-form.json - Survey with dynamic options and complex logic
  - rtl-multilingual-form.json - Multilingual form with RTL support

### Format Structure

```json
{
  "version": "1.0",
  "formId": "string",
  "title": "string",
  "description": "string",
  "fields": [],
  "dependencies": [],
  "functions": {},
  "metadata": {}
}
```

## [Unreleased]

No unreleased changes yet.

---

## Version History Notes

### Version Numbering

- **Major version** (X.0): Breaking changes to the specification
- **Minor version** (1.X): Additive changes, backward compatible
- **Patch version** (1.0.X): Documentation fixes, clarifications (if needed)

### Backward Compatibility

- Minor version changes maintain backward compatibility
- Forms created with version 1.0 should work with version 1.1, 1.2, etc.
- Major version changes may break compatibility
- Parsers should handle unknown properties gracefully

### Future Considerations

Topics being considered for future versions:

- Additional field types (e.g., signature, drawing, geolocation)
- Field groups and sections
- Multi-page forms with navigation
- Form-level validation rules
- Internationalization (i18n) support
- Accessibility (a11y) properties
- Computed fields
- Field masking and formatting
- Auto-save and recovery
- Submission configuration

Feedback and suggestions are welcome!
