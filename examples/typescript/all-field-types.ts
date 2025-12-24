/**
 * Example: All 29 Field Types Showcase
 * 
 * This example demonstrates all available field types in Generic Form Format,
 * showing their parameters and typical use cases.
 */

import {
  createForm,
  addField,
  createTextField,
  createTextareaField,
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
  createTelField,
  createRangeField,
  createColorField,
  createNestedField,
  createHiddenField,
  createRatingField,
  createToggleField,
  createTagsField,
  createAutocompleteField,
  createSliderField,
  createSignatureField,
  createRichtextField,
  createCodeField,
  createCurrencyField,
  createOTPField,
  createOptions,
  toJSON,
} from '../../lib/src/index';

let showcaseForm = createForm('all-field-types', {
  title: 'All 29 Field Types Showcase',
  description: 'Complete reference of all available field types',
});

// 1. Text Field
showcaseForm = addField(showcaseForm, createTextField('username', 'Username', {
  minLength: 3,
  maxLength: 20,
  pattern: '^[a-zA-Z0-9_]+$',
  placeholder: 'Enter username',
}));

// 2. Textarea Field
showcaseForm = addField(showcaseForm, createTextareaField('bio', 'Biography', {
  minLength: 10,
  maxLength: 500,
  rows: 4,
  placeholder: 'Tell us about yourself...',
}));

// 3. Number Field
showcaseForm = addField(showcaseForm, createNumberField('age', 'Age', {
  min: 18,
  max: 120,
  step: 1,
  required: true,
}));

// 4. Email Field
showcaseForm = addField(showcaseForm, createEmailField('email', 'Email', {
  required: true,
  placeholder: 'you@example.com',
}));

// 5. Password Field
showcaseForm = addField(showcaseForm, createPasswordField('password', 'Password', {
  minLength: 8,
  requireUppercase: true,
  requireNumber: true,
  requireSymbol: true,
}));

// 6. Select Field
showcaseForm = addField(showcaseForm, createSelectField('country', 'Country', {
  required: true,
  searchable: true,
  options: createOptions([
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ]),
}));

// 7. Checkbox Field
showcaseForm = addField(showcaseForm, createCheckboxField('terms', 'I agree to terms', {
  required: true,
}));

// 8. Radio Field
showcaseForm = addField(showcaseForm, createRadioField('gender', 'Gender', {
  required: true,
  options: createOptions([
    { value: 'm', label: 'Male' },
    { value: 'f', label: 'Female' },
    { value: 'o', label: 'Other' },
  ]),
}));

// 9. Date Field
showcaseForm = addField(showcaseForm, createDateField('birthdate', 'Birth Date', {
  required: true,
  maxDate: '2010-01-01',
}));

// 10. Time Field
showcaseForm = addField(showcaseForm, createTimeField('appointmentTime', 'Appointment Time', {
  format: '12h',
  required: true,
}));

// 11. DateTime Field
showcaseForm = addField(showcaseForm, createDateTimeField('eventDateTime', 'Event Date & Time', {
  required: true,
  timeFormat: '24h',
}));

// 12. File Field
showcaseForm = addField(showcaseForm, createFileField('resume', 'Resume', {
  required: true,
  maxSize: 5242880, // 5MB
  acceptedTypes: ['.pdf', '.doc', '.docx'],
}));

// 13. Image Field
showcaseForm = addField(showcaseForm, createImageField('profilePhoto', 'Profile Photo', {
  required: true,
  maxWidth: 800,
  maxHeight: 800,
  allowCrop: true,
}));

// 14. URL Field
showcaseForm = addField(showcaseForm, createURLField('website', 'Website', {
  placeholder: 'https://example.com',
}));

// 15. Tel Field
showcaseForm = addField(showcaseForm, createTelField('phone', 'Phone Number', {
  required: true,
  countryCode: '+1',
}));

// 16. Range Field
showcaseForm = addField(showcaseForm, createRangeField('experience', 'Years of Experience', {
  min: 0,
  max: 50,
  step: 1,
}));

// 17. Color Field
showcaseForm = addField(showcaseForm, createColorField('favoriteColor', 'Favorite Color', {
  format: 'hex',
}));

// 18. Nested Field
showcaseForm = addField(showcaseForm, createNestedField('addresses', 'Addresses', {
  formId: 'address-form',
  multiple: true,
  collapsible: true,
}));

// 19. Hidden Field
showcaseForm = addField(showcaseForm, createHiddenField('userId', {
  value: 'user-12345',
}));

// 20. Rating Field
showcaseForm = addField(showcaseForm, createRatingField('satisfaction', 'Satisfaction Rating', {
  max: 5,
  icon: 'star',
  allowHalf: true,
}));

// 21. Toggle Field
showcaseForm = addField(showcaseForm, createToggleField('notifications', 'Email Notifications', {
  defaultValue: true,
}));

// 22. Tags Field
showcaseForm = addField(showcaseForm, createTagsField('skills', 'Skills', {
  maxTags: 10,
  allowCustom: true,
  suggestions: ['JavaScript', 'Python', 'TypeScript', 'React', 'Node.js'],
}));

// 23. Autocomplete Field
showcaseForm = addField(showcaseForm, createAutocompleteField('city', 'City', {
  required: true,
  allowCustom: true,
  minChars: 2,
  options: createOptions([
    { value: 'nyc', label: 'New York' },
    { value: 'la', label: 'Los Angeles' },
    { value: 'chi', label: 'Chicago' },
  ]),
}));

// 24. Slider Field
showcaseForm = addField(showcaseForm, createSliderField('budget', 'Budget Range', {
  min: 0,
  max: 100000,
  step: 1000,
  showTicks: true,
  showValue: true,
}));

// 25. Signature Field
showcaseForm = addField(showcaseForm, createSignatureField('signature', 'Your Signature', {
  width: 400,
  height: 200,
  required: true,
}));

// 26. Richtext Field
showcaseForm = addField(showcaseForm, createRichtextField('description', 'Description', {
  toolbar: ['bold', 'italic', 'underline', 'link'],
  minLength: 50,
  maxLength: 2000,
}));

// 27. Code Field
showcaseForm = addField(showcaseForm, createCodeField('codeSnippet', 'Code Snippet', {
  language: 'javascript',
  theme: 'dark',
  lineNumbers: true,
}));

// 28. Currency Field
showcaseForm = addField(showcaseForm, createCurrencyField('salary', 'Expected Salary', {
  currency: 'USD',
  min: 0,
  max: 1000000,
  required: true,
}));

// 29. OTP Field
showcaseForm = addField(showcaseForm, createOTPField('verificationCode', 'Verification Code', {
  length: 6,
  type: 'numeric',
  required: true,
}));

console.log('All 29 Field Types Showcase');
console.log('============================\n');
console.log(`Total fields: ${showcaseForm.fields.length}`);
console.log('\nField types included:');
showcaseForm.fields.forEach((field, index) => {
  console.log(`${index + 1}. ${field.type.padEnd(15)} - ${field.caption}`);
});

console.log('\n✓ All 29 field types demonstrated');
console.log('✓ Ready to export to JSON\n');

// Uncomment to see full JSON:
// console.log(toJSON(showcaseForm, true));
