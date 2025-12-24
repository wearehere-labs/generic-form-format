/**
 * Example: Dynamic Form with Conditional Logic
 * 
 * This example demonstrates:
 * - Complex conditional dependencies
 * - Show/hide fields based on user input
 * - Dynamic field requirements
 * - Chained dependencies
 */

import {
  createForm,
  addField,
  addDependency,
  createSelectField,
  createTextField,
  createTextareaField,
  createNumberField,
  createCheckboxField,
  createDateField,
  createFileField,
  createOptions,
  createDependency,
  createCondition,
  createCompoundCondition,
  showEffect,
  hideEffect,
  requireEffect,
  unrequireEffect,
  toJSON,
} from '../../lib/src/index';

// Create event registration form
let eventForm = createForm('event-registration', {
  title: 'Event Registration',
  description: 'Register for our upcoming conference',
});

// Attendance type
eventForm = addField(
  eventForm,
  createSelectField('attendanceType', 'How will you attend?', {
    required: true,
    options: createOptions([
      { value: 'in-person', label: 'In-Person' },
      { value: 'virtual', label: 'Virtual' },
      { value: 'hybrid', label: 'Both In-Person and Virtual' },
    ]),
  })
);

// In-person specific fields
eventForm = addField(
  eventForm,
  createTextField('dietaryRestrictions', 'Dietary Restrictions', {
    maxLength: 200,
    placeholder: 'e.g., Vegetarian, Gluten-free, None',
  })
);

eventForm = addField(
  eventForm,
  createCheckboxField('needsAccommodation', 'I need hotel accommodation', {})
);

eventForm = addField(
  eventForm,
  createDateField('checkInDate', 'Check-in Date', {
    minDate: '2025-01-01',
    maxDate: '2025-12-31',
  })
);

eventForm = addField(
  eventForm,
  createDateField('checkOutDate', 'Check-out Date', {
    minDate: '2025-01-01',
    maxDate: '2025-12-31',
  })
);

// Virtual specific fields
eventForm = addField(
  eventForm,
  createSelectField('timezone', 'Your Timezone', {
    options: createOptions([
      { value: 'EST', label: 'Eastern Time (EST)' },
      { value: 'CST', label: 'Central Time (CST)' },
      { value: 'MST', label: 'Mountain Time (MST)' },
      { value: 'PST', label: 'Pacific Time (PST)' },
      { value: 'UTC', label: 'UTC' },
    ]),
  })
);

eventForm = addField(
  eventForm,
  createTextField('platformUsername', 'Virtual Platform Username', {
    minLength: 3,
    maxLength: 50,
  })
);

// Presentation submission
eventForm = addField(
  eventForm,
  createCheckboxField('wantToPresent', 'I want to submit a presentation', {})
);

eventForm = addField(
  eventForm,
  createTextField('presentationTitle', 'Presentation Title', {
    minLength: 10,
    maxLength: 100,
  })
);

eventForm = addField(
  eventForm,
  createTextareaField('presentationAbstract', 'Presentation Abstract', {
    minLength: 50,
    maxLength: 500,
    rows: 6,
  })
);

eventForm = addField(
  eventForm,
  createFileField('presentationSlides', 'Upload Slides (Optional)', {
    multiple: false,
    maxSize: 10485760, // 10MB
    acceptedTypes: ['.pdf', '.pptx', '.key'],
  })
);

// Dependency 1: Show in-person fields when in-person or hybrid selected
eventForm = addDependency(
  eventForm,
  createDependency(
    'attendanceType',
    createCompoundCondition('or', [
      createCondition('equals', 'in-person'),
      createCondition('equals', 'hybrid'),
    ]),
    [
      showEffect('dietaryRestrictions'),
      showEffect('needsAccommodation'),
      requireEffect('dietaryRestrictions'),
    ]
  )
);

// Dependency 2: Show hotel dates when accommodation needed
eventForm = addDependency(
  eventForm,
  createDependency(
    'needsAccommodation',
    createCondition('equals', true),
    [
      showEffect('checkInDate'),
      showEffect('checkOutDate'),
      requireEffect('checkInDate'),
      requireEffect('checkOutDate'),
    ]
  )
);

// Dependency 3: Show virtual fields when virtual or hybrid selected
eventForm = addDependency(
  eventForm,
  createDependency(
    'attendanceType',
    createCompoundCondition('or', [
      createCondition('equals', 'virtual'),
      createCondition('equals', 'hybrid'),
    ]),
    [
      showEffect('timezone'),
      showEffect('platformUsername'),
      requireEffect('timezone'),
      requireEffect('platformUsername'),
    ]
  )
);

// Dependency 4: Show presentation fields when user wants to present
eventForm = addDependency(
  eventForm,
  createDependency(
    'wantToPresent',
    createCondition('equals', true),
    [
      showEffect('presentationTitle'),
      showEffect('presentationAbstract'),
      showEffect('presentationSlides'),
      requireEffect('presentationTitle'),
      requireEffect('presentationAbstract'),
    ]
  )
);

// Export form
console.log('Dynamic Event Registration Form');
console.log('================================\n');
console.log(toJSON(eventForm, true));
console.log('\n✓ Form created with 4 conditional dependencies');
console.log('✓ Fields show/hide based on user selections');
console.log('✓ Requirements change dynamically');
