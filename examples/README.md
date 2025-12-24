# Examples

This directory contains example form definitions demonstrating various features of the Generic Form Format.

## Available Examples

### 1. [simple-contact-form.json](simple-contact-form.json)

A basic contact form demonstrating:
- Text, email, select, and checkbox fields
- Basic validation (required fields, min/max length)
- Responsive layout with different widths for mobile and desktop
- Field tooltips

**Use case**: Simple contact forms, feedback forms, inquiry forms

---

### 2. [job-application-form.json](job-application-form.json)

A comprehensive job application form demonstrating:
- **Nested forms** (personal info, references)
- **Multiple instances** of nested forms (multiple references)
- **Conditional visibility** (show "Other" field only when "Other" position is selected)
- Various field types (text, number, date, file, url, radio, checkbox)
- File upload with constraints (size, type restrictions)
- **Dependencies** that show/hide and require/unrequire fields

**Use case**: Job applications, complex multi-step forms with nested data

**Related forms**:
- [personal-info-form.json](personal-info-form.json) - Personal information subform
- [reference-form.json](reference-form.json) - Professional reference subform

---

### 3. [dynamic-survey-form.json](dynamic-survey-form.json)

A customer satisfaction survey demonstrating:
- **Dynamic options** using `optionsFunction`
- Range slider field for satisfaction ratings
- **Complex conditional logic** (multiple dependencies)
- Automatic field value setting based on conditions
- Select field with multiple selections
- Various show/hide behaviors based on user selections

**Use case**: Surveys, feedback forms with conditional questions

---

### 4. [rtl-multilingual-form.json](rtl-multilingual-form.json)

A multilingual registration form demonstrating:
- **RTL (Right-to-Left) support** for Arabic and Hebrew
- **Dynamic parameter updates** (changing RTL based on language selection)
- Language selection affecting multiple fields
- Using `in` operator in conditions for checking multiple values

**Use case**: International forms, multilingual applications

---

## Testing These Examples

### Manual Testing

1. Load the JSON file into your form renderer
2. Test all field validations
3. Test dependency behaviors (show/hide, enable/disable, require/unrequire)
4. Test responsive layouts at different screen sizes
5. For nested forms, test multiple instances

### Validation Checklist

For each form example:

- [ ] All required fields are validated
- [ ] Optional fields work correctly
- [ ] Min/max length constraints are enforced
- [ ] Pattern validation works (email, phone, etc.)
- [ ] Dependencies trigger correctly
- [ ] Nested forms display and validate properly
- [ ] Layout adapts to different screen sizes
- [ ] File uploads respect size and type limits
- [ ] Dynamic options load correctly (if using optionsFunction)

### Testing Dependencies

For forms with dependencies:

1. **Conditional Visibility**:
   - Verify fields show/hide based on source field values
   - Test edge cases (null values, clearing fields)

2. **Conditional Requirements**:
   - Verify required validation is added/removed dynamically
   - Test form submission with different dependency states

3. **Parameter Updates**:
   - Verify field parameters change correctly (e.g., RTL switching)
   - Test that updated parameters affect validation

4. **Value Setting**:
   - Verify automatic value setting works
   - Test that set values trigger other dependencies

## Expected Data Structures

### Simple Contact Form

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "support",
  "message": "I need help with...",
  "subscribe": true
}
```

### Job Application Form

```json
{
  "personalInfo": {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "phone": "+1-555-0123",
    "dateOfBirth": "1990-05-15"
  },
  "position": "dev",
  "experienceYears": 5,
  "expectedSalary": 95000.00,
  "startDate": "2025-02-01",
  "workType": "Hybrid",
  "resume": "file-object",
  "coverLetter": "I am excited to apply...",
  "portfolioUrl": "https://github.com/janesmith",
  "hasReferences": true,
  "references": [
    {
      "name": "Bob Johnson",
      "relationship": "Former Manager",
      "company": "Tech Corp",
      "email": "bob@techcorp.com",
      "phone": "+1-555-0199"
    },
    {
      "name": "Alice Williams",
      "relationship": "Colleague",
      "company": "Tech Corp",
      "email": "alice@techcorp.com",
      "phone": "+1-555-0188"
    }
  ]
}
```

### Dynamic Survey Form

```json
{
  "customerType": "Returning customer",
  "purchaseDate": "2025-12-20",
  "productCategory": "electronics",
  "satisfaction": 8,
  "wouldRecommend": true,
  "recommendationReason": "Great product quality and customer service",
  "issuesEncountered": false,
  "contactForFollowup": false,
  "additionalComments": "Keep up the good work!"
}
```

## Creating Your Own Examples

When creating new examples:

1. Start with the basic structure (version, formId, fields)
2. Add fields with appropriate types and parameters
3. Define layout for responsive behavior
4. Add dependencies for conditional logic
5. Declare any functions used for dynamic data
6. Test thoroughly before committing

## Notes

- All examples use specification version `1.0`
- Examples include comments in this README for clarity (JSON files don't support comments)
- File upload fields return file objects (implementation-specific)
- Dynamic functions (e.g., `getCountries`) must be implemented by the form renderer
