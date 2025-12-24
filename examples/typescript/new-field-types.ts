/**
 * Example: Demonstrating New Field Types
 * 
 * This example showcases the additional field types added to GFF:
 * - textarea, time, datetime, tel, hidden, rating, toggle, tags
 */

import {
  createForm,
  addField,
  createTextareaField,
  createTimeField,
  createDateTimeField,
  createTelField,
  createHiddenField,
  createRatingField,
  createToggleField,
  createTagsField,
  toJSON,
} from '../../lib/src/index';

// Create a feedback form with various new field types
let feedbackForm = createForm('feedback-form', {
  title: 'Product Feedback Form',
  description: 'Help us improve by sharing your experience',
});

// Hidden field for tracking
feedbackForm = addField(
  feedbackForm,
  createHiddenField('sessionId', {
    value: 'session-12345',
  })
);

// Rating field for product satisfaction
feedbackForm = addField(
  feedbackForm,
  createRatingField('productRating', 'How would you rate our product?', {
    required: true,
    max: 5,
    min: 0,
    step: 1,
    icon: 'star',
    allowHalf: true,
    allowClear: false,
  })
);

// Rating with hearts
feedbackForm = addField(
  feedbackForm,
  createRatingField('serviceRating', 'Rate our customer service', {
    required: true,
    max: 5,
    icon: 'heart',
    allowHalf: false,
  })
);

// Textarea for detailed feedback
feedbackForm = addField(
  feedbackForm,
  createTextareaField('comments', 'Your Feedback', {
    minLength: 10,
    maxLength: 1000,
    rows: 6,
    placeholder: 'Tell us what you think...',
    resize: 'vertical',
    required: true,
  })
);

// Tags for categorization
feedbackForm = addField(
  feedbackForm,
  createTagsField('topics', 'What topics does your feedback cover?', {
    maxTags: 5,
    allowCustom: true,
    suggestions: [
      'Product Quality',
      'Customer Service',
      'Pricing',
      'Features',
      'User Interface',
      'Performance',
      'Documentation',
    ],
    placeholder: 'Select or type topics...',
    separator: ',',
  })
);

// Toggle for follow-up
feedbackForm = addField(
  feedbackForm,
  createToggleField('allowFollowUp', 'Allow us to contact you for follow-up?', {
    defaultValue: true,
    onLabel: 'Yes, contact me',
    offLabel: 'No, thank you',
  })
);

// Phone number field
feedbackForm = addField(
  feedbackForm,
  createTelField('phone', 'Phone Number (optional)', {
    placeholder: '+1 (555) 123-4567',
    pattern: '^[+]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[0-9]{1,9}$',
  })
);

// Time preference for callback
feedbackForm = addField(
  feedbackForm,
  createTimeField('preferredCallTime', 'Preferred Call Time', {
    format: '12h',
    placeholder: 'Select time...',
    minTime: '09:00',
    maxTime: '17:00',
  })
);

// DateTime for scheduling
feedbackForm = addField(
  feedbackForm,
  createDateTimeField('scheduleMeeting', 'Schedule a Meeting (optional)', {
    minDateTime: new Date().toISOString(),
    timeFormat: '12h',
    placeholder: 'Select date and time...',
  })
);

// Output the form
console.log('Feedback Form with New Field Types:\n');
console.log(toJSON(feedbackForm, true));

// Export for use
export default feedbackForm;
