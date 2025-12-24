# Generic Form Format (GFF)

A JSON-based format for describing dynamic, interactive forms with field dependencies and responsive layouts.

## Overview

Generic Form Format (GFF) is a declarative format that allows you to define forms with:

- **Multiple field types** (text, number, checkbox, radio, select, date, file upload, and more)
- **Field dependencies** (conditional visibility, validation, and parameter changes)
- **Responsive layouts** (width configurations for different screen sizes)
- **Nested forms** (reusable form components)
- **Version control** (specification versioning for backward compatibility)
- **Dynamic data** (function references for populating options)

## Quick Start

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

## Documentation

- [**SPECIFICATION.md**](SPECIFICATION.md) - Complete format specification for humans
- [**AI_SPECIFICATION.md**](AI_SPECIFICATION.md) - Optimized specification for AI systems
- [**examples/**](examples/) - Sample form definitions

## Key Features

### Field Types

- **text** - Single or multi-line text input
- **number** - Numeric input with validation
- **checkbox** - Boolean selection
- **radio** - Single selection from options
- **select** - Dropdown selection (single or multiple)
- **date** - Date/time picker
- **file** - File upload
- **email** - Email validation
- **url** - URL validation
- **password** - Masked text input
- **textarea** - Multi-line text
- **range** - Slider input
- **color** - Color picker
- **nested** - Embedded form reference

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

## Version

Current specification version: **1.0**

## License

This specification is released into the public domain. Use it freely in your projects.

## Contributing

Suggestions and improvements are welcome. Please submit issues or pull requests with proposed changes to the specification.
